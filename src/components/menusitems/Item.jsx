import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import animation tools
import { Edit2, Trash2Icon } from "lucide-react"

const Item = () => {
    const [menus, setMenus] = useState([]);
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        menu_id: "",
        menu_name: "",
        item_name: "",
        item_price: "",
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchMenus = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/v1/menu", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                setMenus(res.data.menus);
            }
        } catch (error) {
            toast.error("Failed to load menus");
        }
    };

    const fetchItems = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/items", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setItems(res.data.items);
            }
        } catch (error) {
            toast.error("Failed to fetch items");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openModal = (item = null) => {
        if (item) {
            setForm({
                menu_id: item.menu_id,
                menu_name: item.menu_name,
                item_name: item.item_name,
                item_price: item.item_price,
            });
            setEditId(item._id);
        } else {
            setForm({ menu_id: "", menu_name: "", item_name: "", item_price: "" });
            setEditId(null);
        }
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const selectedMenu = menus.find(menu => menu._id === form.menu_id);
            if (!selectedMenu) {
                toast.error("Please select a valid menu");
                return;
            }

            const payload = {
                ...form,
                menu_name: selectedMenu.fooodmenu_name,
            };

            if (editId) {
                await axios.put(`http://localhost:8000/api/v1/items/${editId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                toast.success("Item updated!");
            } else {
                await axios.post("http://localhost:8000/api/v1/items/add", payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                toast.success("Item added!");
            }

            setModalOpen(false);
            fetchItems();
        } catch (err) {
            toast.error("Error saving item");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this item?")) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/items/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                fetchItems();
                toast.success("Deleted successfully");
            } catch (err) {
                toast.error("Failed to delete item");
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-4xl text-teal-100 font-bold">Item Master</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                >
                    + Add Item
                </button>
            </div>

            <table className="min-w-full backdrop-blur-sm p-6">
                <thead>
                    <tr className="bg-[0000] backdrop-blur-sm text-left p-6">
                        <th className="p-2">Menu</th>
                        <th className="p-2">Item Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id} className="border-t">
                            <td className="p-2">{item.menu_name}</td>
                            <td className="p-2">{item.item_name}</td>
                            <td className="p-2">{item.item_price}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => openModal(item)} className="bg-green-600 hover:bg-green-800 text-white px-4 py-1.5 rounded"
                                ><Edit2 /></button>
                                <button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-800 text-white px-4 py-1.5 rounded"
                                ><Trash2Icon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ Modal with Framer Motion Animation */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[0000] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[000000] backdrop-blur-2xl p-6 rounded w-full max-w-md shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Item" : "Add Item"}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Menu</label>
                                    <select
                                        name="menu_id"
                                        value={form.menu_id}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    >
                                        <option value="">Select Menu</option>
                                        {menus.map((menu) => (
                                            <option key={menu._id} value={menu._id}>
                                                {menu.fooodmenu_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Item Name</label>
                                    <input
                                        name="item_name"
                                        value={form.item_name}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Price</label>
                                    <input
                                        name="item_price"
                                        value={form.item_price}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        {editId ? "Update" : "Save"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Item;
