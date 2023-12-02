import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  handleGetDataRequest,
  handleNewDataRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { all_data } = useSelector((e) => e.ComponentPropsManagement);
  const [data, setData] = useState([]);
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [category4, setCategory4] = useState("");
  const [customeSongRequestAmount, setCustomeSongRequestAmount] = useState("");
  const [chargable, setChargable] = useState(false);

  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("id"));
  // console.log("ID", id);
  useEffect(() => {
    dispatch(handleGetDataRequest(id));
    console.log("ALL", all_data);
  }, []);

  useEffect(() => {
    if (all_data && all_data.amount) {
      setCustomeSongRequestAmount(all_data.amount.category_6);
      setCategory1(all_data.amount.category_7);
      setCategory2(all_data.amount.category_8);
      setCategory3(all_data.amount.category_9);
      setCategory4(all_data.amount.category_10);
      // setData(all_data.amount);
      setData((state) => [all_data.amount, ...state]);
    }
  }, [all_data]);

  // console.log(Array.isArray(data));
  // console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(handleNewDataRequest({ customeSongRequestAmount, id }));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: {
        category_6: customeSongRequestAmount,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://stg.dhunjam.in/account/admin/4", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("RESULT", result);
        toast.success("Price Updatede");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <form className="min-h-screen bg-[#030303] p-16" onSubmit={handleSubmit}>
      <div className="max-w-xl m-auto">
        <div className="text-center">
          <h1 className="text-[#fff] font-bold text-[32px] mb-3">
            {all_data && all_data.name}, {all_data && all_data.location} on Dhun
            Jam
          </h1>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <h1 className="text-[#fff] text-[16px]">
              Do you want to charge your customers for requesting Songs?
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center mb-4">
              <input
                id="Yes"
                type="radio"
                name="countries"
                value="yes"
                className="h-4 w-4 focus:ring-blue-300"
                aria-labelledby="Yes"
                checked={chargable}
                onChange={(e) => setChargable((state) => !state)}
                aria-describedby="Yes"
              />
              <label
                for="Yes"
                className="text-sm font-medium text-[#fff] block"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center mb-4 ml-4">
              <input
                id="No"
                type="radio"
                name="countries"
                value="no"
                onChange={(e) => setChargable((state) => !state)}
                className="h-4 w-4 focus:ring-blue-300"
                aria-labelledby="No"
                aria-describedby="No"
              />
              <label
                for="No"
                className="text-sm font-medium text-[#fff] ml-2 block"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between w-full">
          <div className="text-[#fff]">
            <h1>Custome song request amount-</h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <input
              type="text"
              value={customeSongRequestAmount}
              onChange={(e) => setCustomeSongRequestAmount(e.target.value)}
              disabled={!chargable ? true : false}
              required={chargable ? true : false}
              className={`p-2 bg-${
                chargable ? "#222" : "#030303"
              } rounded-lg border text-${chargable ? "#030303" : "#222"}`}
            />
          </div>
        </div>
        {/* 3 */}
        <div className="flex flex-1 items-center justify-between my-3">
          <h1 className="text-[#fff]">
            Regular song request amounts,
            <br />
            from high to low
          </h1>
          <div className="flex flex-1 flex-row items-center justify-center">
            <input
              type="text"
              value={category1}
              onChange={(e) => setCategory1(e.target.value)}
              disabled={!chargable ? true : false}
              required={chargable ? true : false}
              className={`p-3 bg-${
                chargable ? "#fff" : "#030303"
              } rounded-lg border text-${chargable ? "#030303" : "#fff"} w-12`}
            />
            <input
              type="text"
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
              disabled={!chargable ? true : false}
              required={chargable ? true : false}
              className={`p-3 bg-${
                chargable ? "#fff" : "#030303"
              } mx-2 rounded-lg border text-${
                chargable ? "#030303" : "#fff"
              } w-12`}
            />
            <input
              type="text"
              value={category3}
              onChange={(e) => setCategory3(e.target.value)}
              disabled={!chargable ? true : false}
              required={chargable ? true : false}
              className={`p-3 bg-${
                chargable ? "#fff" : "#030303"
              } rounded-lg border text-${
                chargable ? "#030303" : "#fff"
              } mr-2 w-12`}
            />
            <input
              type="text"
              value={category4}
              onChange={(e) => setCategory4(e.target.value)}
              disabled={!chargable ? true : false}
              required={chargable ? true : false}
              className={`p-3 bg-${
                chargable ? "#fff" : "#030303"
              } rounded-lg border text-${chargable ? "#030303" : "#fff"} w-12`}
            />
          </div>
        </div>
        {/* Chart */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            {chargable ? (
              <BarChart
                data={data}
                margin={{ top: 20, left: 20, right: 20, bottom: 10 }}
              >
                <XAxis dataKey="amount" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="category_6" fill="#2e2e2e" />
              </BarChart>
            ) : (
              ""
            )}
          </ResponsiveContainer>
        </div>
      </div>
      <div className="max-w-xl m-auto">
        <button
          className={`p-3 rounded-lg my-3 text-white ${
            chargable ? "bg-[#6741D9]" : "bg-[#2e2e2e]"
          } w-full`}
          disabled={!chargable ? true : false}
          type="submit"
        >
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};

export default Dashboard;
