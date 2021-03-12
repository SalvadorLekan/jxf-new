import { ReactChild, useState } from "react";
import PlaceHolder from "./FX13_bag.svg";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Carousel({ imageList }: { imageList: string[] }) {
  const [active, setActive] = useState(0);

  function prev(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    setActive((active) => (active === 0 ? imageList.length - 1 : active - 1));
  }

  function next(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    setActive((active) => (active === imageList.length - 1 ? 0 : active + 1));
  }
  if (imageList.length === 0)
    return (
      <CarouselDiv>
        <img
          width={150}
          height={225}
          src={PlaceHolder}
          alt="shopping bag"
          style={{ maxHeight: "80%", maxWidth: "80%" }}
        />
      </CarouselDiv>
    );
  if (imageList.length === 1)
    return (
      <CarouselDiv>
        <img
          src={imageList[0]}
          alt="shopping bag"
          style={{ maxHeight: "80%", maxWidth: "80%" }}
        />
      </CarouselDiv>
    );
  return (
    <CarouselDiv>
      <>
        {imageList.map((image, ind) => (
          <img
            loading="lazy"
            key={ind}
            src={image}
            className={
              ind === active ? "carousel-image active" : "carousel-image"
            }
            alt="shopping bag"
            style={{ maxHeight: "80%", maxWidth: "80%" }}
          />
        ))}
        <button
          title="previous image"
          className="arrow back"
          onClick={prev}
          type="button"
        >
          <IoIosArrowBack />
        </button>
        <button
          title="next image"
          className="arrow next"
          onClick={next}
          type="button"
        >
          <IoIosArrowForward />
        </button>
      </>
    </CarouselDiv>
  );
}

function CarouselDiv(params: { children: ReactChild }) {
  return (
    <div className="w-56 relative flex justify-center items-center rounded-md h-52 flex-shrink-0">
      {params.children}
    </div>
  );
}

export default Carousel;
