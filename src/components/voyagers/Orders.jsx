import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const [menus, setMenus] = useState([]);
    const [items, setItems] = useState([]);
    const [filterMenu, setFilterMenu] = useState("");
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    const filteredItems = items.filter((item) =>
        filterMenu ? item.menu_name === filterMenu : true
    );

    useEffect(() => {
        fetchMenus();
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

    const handleAddToCart = (item) => {
        setCart((prev) => {
            const newCart = { ...prev };
            if (newCart[item._id]) {
                newCart[item._id].quantity += 1;
            } else {
                newCart[item._id] = { ...item, quantity: 1 };
            }
            return newCart;
        });
        toast.success(`${item.item_name} added to cart`);
    };

    const totalCartItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl text-teal-100 font-bold">Order Items</h1>
                <div className="relative">
                    <FaShoppingCart
                        size={40}
                        className="bg-teal-950 text-white px-2 rounded-full cursor-pointer"
                        onClick={() => navigate("/voyager-dashboard/order-summary", { state: { cart } })} // or redirect to cart page
                    />
                    {totalCartItems > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                            {totalCartItems}
                        </span>
                    )}
                </div>
            </div>

            <select
                className="mb-4 border px-3 py-2 rounded"
                onChange={(e) => setFilterMenu(e.target.value)}
            >
                <option value="">All Categories</option>
                {menus.map((menu) => (
                    <option key={menu._id} value={menu.fooodmenu_name}>
                        {menu.fooodmenu_name}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <div key={item._id} className="bg-white/10 backdrop-blur p-4 rounded shadow text-white">
                        <h2 className="text-lg font-bold">{item.item_name}</h2>
                        <p className="text-gray-300">{item.description}</p>
                        <p className="text-sm mt-1">Menu: {item.menu_name}</p>
                        <p className="text-sm mt-1">Price: ₹{item.item_price}</p>
                        <div className="mt-3 flex justify-between items-center">
                            <button
                                className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                onClick={() => handleAddToCart(item)}
                            >
                                Add
                            </button>
                            {cart[item._id] && (
                                <span className="text-xs text-green-300">
                                    Qty: {cart[item._id].quantity}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
