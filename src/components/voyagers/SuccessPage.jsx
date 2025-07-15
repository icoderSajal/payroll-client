// // SuccessPage.jsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const SuccessPage = () => {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const userId = searchParams.get("userId");

//     useEffect(() => {
//         const saveOrder = async () => {
//             const cart = JSON.parse(localStorage.getItem("cart")) || [];
//             const totalAmount = cart.reduce((acc, item) => acc + item.item_price * item.quantity, 0);

//             const orderItems = cart.map(item => ({
//                 item_id: item._id,
//                 item_name: item.item_name,
//                 item_price: item.item_price,
//                 quantity: item.quantity,
//             }));

//             try {
//                 const res = await axios.post("http://localhost:8000/api/v1/orders/add", {
//                     user_id: userId,
//                     items: orderItems,
//                     total_amount: totalAmount,
//                     payment_id: "dummy-stripe-id", // Optional: Save actual ID from webhook
//                 });
//                 toast.success("Order placed successfully!");
//                 localStorage.removeItem("cart");
//             } catch (err) {
//                 toast.error("Failed to save order");
//             }
//         };

//         saveOrder();
//     }, [userId]);

//     return (
//         <div className="text-center text-2xl mt-20 text-green-500">
//             Payment successful! Thank you for your order.
//         </div>
//     );
// };

// export default SuccessPage;

import React from 'react'

const SuccessPage = () => {
    return (
        <div>
            SuccessPage
        </div>
    )
}

export default SuccessPage
