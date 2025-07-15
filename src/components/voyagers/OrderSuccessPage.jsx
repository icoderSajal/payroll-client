import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

const OrderSuccessPage = () => {
    const { state } = useLocation(); // Receive order data from navigate
    const navigate = useNavigate();
    const { user } = useAuth()

    const order = state?.order;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[0000] backdrop-blur text-white p-6">
            <h1 className="text-4xl font-bold text-green-400 mb-4">🎉 Order Placed Successfully!</h1>
            <p className="text-lg mb-6 text-gray-300">Thank you for your purchase. Your order has been confirmed.</p>

            {order ? (
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-300">Order Summary</h2>

                    <div className="space-y-2">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-white/20 pb-2">
                                <span>{item.item_name}</span>
                                <span>₹{item.item_price} x {item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 border-t border-white/20 pt-3">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-bold text-lg text-green-300">₹{order.total_amount}</span>
                    </div>

                    <div className="mt-6 flex gap-4 justify-center">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate(`/voyager-dashboard/orders/${user._id}`)}
                            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded font-semibold"
                        >
                            View My Orders
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 mt-4">No order details found.</p>
            )}
        </div>
    );
};

export default OrderSuccessPage;
