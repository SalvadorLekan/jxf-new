import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearCart, closeCart } from "../../toolkit/slice/cart";
import success from "../../components/6685.png";
import { AiOutlineHome } from "react-icons/ai";

function Success() {
  const { shop } = useParams() as IParams;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart(shop));
    return () => {};
  }, [dispatch, shop]);
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <img src={success} alt="succssful transaction" />
      <p className="text-green-700 font-bold p-4 text-xl">
        Your Order Was Successful
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

export default Success;
