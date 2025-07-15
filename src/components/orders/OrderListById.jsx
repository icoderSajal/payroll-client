import { useState, useEffect } from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns"
import { useAuth } from "../../context/AuthContext"
const OrderListById = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth()
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/orders/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            toast.error("Failed to fetch orders");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="p-5">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-center text-teal-300 mb-8">
                        Order List
                    </h3>
                </div>
            </div>
            <div className="flex justify-center px-4 ">
                <div className="w-full max-w-5xl">
                    {orders.length > 0 ? (

                        <table className="w-full text-sm text-left text-gray-700  rounded-xl overflow-hidden shadow-md">
                            <thead className="text-xs uppercase bg-gray-100 text-gray-800">

                                <tr>
                                    <th className="px-6 py-4">#</th>

                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Payment ID</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.order_id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-all`}
                                    >
                                        <td className="px-4 py-2">{index + 1}</td>

                                        <td className="px-4 py-2">
                                            <ul className="list-disc list-inside space-y-1">
                                                {order.items.map((item) => (
                                                    <li key={item._id}>
                                                        {item.item_name} x {item.quantity} (₹{item.item_price})
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-2 font-semibold">₹{order.total_amount}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${order.payment_status === "paid"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {order.payment_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{order.payment_id}</td>
                                        <td className="px-4 py-2">
                                            {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    ) : (
                        <div className="text-center text-gray-600 mt-6">
                            No orders available.
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default OrderListById
