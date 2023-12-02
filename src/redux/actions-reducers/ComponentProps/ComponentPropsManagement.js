import { createSlice } from "@reduxjs/toolkit";

var initialComponentPropsManagementState = {
  load: false,
  all_data: {},
};

export const ComponentPropsManagement = createSlice({
  name: "ComponentPropsManagement",
  initialState: initialComponentPropsManagementState,
  reducers: {
    // Login User
    handleLoginRequest: (state, payload) => {
      state.load = true;
    },
    handleLoginResponse: (state, payload) => {},
    handleGetDataRequest: (state, payload) => {},
    handleGetDataResponse: (state, payload) => {
      console.log("PAYLOAD 1", payload.data);
      state.all_data = payload.data;
    },
    handleNewDataRequest: (state, payload) => {},
    handleNewDataResponse: (state, payload) => {
      // console.log("PAYLOAD 1", payload.data);
      // state.all_data = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleLoginRequest,
  handleGetDataRequest,
  handleNewDataRequest,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
