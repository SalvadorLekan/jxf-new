import Header from "../../components/Header";
import Cart from "../../components/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../toolkit";
import ItemCard from "../../components/ItemCard";
import SearchBar from "../../components/SearchBar";
function Shop() {
  const shopItems = useSelector(
    (state: RootState) => state.shopReducer.shop?.data?.products
  ) as ShopItem[];
  return (
    <div>
      <div
        className="mx-auto sticky top-0 w-full z-30"
        style={{ maxWidth: 1600 }}
      >
        <Header />
      </div>
      {shopItems.length ? (
        <div className="container mx-auto px-9 md:px-2">
          <SearchBar />
        </div>
      ) : null}
      <Cart />
      <main className="shop-item-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container gap-y-6 xl:gap-y-16 mx-auto">
        {shopItems.map((item) => (
          <div className="" key={item.id}>
            <ItemCard itemDetails={item} />
          </div>
        ))}
      </main>
      {/* <div className="fixed w-full h-5 bg-blue-900 bottom-0 border-b-2 border-blue-200">
        h
      </div> */}
    </div>
  );
}

export default Shop;
