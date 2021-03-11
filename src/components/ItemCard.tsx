import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

function ItemCard({ itemDetails }: { itemDetails: ShopItem }) {
  const { shop } = useParams() as IParams;
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
          <small>NGN {itemDetails.productPrice}</small>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
