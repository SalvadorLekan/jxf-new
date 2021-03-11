import { RiArrowLeftSLine } from "react-icons/ri";
import { IoBagCheck } from "react-icons/io5";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeCart } from "../toolkit/slice/cart";
import { RootState } from "../toolkit";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function Cart() {
  const { shop } = useParams() as IParams;
  const dispatch = useDispatch();
  const { offset: cartOffset, cartItems } = useSelector(
    (state: RootState) => state.cartReducer
  );
  const [items, setItems] = useState(Array<string>());

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const cartForShop = cartItems[shop] || {};
    setItems(Object.keys(cartForShop));

    let tempPrice = 0;
    for (let item in cartForShop) {
      if (cartForShop[item]) {
        tempPrice +=
          cartForShop[item].amount * cartForShop[item].item.productPrice;
      }
    }
    setPrice(tempPrice);
    return () => {};
  }, [cartItems, shop]);
  return (
    <div
      onClick={() => dispatch(closeCart())}
      className={`w-full fixed top-0 bottom-0 transition-all duration-300 z-30 flex justify-end ${cartOffset}`}
    >
      <div
        className="w-full p-2 h-screen md:w-6/12 bg-blue-500 grid-rows-12 grid gap-2 lg:w-4/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="row-span-1 px-2 flex justify-between items-center">
          <button
            className="btn text-white bg-blue-900 focus:ring-white"
            onClick={() => dispatch(closeCart())}
          >
            <AiOutlineClose />
            <p>Close</p>
          </button>
          <b className="btn bg-white text-blue-800">
            <span>NGN</span>
            <span>{price}.00</span>
          </b>
        </div>
        <div className="cart-list relative row-span-10 flex flex-col gap-4 sm:gap-2 overflow-y-auto rounded-md p-2 sm:p-4">
          {items.map((item) => (
            <CartItem item={item} key={item} />
          ))}
        </div>
        <div className="row-span-1 flex justify-between items-center">
          <button
            onClick={() => dispatch(closeCart())}
            className="btn text-blue-900 bg-white focus:ring-blue-900 "
          >
            <RiArrowLeftSLine />
            <p>To Shop</p>
          </button>
          {price ? (
            <Link
              to={`/shop/${shop}/checkout`}
              className="btn focus:ring-white text-white bg-blue-900"
            >
              <p>Checkout</p>
              <IoBagCheck />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Cart;
