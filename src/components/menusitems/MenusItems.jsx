



import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const MenusItems = () => {

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [menu, setMenu] = useState({
        menu_name: "",
        item_name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menu.menu_name || !menu.item_name || !menu.description) {
            toast.error("All fields are required");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (editId) {
                const res = await axios.put(
                    `http://localhost:8000/api/v1/item/${editId}`,
                    menu,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    toast.success("Menu updated successfully");
                    fetchData();
                }
            } else {
                const res = await axios.post(
                    `http://localhost:8000/api/v1/item/add`,
                    menu,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (res.data.success) {
                    toast.success("Menu added successfully");
                    fetchData();
                }
            }

            closeModal();
        } catch (error) {
            const errMsg =
                error.response?.data?.message || "Action failed. Try again.";
            toast.error(errMsg);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(
                `http://localhost:8000/api/v1/item/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success) {
                toast.success("Menu deleted");
                fetchData();
            }
        } catch (error) {
            toast.error("Failed to delete menu");
        }
    };

    const openModal = (menu = null) => {
        if (menu) {
            setMenu({
                menu_name: menu.menu_name,

                item_name: menu.item_name,
                description: menu.description,
            });
            setEditId(menu._id);
        } else {
            setMenu({ item_name: "", description: "" });
            setEditId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setMenu({ item_name: "", description: "" });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/item", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setItems(response.data.items);
            }
        } catch (error) {
            toast.error("Failed to fetch menus");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* Add Button */}
            <div className="flex justify-end mx-20 mt-10 mb-6">
                <button
                    onClick={() => openModal()}
                    className="bg-teal-600 font-semibold text-white py-2.5 px-6 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
                >
                    + Add Item
                </button>
            </div>

            {/* Table */}
            {/* <div className="flex justify-center px-4 ">
                <div className="w-full max-w-5xl">
                    {items.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-700  rounded-xl overflow-hidden shadow-md">
                            <thead className="text-xs uppercase bg-gray-100 text-gray-800">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Item Name</th>
                                    <th className="px-6 py-4">Menus Name</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-all`}
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{item.item_name}</td>
                                        <td className="px-6 py-4">{item.menu_id}</td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4 text-center space-x-3">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="bg-green-600 hover:bg-green-800 text-white px-4 py-1.5 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-600 hover:bg-red-800 text-white px-4 py-1.5 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-600 mt-6">
                            No menus available.
                        </div>
                    )}
                </div>
            </div> */}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000000] backdrop-blur bg-opacity-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg"
                        >
                            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                                {editId ? "Edit Menu" : "Add Menu"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Menu Item
                                        </label>

                                        <select
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                            name="department"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Menus</option>
                                            {menus.map((menu) => (
                                                <option key={menu._id} value={menu._id}>
                                                    {menu.fooodmenu_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fooodmenu_name"
                                        value={menu.fooodmenu_name}
                                        onChange={handleChange}
                                        placeholder="e.g., Breakfast"
                                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={menu.description}
                                        onChange={handleChange}
                                        placeholder="Short description..."
                                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button
                                        type="submit"
                                        className="bg-teal-600 text-white font-semibold px-4 py-2 rounded hover:bg-teal-800 w-full"
                                    >
                                        {editId ? "Update" : "Add"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-500 w-full"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MenusItems;
