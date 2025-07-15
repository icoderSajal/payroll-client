// import { useState } from "react";
// import MovieCard from "../cards/MovieCard";


// const TicketBookingModal = ({ movie, onClose, onBook }) => {
//     const [selectedTime, setSelectedTime] = useState("");
//     const [selectedSeat, setSelectedSeat] = useState("");

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">


//             <div className="bg-white p-6 rounded w-full max-w-lg">
//                 {/* <h2 className="text-xl font-bold mb-4">Book Ticket: {movie.movie_name}</h2> */}
//                 <h2 className="text-xl font-bold mb-4">Book Ticket: Lulli</h2>


//                 <select className="input w-full" onChange={(e) => setSelectedTime(e.target.value)}>
//                     <option>Select Show Time</option>
//                     {movie.show_times.map((time) => (
//                         <option key={time}>{time}</option>
//                     ))}
//                 </select>

//                 <input
//                     type="text"
//                     placeholder="Enter Seat Number (e.g., A1)"
//                     className="input mt-3 w-full"
//                     onChange={(e) => setSelectedSeat(e.target.value)}
//                 />

//                 <div className="flex justify-end mt-4">
//                     <button onClick={onClose} className="mr-2 px-4 py-2 border rounded">Cancel</button>
//                     <button onClick={() => onBook(selectedTime, selectedSeat)} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm</button>
//                 </div>
//                 <MovieCard />
//             </div>

//         </div>
//     );
// };

// export default TicketBookingModal;


import React from 'react'

const TicketBookingModal = () => {
    return (
        <div>
            TicketBooking Modal
        </div>
    )
}

export default TicketBookingModal
