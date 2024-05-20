import { createSlice } from "@reduxjs/toolkit";
import { Flip, toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (!existing) {
        const newItem = action.payload;
        state.items.push(newItem);
        localStorage.setItem("cart", JSON.stringify([...state.items]));
        toast.success("Item Added to Cart Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      } else {
        toast.error("Item already exist in Cart", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      }
    },
    removeItem(state, action) {
      const _id = action.payload;
      const itemToRemove = state.items.find((item) => item._id === _id);
      if (itemToRemove) {
        state.items = state.items.filter((item) => item._id !== _id);
        localStorage.setItem("cart", JSON.stringify(state.items));
        toast.success("Item removed from Cart Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem("cart", state.items);
    },
    addItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addItems, addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice;
