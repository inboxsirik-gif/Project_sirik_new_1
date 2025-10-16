import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AlertModal = ({  onClose }) => {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-sm text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🛒 Notice</h3>
        <p className="text-gray-700 mb-6">Your cart is empty! Go to the shop to explore.</p>
        <button
          onClick={()=>{      navigate("/shop");onClose()}}
          className="px-6 py-2 bg-[#FE5E33] cursor-pointer hover:bg-opacity-90 text-white font-bold rounded-lg transition"
        >
          Got It
        </button>
      </motion.div>
    </div>
  );
};

export default AlertModal;
