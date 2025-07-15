import React from "react";
import { format } from "date-fns";

const OrderTable = ({ orders }) => {
    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <table className="min-w-full text-sm bg-white border border-gray-200 shadow rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 border">#</th>
                        <th className="text-left px-4 py-2 border">User Name</th>
                        <th className="text-left px-4 py-2 border">Email</th>
                        <th className="text-left px-4 py-2 border">Items</th>
                        <th className="text-left px-4 py-2 border">Total</th>
                        <th className="text-left px-4 py-2 border">Status</th>
                        <th className="text-left px-4 py-2 border">Payment ID</th>
                        <th className="text-left px-4 py-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.order_id} className="border-t">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{order.user_name}</td>
                            <td className="px-4 py-2">{order.user_email}</td>
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
        </div>
    );
};

export default OrderTable;
