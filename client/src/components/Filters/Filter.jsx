import { Box, Slider } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangePrice,
  handleRangeValue,
} from "../../store/Slices/MainSlice";
export const Filter = () => {
  //STAR RATING FILTER DATA
  const [ratings, setRatings] = useState([
    {
      id: 1,
      isChecked: false,
      rating: 5,
    },
    {
      id: 2,
      isChecked: false,
      rating: 4,
    },
    {
      id: 3,
      isChecked: false,
      rating: 3,
    },
    {
      id: 4,
      isChecked: false,
      rating: 2,
    },
    {
      id: 5,
      isChecked: false,
      rating: 1,
    },
  ]);

  const [filterValues, setFilterValues] = useState({
    title: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  //SET CHECK FUNCTION
  const handleChange = (id) => {
    setRatings(
      ratings.map((rating) =>
        rating.id === id ? { ...rating, isChecked: !rating.isChecked } : rating
      )
    );
  };

  const getFilterValues = (e) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const { priceValue } = useSelector((state) => state.mainSlice);
  return (
    <div className="bg-transparent flex flex-col gap-10 lg:w-[350px]">
      <div className="flex flex-col border rounded-sm p-5 gap-6 bg-white">
        <span className="uppercase text-lg">FIND CITY</span>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Destination, City"
            className="p-3 rounded-md border text-sm text-[#4d4d44] placeholder:text-[#4d4d4d]"
            onChange={getFilterValues}
          />
          <div className="details-form_select flex justify-between items-center w-full">
            <select
              className="p-3 rounded-md border text-sm w-full"
              onChange={getFilterValues}
              id="styled-select_filter"
            >
              <option value="">Select Location</option>
              <option value="moscow">Moscow</option>
              <option value="peter">Saint Petersburg</option>
              <option value="korea">South Korea</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Date From"
            onChange={getFilterValues}
            className="p-3 rounded-md border text-sm text-[#4d4d44] placeholder:text-[#4d4d4d]"
          />
          <input
            type="text"
            placeholder="Date To"
            onChange={getFilterValues}
            className="p-3 rounded-md border text-sm text-[#4d4d44] placeholder:text-[#4d4d4d]"
          />
          <div>
            <div className="flex items-center sm:w-1/5 lg:w-2/3">
              <input
                type="number"
                className="w-full"
                value={priceValue[0]}
                onChange={() =>
                  dispatch(handleChangePrice({ event: e, index: 0 }))
                }
              />
              <span className="mr-2">-</span>
              <input
                className="w-full"
                type="number"
                value={priceValue[1]}
                onChange={() =>
                  dispatch(handleChangePrice({ event: e, index: 1 }))
                }
              />
            </div>
            <Box>
              <Slider
                value={priceValue}
                onChange={(e) =>
                  dispatch(
                    handleRangeValue({ event: e, newValue: e.target.value })
                  )
                }
                valueLabelDisplay="auto"
                min={0}
                max={120000}
              />
            </Box>
          </div>
          <button className="bg-[#f85959] w-full text-white py-3">
            Search
          </button>
        </div>
      </div>
      {/* STAR RATING FILTER */}
      {/* <div className="flex flex-col border rounded-sm p-5 gap-6 bg-white">
        <span className="uppercase text-lg">STAR RATING</span>
        <div className="flex flex-col gap-5">
          {ratings?.map((elem) => (
            <div className="flex items-center gap-3" key={elem.id}>
              <input
                type="checkbox"
                id={`rating${elem.id}`}
                checked={elem.isChecked}
                onChange={() => handleChange(elem.id)}
              />
              <label htmlFor={`rating${elem.id}`}>
                <Rating
                  name="read-only"
                  className="!text-[#f85959] !text-base"
                  value={elem.rating}
                  readOnly
                />
              </label>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
