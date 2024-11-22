import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);


  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 border-2 border-green-600 bg-white text-green-600 max-w-md shadow-lg rounded-lg transition-all duration-300 ease-in-out transform scale-100 hover:scale-105"
      : "fixed top-4 right-4 z-50 p-4 border-2 border-red-600 bg-white text-red-600 max-w-md shadow-lg rounded-lg transition-all duration-300 ease-in-out transform scale-100 hover:scale-105";

  return (
    <div className={styles}>
      <div className="flex items-center justify-between">
        <span className="text-base md:text-md text-center">{message}</span>
        <button 
          className="ml-4 text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200" 
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
