// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Danh sách sản phẩm trong giỏ hàng
    totalPrice: 0,
    checkoutInfo:[],
    paymentOption:' ' // Tổng giá trị của giỏ hàng
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += newItem.quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        state.items.push(newItem);
      }

      // Cập nhật tổng giá trị
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove) {
        // Giảm tổng giá trị khi xoá sản phẩm khỏi giỏ hàng
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;

        // Xoá sản phẩm khỏi giỏ hàng
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    updateItemCount: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        // Cập nhật số lượng và tổng giá trị
        state.totalPrice += (newQuantity - itemToUpdate.quantity) * itemToUpdate.price;
        itemToUpdate.quantity = newQuantity;
      }
    },
    clearCart: (state) => {
      // Xoá toàn bộ giỏ hàng
      state.items = [];
      state.totalPrice = 0;
    },
    updateItems: (state, action) => {
      if(action.payload){
        state.checkoutInfo = action.payload;
        console.log(action.payload);
      }else{
        console.log("khong nhan duoc thong tin");
      }
    },
      setTotalPrice: (state, action) => {
        state.totalPrice = action.payload;
        
      },
      setPaymentOption:(state, action) => {
        state.paymentOption = action.payload
      }
  },
});

export const {  setTotalPrice, updateItems, setPaymentOption} = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;