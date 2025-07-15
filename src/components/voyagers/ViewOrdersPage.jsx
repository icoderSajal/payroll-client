import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ViewOrdersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/orders/${user._id}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error("Failed to fetch orders");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Something went wrong");
            }
        };

        fetchOrders();
    }, [user, navigate]);

    return (
        <div className="min-h-screen p-6 bg-[0000] backdrop-blur text-white">
            <h1 className="text-3xl font-bold mb-6 text-center text-teal-400">🧾 My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-400">You have not placed any orders yet.</p>
            ) : (
                <div className="space-y-6 max-w-3xl mx-auto">
                    {orders.map((order, i) => (
                        <div key={order._id} className="bg-white/10 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-green-300 mb-2">Order #{i + 1}</h2>
                            <p className="text-sm text-gray-400 mb-4">Order Date: {new Date(order.createdAt).toLocaleString()}</p>

                            <div className="divide-y divide-white/20 space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between py-1">
                                        <span>{item.item_name}</span>
                                        <span>₹{item.item_price} × {item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-4 border-t border-white/20 pt-3">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-green-400">₹{order.total_amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10 flex justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ViewOrdersPage;
