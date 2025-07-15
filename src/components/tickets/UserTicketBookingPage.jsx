import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";

const UserTicketBookingPage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isOpen, setIsOpen] = useState(false);



    const getAllMovies = async () => {
        try {

            const response = await axios.get(`http://localhost:8000/api/v1/movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setMovies(response.data.movies); // ✅ Set the movies array in state
            } else {
                toast.error("Failed to fetch movies");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            toast.error("Server Error");
        }
    };

    useEffect(() => {
        getAllMovies();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setSelectedTime(movie.show_times[0]);
        setSelectedCategory("silver");
        setQuantity(1);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const handleBooking = () => {
        if (!selectedCategory || !selectedTime) {
            toast.error("Please select time and category");
            return;
        }
        toast.success("Booking Confirmed!");
        closeModal();
    };

    const getTotal = () => {
        return (
            selectedMovie?.ticket_price[selectedCategory.toLowerCase()] * quantity
        );
    };

    return (
        <div className="min-h-screen bg-[0000] backdrop-blur p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Book Your Tickets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {movies.map((movie) => (
                    <div
                        key={movie._id}
                        className="bg-[0000] backdrop-blur rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer"
                        onClick={() => openModal(movie)}
                    >
                        <img
                            src={movie.image_url}
                            alt={movie.movie_name}
                            className="w-full h-60 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-semibold mt-2">{movie.movie_name}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {movie.star_cast.join(", ")}
                        </p>



                    </div>
                ))}
            </div>

            {/* Modal */}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">

                    <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
                        <Dialog.Title className="text-2xl font-bold mb-4">
                            {selectedMovie?.movie_name}
                        </Dialog.Title>
                        {/* <p className="mb-2 text-gray-700">
                            <strong>Star Cast:</strong> {selectedMovie?.star_cast.join(", ")}
                        </p> */}


                        {/* Show Times */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Select Show Time</label>
                            <div className="flex gap-2 flex-wrap">
                                {selectedMovie?.show_times.map((time, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-3 py-1 rounded-full text-sm border ${selectedTime === time
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ticket Category */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Select Category</label>
                            <div className="flex gap-2">
                                {["silver", "gold", "platinum"].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 rounded-full text-sm border ${selectedCategory === cat
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)} - ₹
                                        {selectedMovie?.ticket_price[cat]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-semibold">Quantity:</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-2 py-1 bg-gray-300 rounded"
                                >
                                    <FaMinus />
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 rounded"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Total: ₹{getTotal() || 0}
                            </h3>
                            <div className="bg-amber-100 space-x-1">


                                <button
                                    onClick={handleBooking}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Book Now
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default UserTicketBookingPage;
