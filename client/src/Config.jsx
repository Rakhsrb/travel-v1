import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogsError,
  getBlogsPending,
  getBlogsSuccess,
  getFeaturedDestinationsError,
  getFeaturedDestinationsPending,
  getFeaturedDestinationsSuccess,
  getHotelError,
  getHotelPending,
  getHotelSuccess,
  getRestaurantsError,
  getRestaurantsPending,
  getRestaurantsSuccess,
  getToursError,
  getToursPending,
  getToursSuccess,
} from "./store/Slices/MainSlice";

export const Config = () => {
  let dispatch = useDispatch();
  const { baseUrl } = useSelector((state) => state.mainSlice);
  const RestaurantsApi = async () => {
    try {
      dispatch(getRestaurantsPending());
      const response = (
        await axios.get(baseUrl + "api/specialOffers/?category=restaurants")
      ).data.data;
      dispatch(getRestaurantsSuccess(response));
    } catch (error) {
      dispatch(getRestaurantsError());
      console.log(error);
    }
  };
  const ToursApi = async () => {
    try {
      dispatch(getToursPending());
      const response = (
        await axios.get(baseUrl + "api/specialOffers/?category=tourpackages")
      ).data.data;
      dispatch(getToursSuccess(response));
    } catch (error) {
      dispatch(getToursError());
      console.log(error);
    }
  };
  const HotelsApi = async () => {
    try {
      dispatch(getHotelPending());
      const response = (
        await axios.get(baseUrl + "api/specialOffers/?category=hotelandrooms")
      ).data.data;
      dispatch(getHotelSuccess(response));
    } catch (error) {
      dispatch(getHotelError());
      console.log(error);
    }
  };
  const FeaturedApi = async () => {
    try {
      dispatch(getFeaturedDestinationsPending());
      const response = (await axios.get(baseUrl + "api/featuredDestinations"))
        .data.data;
      dispatch(getFeaturedDestinationsSuccess(response));
    } catch (error) {
      dispatch(getFeaturedDestinationsError());
      console.log(error);
    }
  };
  const BlogsApi = async () => {
    try {
      dispatch(getBlogsPending());
      const response = (await axios.get(baseUrl + "api/blogs")).data.data;
      dispatch(getBlogsSuccess(response));
    } catch (error) {
      dispatch(getBlogsError());
      console.log(error);
    }
  };

  useEffect(() => {
    RestaurantsApi();
    ToursApi();
    HotelsApi();
    FeaturedApi();
    BlogsApi();
  }, []);
};
