import { IoClose } from "react-icons/io5";

export default function ConfirmationModal({ 
  title = "Confirm Action", 
  message = "Are you sure?", 
  onConfirm, 
  onCancel 
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative text-center">
        
        {/* Cross Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <IoClose size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
