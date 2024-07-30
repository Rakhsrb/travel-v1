import { About } from "./pages/AboutPage/About";
import { Blogs } from "./pages/BlogsPage/Blogs";
import { Contact } from "./pages/ContactsPage/Contact";
import { BlogDetails } from "./pages/DetailsPages/BlogDetails";
import { HotelDetails } from "./pages/DetailsPages/HotelDetails";
import { RestDetails } from "./pages/DetailsPages/RestDetails";
import { TourDetails } from "./pages/DetailsPages/TourDetails";
import { Home } from "./pages/HomePage/Home";
import { Hotels } from "./pages/HotelsPage/Hotels";
import { Search } from "./pages/SearchingPage/Search";
import { Tours } from "./pages/ToursPage/Tours";

const Paths = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tours",
    element: <Tours />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
  {
    path: "/contacts",
    element: <Contact />,
  },
  {
    path: "/hotel-details/:id",
    element: <HotelDetails />,
  },
  {
    path: "/tour-details/:id",
    element: <TourDetails />,
  },
  {
    path: "/blog-details/:id",
    element: <BlogDetails />,
  },
  {
    path: "/restaurant-details/:id",
    element: <RestDetails />,
  },
  {
    path: "/search/:title/:category/:location",
    element: <Search />,
  },
];

export default Paths;
