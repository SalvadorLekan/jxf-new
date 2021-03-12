import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../toolkit";
import { showCart } from "../toolkit/slice/cart";

function Header() {
  const dispatch = useDispatch();
  const shop = useSelector(
    (state: RootState) => state.shopReducer.shop?.data
  ) as ShopData;
  return (
    <header className="flex z-10 sticky bg-white bg-opacity-50 w-full top-0 gap-4 flex-wrap items-center justify-between p-4">
      <NavLink
        to={`/shop/${shop.storeSlug}`}
        className="flex items-center gap-3"
      >
        <img
          width={36}
          height={36}
          className="h-9 hidden sm:inline-block"
          src="/logo192.png"
          alt="logo"
          title="logo"
        />
        <b className="text-2xl sm:hidden text-indigo-700 md:inline truncate">
          {shop.storeName}
        </b>
      </NavLink>
      {/* <button
        onClick={() => setHeight((prev) => (prev === "h-0" ? "h-52" : "h-0"))}
        className="btn sm:hidden text-white bg-indigo-800"
      >
        &#9776;
      </button> */}
      <nav className="hidden sm:flex">
        <button
          onClick={() => dispatch(showCart())}
          className="btn bg-purple-800 text-white"
        >
          <FaShoppingCart />
          <p>Cart</p>
        </button>
      </nav>
    </header>
  );
}

export default Header;
