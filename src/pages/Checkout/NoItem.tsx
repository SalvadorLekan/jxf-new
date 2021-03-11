import sadCart from "../../components/sad-cart.png";
import { Link, useParams } from "react-router-dom";

function NoItem() {
  const { shop } = useParams() as IParams;
  return (
    <div className="flex w-screen h-screen text-blue-800 justify-center items-center">
      <div className="p-4 bg-white rounded-md flex flex-col justify-center gap-4 items-center">
        <img src={sadCart} alt="empty cart" />
        Cart Is Empty
        <Link to={`/shop/${shop}`} className="btn ring-blue-800">
          Buy Some Products
        </Link>
      </div>
    </div>
  );
}

export default NoItem;
