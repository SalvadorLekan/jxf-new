import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import CheckOut from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import Product from "../pages/product/Product";
import About from "../pages/shop/About";
import NoShop from "../pages/shop/NoShop";
import Shop from "../pages/shop/Shop";
import ShopLoading from "../pages/shop/ShopLoading";
import { RootState } from "../toolkit";
import { fetchShopData } from "../toolkit/slice/shop";

function ShopShell() {
  const params = useParams() as IParams;
  let match = useRouteMatch();
  const dispatch = useDispatch();

  const { error, loading, shop } = useSelector(
    (state: RootState) => state.shopReducer
  );

  useEffect(() => {
    dispatch(fetchShopData(params.shop));
    return () => {};
  }, [dispatch, params.shop]);

  if (loading) return <ShopLoading />;

  if (error) return <div>Error</div>;

  if (shop?.data)
    return (
      <Switch>
        <Route path={match.path} exact>
          <Shop />
        </Route>
        <Route path={`${match.path}/about`} exact>
          <About />
        </Route>
        <Route path={`${match.path}/checkout`} exact>
          <CheckOut />
        </Route>
        <Route path={`${match.path}/product/:product`} exact>
          <Product />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );

  return <NoShop />;
}

export default ShopShell;
