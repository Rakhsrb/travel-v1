import { CiMap } from "react-icons/ci";
import { SlMagnifier } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import "./uiStyles.css";

export const CardUI = ({
  cardID,
  imgUrl,
  price,
  title,
  time,
  description,
  duration,
  location,
  btnTitle,
  detailsURL,
  btnLinkTo,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative imgHover">
        <Link
          to={`/${detailsURL}/${cardID}`}
          className="bg-no-repeat bg-cover bg-center block h-[200px]"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></Link>
        <span className="w-[60px] h-[60px] bg-white absolute flex justify-center items-center">
          <SlMagnifier />
        </span>
      </div>
      <div className="p-4 bg-white border border-[#e6e6e6] border-t-transparent flex flex-col gap-4">
        <div className="flex justify-between items-center gap-3">
          <h4 className="text-lg">{title}</h4>
          <p className="text-[#2f89fc] flex flex-col">
            <span>{price.toLocaleString()} uzs</span>{" "}
            <span className="text-xs">{time}</span>
          </p>
        </div>
        <p className="text-sm text-[#4d4d4d]">{description}</p>
        <span className="textf-xs">{duration}</span>
        <hr />
        <div className="grid grid-cols-1  gap-2">
          <span className="flex gap-2 text-xs sm:text-sm items-center">
            <CiMap fontSize={20} /> {location}
          </span>
          <button
            className="text-sm bg-[#8bc34a] p-[5px] rounded-md text-white capitalize"
            onClick={() => navigate(btnLinkTo)}
          >
            {btnTitle}
          </button>
        </div>
      </div>
    </div>
  );
};
