import { createSlice } from "@reduxjs/toolkit";

const MainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    tourpackages: {
      isPending: false,
      data: [],
      isError: false,
    },
    restaurants: {
      isPending: false,
      data: [],
      isError: false,
    },
    hotelandrooms: {
      isPending: false,
      data: [],
      isError: false,
    },
    blogs: {
      isPending: false,
      data: [],
      isError: false,
    },
    featured: {
      isPending: false,
      data: [],
      isError: false,
    },
    testimonials: [
      {
        id: 1,
        name: "Dennis Green",
        from: "Italy",
        comment:
          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts",
        photo: "src/assets/testimonials/person_1.jpg.webp",
      },
      {
        id: 2,
        name: "Dennis Green",
        from: "London",
        comment:
          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts",
        photo: "src/assets/testimonials/person_2.jpg.webp",
      },
      {
        id: 3,
        name: "Dennis Green",
        from: "Philippines",
        comment:
          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts",
        photo: "src/assets/testimonials/person_3.jpg.webp",
      },
    ],
    user_requests: [],
    frequently: [
      {
        id: 1,
        question: "When she reached the first hills?",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
      {
        id: 2,
        question: "Italic Mountains, she had a last",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
      {
        id: 3,
        question: "Bookmarksgrove, the headline",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
      {
        id: 4,
        question: "Alphabet Village and the subline of her own?",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
      {
        id: 5,
        question: "Then she continued her way?",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
      {
        id: 6,
        question: "Skyline of her hometown Bookmarksgrove",
        answer:
          "When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.",
        isOpen: false,
      },
    ],
    priceValue: [1000, 50000],
    baseUrl: "https://travel-backend-4uug.onrender.com/",
    // baseUrl: "http://localhost:4800/",
    foundedValues: {
      isPending: false,
      data: [],
      isError: false,
    },
  },
  reducers: {
    openAswer: (state, { payload }) => {
      state = {
        ...state,
        frequently: state.frequently.map((elem) =>
          elem.id === payload ? { ...elem, isOpen: !elem.isOpen } : elem
        ),
      };
      return state;
    },
    getRestaurantsPending(state) {
      state.restaurants.isPending = true;
      state.restaurants.isError = false;
    },
    getRestaurantsSuccess(state, { payload }) {
      state.restaurants.isPending = false;
      state.restaurants.data = payload;
    },
    getRestaurantsError(state) {
      state.restaurants.isPending = false;
      state.restaurants.isError = true;
    },
    getToursPending(state) {
      state.tourpackages.isPending = true;
      state.tourpackages.isError = false;
    },
    getToursSuccess(state, { payload }) {
      state.tourpackages.isPending = false;
      state.tourpackages.data = payload;
    },
    getToursError(state) {
      state.tourpackages.isPending = false;
      state.tourpackages.isError = true;
    },
    getHotelPending(state) {
      state.hotelandrooms.isPending = true;
      state.hotelandrooms.isError = false;
    },
    getHotelSuccess(state, { payload }) {
      state.hotelandrooms.isPending = false;
      state.hotelandrooms.data = payload;
    },
    getHotelError(state) {
      state.hotelandrooms.isPending = false;
      state.hotelandrooms.isError = true;
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
      state.featured.isPending = true;
      state.featured.isError = false;
    },
    getFeaturedDestinationsSuccess(state, { payload }) {
      state.featured.isPending = false;
      state.featured.data = payload;
    },
    getFeaturedDestinationsError(state) {
      state.featured.isPending = false;
      state.featured.isError = true;
    },
    handleChangePrice: (state, { payload }) => {
      const { event, index } = payload;
      state = {
        ...state,
        priceValue: state.priceValue.map((elem, i) =>
          i === index ? (elem = +event.target.value) : elem
        ),
      };
      return state;
    },
    handleRangeValue: (state, { payload }) => {
      const { newValue } = payload;
      state = { ...state, priceValue: newValue };
      return state;
    },
  },
  baseUrl: "http://localhost:4800/",
  // baseUrl: "https://travel-backend-4uug.onrender.com/",
});

export const {
  openAswer,
  handleChangePrice,
  handleRangeValue,
  getBlogsError,
  getBlogsPending,
  getBlogsSuccess,
  getFeaturedDestinationsError,
  getFeaturedDestinationsPending,
  getFeaturedDestinationsSuccess,
  getRestaurantsError,
  getRestaurantsPending,
  getRestaurantsSuccess,
  getHotelError,
  getHotelPending,
  getHotelSuccess,
  getToursError,
  getToursPending,
  getToursSuccess,
  getFoundedError,
  getFoundedPending,
  getFoundedSuccess,
} = MainSlice.actions;
export default MainSlice.reducer;
