import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RootState } from "../../toolkit";
import { init, sendOrder } from "../../toolkit/slice/order";
import NoItem from "./NoItem";
import OrderError from "./OrderError";
import OrderLoading from "./OrderLoading";
import OrderPartial from "./OrderPartial";
import Success from "./Success";

function CheckOut() {
  const { shop } = useParams() as IParams;
  const orders = useSelector(
    (state: RootState) => state.cartReducer.cartItems[shop]
  );
  const shopData = useSelector(
    (state: RootState) => state.shopReducer.shop?.data
  ) as ShopData;

  const orderStatus = useSelector((state: RootState) => state.order.status);

  const [order, setOrder] = useState(Array<OrderToServer>());

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(init());
    };
  }, [dispatch]);

  useEffect(() => {
    const ordersToServer = Array<OrderToServer>();
    for (let key in orders) {
      if (orders[key]) {
        ordersToServer.push({
          businessId: shopData.business.businessId,
          customerEmail: email,
          customerName: name,
          orderAmount: orders[key].amount * orders[key].item.productPrice,
          orderQuantity: orders[key].amount,
          productId: orders[key].item.id,
          storeId: shopData.id,
        });
      }
    }
    setOrder(ordersToServer);
    return () => {};
  }, [orders, shopData, email, name]);

  if (orderStatus === "pending") return <OrderLoading />;
  if (orderStatus === "partial") return <OrderPartial />;
  if (orderStatus === "failure") return <OrderError />;
  if (orderStatus === "success") return <Success />;
  if (orderStatus === "initial") {
    if (order.length)
      return (
        <div className="flex w-screen h-screen justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(sendOrder({ order, shop }));
            }}
            className="flex flex-col px-4 py-10 sm:px-10 relative bg-white gap-6 rounded-md max-w-4xl"
          >
            <button
              onClick={() => history.goBack()}
              className="btn bg-red-50 text-red-800 absolute top-2 right-2"
            >
              <AiOutlineClose />
            </button>
            <h3 className="font-bold text-xl text-blue-800">
              Fill This Form To Complete Order
            </h3>
            <label htmlFor="name" className="text-lg font-semibold">
              Enter Name
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-blue-800 placeholder-blue-400 px-4 py-2 rounded-md focus:outline-none ring-2 focus:ring-blue-800 text-base"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
            />
            <label htmlFor="email" className="text-lg font-semibold">
              Enter E-Mail Address
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-2 text-blue-800 placeholder-blue-400 rounded-md focus:outline-none ring-2 focus:ring-blue-800 text-base"
              type="email"
              name="email"
              id="email"
              placeholder="e@mail.com"
            />
            <button className="btn font-semibold justify-center text-white bg-blue-800">
              Place Order
            </button>
          </form>
        </div>
      );
    return <NoItem />;
  }
  return <></>;
}

export default CheckOut;
