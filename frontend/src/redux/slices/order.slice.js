import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api.service";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  orders: null,
};

export const addOrders = createAsyncThunk("orders/addOrders", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "POST",
      url: "/order",
      data,
    }),
    thunkAPI
  );
  return response;
});
export const getUserOrdersById = createAsyncThunk("orders/getUserOrdersById", ({ id }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: `/order/user/${id}`
    }),
    thunkAPI
  );
  return response;
});

export const dishesSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Order Created Successfully")
      })
      .addCase(addOrders.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
      .addCase(getUserOrdersById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrdersById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data;
      })
      .addCase(getUserOrdersById.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
  },
});

export default dishesSlice.reducer;