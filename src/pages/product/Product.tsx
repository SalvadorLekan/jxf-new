import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Carousel from "../../components/Carousel";
import { RootState } from "../../toolkit";
import NoProduct from "./NoProduct";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineClose,
  AiOutlineWhatsApp,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { showCart, addToCart } from "../../toolkit/slice/cart";
import { FaRegCheckCircle } from "react-icons/fa";

function Product() {
  const { product: id, shop } = useParams() as IParams;

  const dispatch = useDispatch();

  const shopItems = useSelector(
    (state: RootState) => state.shopReducer.shop?.data?.products
  ) as ShopItem[];
  const name = useSelector(
    (state: RootState) => state.shopReducer.shop?.data?.business.businessName
  );
  const history = useHistory();
  const inCart = useSelector(
    (state: RootState) => state.cartReducer.cartItems[shop]?.[id]
  );

  const product = shopItems.find((item) => item.productSlug === id) as ShopItem;

  const [amount, setAmount] = useState(1);

  if (product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative bg-white h-5/6 sm:flex items-center rounded-lg gap-9 p-6 max-w-4xl">
          <button
            onClick={() => history.goBack()}
            className="btn bg-red-50 text-red-700 absolute top-4 right-4"
          >
            <AiOutlineClose />
          </button>
          <Carousel imageList={product.productMedia} />
          <div>
            <h3 className="font-bold text-xl py-2">{product.productName}</h3>
            <p className="font-semibold">By {name}</p>
            <h4>Product Description:</h4>
            <p className="font-medium">
              {product.productDescription || "This Product has no description."}
            </p>
            <h4>Price</h4>
            <p>NGN {product.productPrice}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  addToCart({
                    item: product,
                    number: product.isQuantityLimited ? amount : 1,
                    shopSlug: shop,
                  })
                );
                history.push(`/shop/${shop}`);
                setTimeout(() => dispatch(showCart()), 200);
              }}
            >
              {product.isQuantityLimited && (
                <div>
                  <label
                    htmlFor="amount"
                    className="font-semibold py-2 inline-block"
                  >
                    How Many?
                  </label>
                  <fieldset className="grid grid-cols-3 w-32 ring-2 ring-blue-400 rounded-md">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setAmount((a) => a - 1 || 1)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      value={amount}
                      onChange={(e) => {
                        setAmount(parseInt(e.target.value) || 1);
                      }}
                      id="amount"
                      type="number"
                      min={1}
                      className="min-w-0 focus:outline-none"
                    />
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setAmount((a) => a + 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </fieldset>
                </div>
              )}
              <div className="flex my-4 justify-between gap-4 items-start">
                {inCart ? (
                  <button
                    className="btn bg-green-400 text-white"
                    type="button"
                    onClick={() => {
                      history.goBack();
                      setTimeout(() => dispatch(showCart()), 200);
                    }}
                  >
                    <FaRegCheckCircle /> In Cart
                  </button>
                ) : (
                  <button type="submit" className="btn bg-green-400 text-white">
                    Add To Cart
                  </button>
                )}
                <div className="relative flex w-40 gap-2 text-white flex-wrap product-contact">
                  <button
                    className="btn relative z-20 bg-blue-600"
                    type="button"
                  >
                    <BsChevronDown />
                    Contact Us
                  </button>
                  <a href="/" className="btn bg-red-600">
                    <AiOutlineMail />
                    Email
                  </a>
                  <a href="/" className="btn bg-yellow-400">
                    <AiOutlinePhone />
                    Call Us
                  </a>
                  <a href="/" className="btn bg-green-600">
                    <AiOutlineWhatsApp />
                    Whatsapp
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  return <NoProduct />;
}

export default Product;
