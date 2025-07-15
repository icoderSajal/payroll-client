const MovieCard = ({ movie, onBook }) => {
    //const MovieCard = () => {
    return (
        <>
            <div className="shadow-md p-4 rounded bg-white">
                <img src={movie.image_url} alt={movie.movie_name} className="w-full h-48 object-cover" />
                <h2 className="font-bold text-xl mt-2">{movie.movie_name}</h2>
                <p className="text-gray-600">Star Cast: {movie.star_cast.join(", ")}</p>
                <div className="mt-2 text-sm">
                    <p>Silver: ₹{movie.ticket_price.silver}</p>
                    <p>Gold: ₹{movie.ticket_price.gold}</p>
                    <p>Platinum: ₹{movie.ticket_price.platinum}</p>
                </div>
                <button onClick={() => onBook(movie)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Book Ticket</button>
            </div>

        </>
    );
};

export default MovieCard;
