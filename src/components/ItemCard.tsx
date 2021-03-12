import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../toolkit";
import Carousel from "./Carousel";

function ItemCard({ itemDetails }: { itemDetails: ShopItem }) {
  const { shop } = useParams() as IParams;
  const currency = useSelector(
    (state: RootState) => state.shopReducer.currency
  );
  return (
    <Link
      to={`/shop/${shop}/product/${itemDetails.productSlug}`}
      className="text-white mx-auto hover:bg-blue-400 transition-colors rounded-md justify-between w-60 py-3 px-2 bg-blue-600 h-80 flex flex-col items-center"
    >
      <Carousel imageList={itemDetails.productMedia} />
      <div className="py-2 self-start">
        <div>
          <p>
            <b>{itemDetails.productName}</b>
          </p>
        </div>
        <div className="py-1">
          <small>
            {currency} {itemDetails.productPrice}
          </small>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
