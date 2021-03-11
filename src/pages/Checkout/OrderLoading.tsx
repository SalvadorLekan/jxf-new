import { FaSpinner } from "react-icons/fa";

function OrderLoading() {
  return (
    <div className="p-4 flex-col flex justify-center items-center h-screen w-screen">
      <FaSpinner className="text-5xl animate-spin text-green-500" />
    </div>
  );
}

export default OrderLoading;
