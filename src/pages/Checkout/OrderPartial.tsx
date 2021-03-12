import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { closeCart } from "../../toolkit/slice/cart";

function OrderPartial() {
  const dispatch = useDispatch();
  const { shop } = useParams() as IParams;
  return (
    <div className="flex flex-col gap-10 w-screen h-screen justify-center items-center">
      <p className="p-4 text-blue-800 font-semibold text-lg">
        Some Orders Failed, check your mail for more details.
      </p>
      <Link
        onClick={() => dispatch(closeCart())}
        to={`/shop/${shop}`}
        className="text-green-700 btn bg-white"
      >
        <AiOutlineHome />
        Back To Shop
      </Link>
    </div>
  );
}

export default OrderPartial;
