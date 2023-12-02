import { put, takeEvery, all, retry } from "redux-saga/effects";
import { toast } from "react-toastify";
import { Navigate, json } from "react-router-dom";

function* handleLoginRequest(e) {
  console.log("EEE", e.payload);
  const response = yield fetch(`https://stg.dhunjam.in/account/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("LOGIN DATA", jsonData);
  if (jsonData) {
    if (jsonData.status === 200) {
      // console.log("LOGIN DATA", jsonData.data.token);
      localStorage.setItem("id", JSON.stringify(jsonData.data.id));
      localStorage.setItem("Token", JSON.stringify(jsonData.data.token));
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData.data.token,
      });
      window.location.replace("/");
    } else {
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: {},
      });
    }
  }
}
function* handleGetDataRequest(e) {
  console.log("***", e);
  const response = yield fetch(
    `https://stg.dhunjam.in/account/admin/${e.payload}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jsonData = yield response.json();
  if (jsonData.status == 200) {
    // console.log("ALL DATA", jsonData);
    yield put({
      type: "ComponentPropsManagement/handleGetDataResponse",
      data: jsonData.data,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleGetDataResponse",
      data: {},
    });
  }
}
function* handleNewDataRequest(e) {
  console.log("UPDATE", e);
  const { id, customeSongRequestAmount } = e.payload;
  console.log(id, customeSongRequestAmount);
  try {
    const response = yield fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: customeSongRequestAmount,
    });
    const jsonData = yield response.json();
    console.log("Update JSONDATA", jsonData);
    // if (jsonData) {
    //   if (jsonData.status === true) {
    //     toast.success(jsonData.message);
    //     // yield put({
    //     //   type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
    //     //   data: jsonData.data,
    //     // });
    //   } else {
    //     toast.error(jsonData.message);
    //   }
    // } else {
    //   toast.error("Something went wrong");
    // }
  } catch (err) {
    toast.error(err.message);
  }
}

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGetDataRequest",
    handleGetDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleNewDataRequest",
    handleNewDataRequest
  );
}

// export function* incrementAsync() {
//     yield delay(1000)
//     yield put({ type: 'INCREMENT' })
// }

// export function* watchIncrementAsync() {
//     yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

// export function* saga() {

// }

export default function* rootSaga() {
  yield all([
    helloSaga(),
    // watchIncrementAsync()
  ]);
}

// export default saga
