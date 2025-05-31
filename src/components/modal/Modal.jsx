import { AiFillCloseCircle } from "react-icons/ai";
import { useRef } from "react";
const Modal = ({ onClose }) => {
  const modelRef = useRef();
  //   const closeModal = (e) => {
  //     if (modelRef.current === e.target) {
  //       onClose();
  //     }
  //   };
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center justify-center mb-8 z-50">
      <div className="fixed  inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-6">
        <div className="bg-teal-900 p-6 rounded-xl text-gray-400 max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <button className="float-end" onClick={onClose}>
            <AiFillCloseCircle size={28} />
          </button>
          <h1 className="text-center font-bold text-2xl">Updata Your Task</h1>
          <form>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                name="status"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Work In Process">Work In Process</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="comments"
                rows="4"
                placeholder="Task Description"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
