import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import { Admins } from "./pages/Admins";
import { Dashboard } from "./pages/Dashboard";
import Admin from "./pages/Details/Admin";
import EditAdmin from "./pages/EditPages/EditAdmin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { FeaturedDestinations } from "./pages/FeaturedDestinations";
import { checkLogin } from "./toolkit/Slicer";
import { SpecialOffers } from "./pages/SpecialOffers";
import AddSpecialOffer from "./pages/AddPages/AddSpecialOffer";
import { Blogs } from "./pages/Blogs";
import AddBlogs from "./pages/AddPages/AddBlogs";
import AddFeaturedDestination from "./pages/AddPages/AddFeaturedDestination";
import EditSpecialOffer from "./pages/EditPages/EditSpecialOffer";
import EditBlog from "./pages/EditPages/EditBlog";
import EditFeaturedDestination from "./pages/EditPages/EditFeaturedDestination";
import SpecialOffer from "./pages/Details/SpecialOffer";
import Blog from "./pages/Details/Blog";
import FeaturedDestination from "./pages/Details/FeaturedDestination";
function App() {
  const { userData, config, baseUrlApi } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser(id) {
      try {
        const response = await axios.get(
          baseUrlApi + "api/admins/" + id,
          config
        ).data;
        if (response) {
          dispatch(checkLogin(true));
        }
      } catch (err) {
        dispatch(checkLogin(false));
        console.log(err);
      }
    }
    if (JSON.parse(localStorage.getItem("adminInfo"))) {
      const userId = JSON.parse(localStorage.getItem("adminInfo"));
      getUser(userId._id);
    } else {
      dispatch(checkLogin(false));
    }
  }, []);

  const router = createBrowserRouter([
    userData.isLogin
      ? {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "/special-offers",
              element: <SpecialOffers />,
            },
            {
              path: "/blogs",
              element: <Blogs />,
            },
            {
              path: "/admins",
              element: <Admins />,
            },
            {
              path: "/featured-destinations",
              element: <FeaturedDestinations />,
            },
            //add paths
            {
              path: "/add-admin",
              element: <AddAdmin />,
            },
            {
              path: "/add-offer",
              element: <AddSpecialOffer />,
            },
            {
              path: "/add-blog",
              element: <AddBlogs />,
            },
            {
              path: "/add-featured-destination",
              element: <AddFeaturedDestination />,
            },
            //edit paths
            {
              path: "/edit-admin/:id",
              element: <EditAdmin />,
            },
            {
              path: "/edit-special-offer/:id",
              element: <EditSpecialOffer />,
            },
            {
              path: "/edit-blog/:id",
              element: <EditBlog />,
            },
            {
              path: "/edit-featured-destination/:id",
              element: <EditFeaturedDestination />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
            // Details
            {
              path: "/admin/:id",
              element: <Admin />,
            },
            {
              path: "/special-offer/:id",
              element: <SpecialOffer />,
            },
            {
              path: "/blog/:id",
              element: <Blog />,
            },
            {
              path: "/featured-destination/:id",
              element: <FeaturedDestination />,
            },
          ],
        }
      : {
          path: "/",
          element: <Login />,
        },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
