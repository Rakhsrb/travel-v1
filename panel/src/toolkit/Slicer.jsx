import { createSlice } from "@reduxjs/toolkit";

const MainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    admins: {
      isPending: false,
      data: [],
      isError: false,
    },
    specialOffers: {
      isPending: false,
      data: [],
      isError: false,
    },
    blogs: {
      isPending: false,
      data: [],
      isError: false,
    },
    featuredDestinations: {
      isPending: false,
      data: [],
      isError: false,
    },
    userData: {
      isLogin: JSON.parse(localStorage.getItem("token")) || false,
      isPending: false,
      isError: false,
    },
    // baseUrlApi: "https://travel-backend-4uug.onrender.com/",
    baseUrlApi: "http://localhost:4800/",
    config: {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    },
  },
  reducers: {
    getAdminsPending(state) {
      state.admins.isPending = true;
      state.admins.isError = false;
    },
    getAdminsSuccess(state, { payload }) {
      state.admins.isPending = false;
      state.admins.data = payload;
    },
    getAdminsError(state) {
      state.admins.isPending = false;
      state.admins.isError = true;
    },
    getSpecialOffersPending(state) {
      state.specialOffers.isPending = true;
      state.specialOffers.isError = false;
    },
    getSpecialOffersSuccess(state, { payload }) {
      state.specialOffers.isPending = false;
      state.specialOffers.data = payload;
    },
    getSpecialOffersError(state) {
      state.specialOffers.isPending = false;
      state.specialOffers.isError = true;
    },
    getBlogsPending(state) {
      state.blogs.isPending = true;
      state.blogs.isError = false;
    },
    getBlogsSuccess(state, { payload }) {
      state.blogs.isPending = false;
      state.blogs.data = payload;
    },
    getBlogsError(state) {
      state.blogs.isPending = false;
      state.blogs.isError = true;
    },
    getFeaturedDestinationsPending(state) {
      state.featuredDestinations.isPending = true;
      state.featuredDestinations.isError = false;
    },
    getFeaturedDestinationsSuccess(state, { payload }) {
      state.featuredDestinations.isPending = false;
      state.featuredDestinations.data = payload;
    },
    getFeaturedDestinationsError(state) {
      state.featuredDestinations.isPending = false;
      state.featuredDestinations.isError = true;
    },
    checkLogin(state, { payload }) {
      state.userData.isLogin = payload;
    },
    checkLoginPending(state) {
      state.userData.isPending = true;
      state.userData.isError = false;
    },
    checkLoginError(state) {
      state.userData.isPending = false;
      state.userData.isError = true;
    },
    deleteSpecialOffer(state, { payload }) {
      state.specialOffers.data = state.specialOffers.data.filter(
        (item) => item._id !== payload
      );
    },
    deleteBlog(state, { payload }) {
      state.blogs.data = state.blogs.data.filter(
        (item) => item._id !== payload
      );
    },
    deleteFeaturedDestination(state, { payload }) {
      state.featuredDestinations.data = state.featuredDestinations.data.filter(
        (item) => item._id !== payload
      );
    },
    deleteAdmin(state, { payload }) {
      state.admins.data = state.admins.data.filter(
        (item) => item._id !== payload
      );
    },
  },
});

export const {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getBlogsError,
  getBlogsPending,
  getBlogsSuccess,
  getFeaturedDestinationsError,
  getFeaturedDestinationsPending,
  getFeaturedDestinationsSuccess,
  getSpecialOffersError,
  getSpecialOffersPending,
  getSpecialOffersSuccess,
  deleteBlog,
  deleteFeaturedDestination,
  deleteSpecialOffer,
  checkLogin,
  checkLoginPending,
  checkLoginError,
  deleteAdmin,
} = MainSlice.actions;
export default MainSlice.reducer;
