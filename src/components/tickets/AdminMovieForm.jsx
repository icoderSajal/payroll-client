import { useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";


const AdminMovieForm = () => {
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState({
        movie_name: "",
        image_url: "",
        star_cast: "",
        ticket_price: { silver: "", gold: "", platinum: "" },
        show_times: []
    });
    const navigate = useNavigate()


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                `http://localhost:8000/api/v1/movies/add`,
                movie,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );


            if (response.data.success) {
                toast.success("Movie added successfully");
                navigate("/admin-dashboard");

                // ✅ Reset all fields
                setMovie({
                    movie_name: "",
                    image_url: "",
                    star_cast: "",
                    ticket_price: { silver: "", gold: "", platinum: "" },
                    show_times: []
                });
            } else {
                toast.error("Error adding movie");
            }

        } catch (error) {
            console.error(error);
            toast.error("Server Error");
        }
    };



    return (
        <div className="max-w-4xl mx-auto mt-10 bg-[#000000000] backdrop-blur p-8 rounded-md shadow-xl">
            <h2 className="text-4xl font-bold text-center text-teal-100 mb-8">
                Add Movie Ticket
            </h2>

            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Movie Name
                        </label>

                        <input type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Movie Name" onChange={e => setMovie({ ...movie, movie_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input type="text" placeholder="Image URL" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={e => setMovie({ ...movie, image_url: e.target.value })} />
                    </div>
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Star Casts
                        </label>

                        <textarea
                            type="text" placeholder="Star Cast (comma separated)" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={e => setMovie({ ...movie, star_cast: e.target.value.split(",") })}></textarea>

                    </div>
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Show Times
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 10:00 AM, 1:30 PM, 6:00 PM"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            onChange={(e) =>
                                setMovie({
                                    ...movie,
                                    show_times: e.target.value
                                        .split(",")
                                        .map((time) => time.trim())
                                        .filter((time) => time),
                                })
                            }
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Silver Price                    </label>
                        <input type="number" placeholder="Silver Price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={e => setMovie({ ...movie, ticket_price: { ...movie.ticket_price, silver: e.target.value } })} />


                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gold Price
                        </label>
                        <input type="number" placeholder="Gold Price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={e => setMovie({ ...movie, ticket_price: { ...movie.ticket_price, gold: e.target.value } })} />

                        {/* voyager password- dHkUEj */}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Platinum Price
                        </label>
                        <input type="number" placeholder="Platinum Price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" onChange={e => setMovie({ ...movie, ticket_price: { ...movie.ticket_price, platinum: e.target.value } })} />

                    </div>

                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Movie</button>

            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default AdminMovieForm;
