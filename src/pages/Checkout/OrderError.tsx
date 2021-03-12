import { useDispatch } from "react-redux";
import { init } from "../../toolkit/slice/order";
import { AiOutlineReload } from "react-icons/ai";

export default function OrderError() {
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen flex justify-center flex-col gap-10 items-center">
      <p className="p-4 bg-red-50 text-red-900 rounded-md">
        An error occurred!
      </p>

      <button
        className="btn bg-green-50 text-green-900"
        onClick={() => dispatch(init())}
      >
        <AiOutlineReload /> Try Again
      </button>
    </div>
  );
}
