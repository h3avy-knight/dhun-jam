import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { useDispatch } from "react-redux";
import { handleLoginRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    dispatch(handleLoginRequest({ username, password }));
  };
  return (
    <section className="grid min-h-screen place-items-center bg-[#030303] p-16">
      <div className="w-1/2 rounded-md bg-[#] p-4 pt-0 shadow-lg">
        <header className="text-white my-6 font-bold">
          <h1 className="text-2xl flex items-center justify-center">
            Venue Admin login
          </h1>
        </header>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input
            className="p-3 bg-[#030303] rounded-lg border text-[#FFFFFF]"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <div className="p-3 bg-[#030303] rounded-lg border flex items-center justify-between">
            <input
              className="bg-[#030303] rounded-lg w-full focus:none text-[#FFFFFF] outline-none"
              type={visiblePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div
              className="cursor-pointer"
              onClick={() => setVisiblePassword((state) => !state)}
            >
              <IoMdEye color="#fff" size={20} />
            </div>
          </div>
          <button
            className="p-3 rounded-lg my-3 text-white bg-[#6741D9]"
            type="submit"
          >
            <span>Sign In</span>
          </button>
          <span className="text-white flex items-center justify-center">
            New Registration?
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;
