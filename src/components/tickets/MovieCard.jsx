import React, { useState } from "react";

const MovieCard = ({ movie }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const getDisplayStarCast = () => {
        if (!Array.isArray(movie.star_cast)) return "N/A";
        if (isExpanded || movie.star_cast.length <= 2) {
            return movie.star_cast.join(", ");
        }
        return movie.star_cast.slice(0, 2).join(", ") + " ...";
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <img
                src={movie.image_url}
                alt={movie.movie_name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{movie.movie_name}</h2>

                <p className="text-sm text-gray-600 mb-1">
                    <strong>Star Cast:</strong>{" "}
                    <span>{getDisplayStarCast()}</span>
                    {Array.isArray(movie.star_cast) && movie.star_cast.length > 2 && (
                        <button
                            onClick={toggleExpand}
                            className="ml-1 text-blue-500 text-xs hover:underline"
                        >
                            {isExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                </p>

                <div className="text-sm mt-2">
                    <p><strong>Ticket Prices:</strong></p>
                    <ul className="list-disc ml-5">
                        <li>Silver: ₹{movie.ticket_price?.silver}</li>
                        <li>Gold: ₹{movie.ticket_price?.gold}</li>
                        <li>Platinum: ₹{movie.ticket_price?.platinum}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
