import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js"

import { useAuth } from "../../context/AuthContext";

const OrderSummaryPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [cart, setCart] = useState(state?.cart || {});
    const cartItems = Object.values(cart);

    const updateQuantity = (itemId, change) => {
        setCart(prev => {
            const updated = { ...prev };
            if (updated[itemId]) {
                updated[itemId].quantity += change;
                if (updated[itemId].quantity <= 0) {
                    delete updated[itemId];
                    toast("Item removed");
                }
            }
            return updated;
        });
    };

    const removeItem = (itemId) => {
        setCart(prev => {
            const updated = { ...prev };
            delete updated[itemId];
            return updated;
        });
        toast.success("Item removed from cart");
    };
    const stripePromise = loadStripe("pk_test_YourPublicKeyHere");

    const handlePayment1 = async () => {
        try {
            alert(JSON.stringify(cartItems))
            const stripe = await stripePromise;

            const response = await axios.post(
                "http://localhost:8000/api/v1/payment/create-checkout-session",
                { cartItems, userId: user?._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const session = response.data.session;

            // Redirect to Stripe checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                toast.error(result.error.message);
            }
        } catch (err) {
            alert(err)
            console.error("Payment error:", err);
            toast.error("Payment failed");
        }
    };

    const handlePayment = async () => {
        try {
            // Build the payload
            const payload = {
                user_id: user._id,
                items: cartItems,
                total_amount: grandTotal,
                payment_id: "COD_" + Date.now(), // For demo purpose, generate a dummy ID
            };

            const res = await axios.post(
                "http://localhost:8000/api/v1/orders/add",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Order placed successfully!");
            setCart({});
            localStorage.removeItem("cart");
            navigate("/voyager-dashboard/success");
            navigate("/voyager-dashboard/success", {
                state: {
                    order: res.data.order,
                },
            });

        } catch (err) {
            console.error(err);
            toast.error("Failed to save order");
        }
    };

    const grandTotal = cartItems.reduce((total, item) => {
        return total + item.item_price * item.quantity;
    }, 0);

    return (
        <div className="p-6 text-white min-h-screen bg-[0000] backdrop-blur">
            <h1 className="text-4xl font-bold mb-6 text-center text-teal-300">Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-lg">
                    Your cart is empty.{" "}
                    <span className="underline text-blue-400 cursor-pointer" onClick={() => navigate("/")}>
                        Go Shopping
                    </span>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 bg-white/10 backdrop-blur rounded p-4 shadow">
                        <h2 className="text-2xl mb-4 font-semibold text-teal-200">Order Items</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center bg-white/5 p-3 rounded">
                                    <div>
                                        <h3 className="text-lg font-bold">{item.item_name}</h3>
                                        <p className="text-sm text-gray-800">Price: ₹{item.item_price}</p>
                                        <p className="text-sm text-gray-800">Total: ₹{item.item_price * item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className=" bg-fuchsia-700 hover:bg-gray-600 p-2 rounded text-sm"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="bg-teal-400 hover:bg-gray-600 p-2 rounded text-sm"
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="bg-red-600 hover:bg-red-700 p-2 rounded text-sm ml-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary & Payment */}
                    <div className="bg-[0000] backdrop-blur rounded p-4 shadow">
                        <h2 className="text-2xl mb-4 font-semibold text-teal-200">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Total Items</span>
                            <span className="text-white">{cartItems.length}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-300">Grand Total</span>
                            <span className="text-white font-bold">₹{grandTotal}</span>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummaryPage;
