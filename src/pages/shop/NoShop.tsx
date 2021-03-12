import { useParams } from "react-router";
import noShop from "../../components/noshop.png";
function NoShop() {
  const { shop } = useParams() as IParams;
  return (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-lg text-center p-4">
        <img src={noShop} alt="shop not found" />
        <p className="text-lg text-blue-800 font-semibold">
          We couldn't find a shop with a slug "{shop}"
        </p>
      </div>
    </div>
  );
}

export default NoShop;
