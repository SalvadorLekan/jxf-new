import { AiOutlineDelete } from "react-icons/ai";
import { GoDash, GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../toolkit";
import {
  decreaseItem,
  increaseItem,
  removeFromCart,
} from "../toolkit/slice/cart";

import sadCart from "./FX13_bag.svg";

function CartItem({ item }: { item: string }) {
  const { shop } = useParams() as IParams;
  const cartData = useSelector(
    (state: RootState) => state.cartReducer.cartItems[shop][item]
  );

  const dispatch = useDispatch();

  if (!cartData) return <></>;
  const { amount, item: shopItem } = cartData;
  return (
    <div className="w-full max-w-lg mx-auto h-48 items-start p-2 justify-between flex rounded-md bg-blue-200">
      <div className="h-44 bg-blue-500 rounded-r-none flex-grow rounded-md text-white p-4 overflow-hidden flex flex-col justify-between">
        <p className="">
          <b>{shopItem.productName}</b>
        </p>
        {shopItem.isQuantityLimited && (
          <div className="grid grid-cols-3 rounded-md my-4 border-2 w-32 border-white">
            <button
              className="btn"
              onClick={() =>
                dispatch(decreaseItem({ item: shopItem, shopSlug: shop }))
              }
            >
              <GoDash />
            </button>
            <div className="flex items-center justify-center">{amount}</div>
            <button
              className="btn"
              onClick={() =>
                dispatch(increaseItem({ item: shopItem, shopSlug: shop }))
              }
            >
              <GoPlus />
            </button>
          </div>
        )}
        <div className="">
          <b>NGN {shopItem.productPrice}</b>
        </div>
      </div>
      <div className="h-full w-24 flex-shrink-0 flex-col flex items-end justify-between py-4 pr-4 rounded-md bg-blue-500 rounded-l-none">
        <div className="h-24 bg-blue-200 flex justify-center items-center overflow-hidden rounded-lg w-full">
          <img
            src={shopItem.productMedia[0] || sadCart}
            alt=""
            className="h-20"
          />
        </div>
        <button
          className="btn bg-red-700 text-white"
          onClick={() =>
            dispatch(removeFromCart({ shopSlug: shop, item: shopItem }))
          }
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
