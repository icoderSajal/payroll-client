import React from 'react'
import { Ticket, TicketIcon, TicketCheckIcon, TicketPercentIcon } from "lucide-react"
import SummaryCards from '../dashboard/SummaryCards'
import { NavLink, useNavigate } from 'react-router-dom'


const BookingList = () => {

    return (
        <div>
            <div className="p-4 md:p-6 lg:p-8 w-full">
                <div className="mt-16">
                    <h3 className="text-4xl font-bold text-center text-teal-100 mb-8">
                        Here your all Booking
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <NavLink to="/voyager-dashboard/booking/movie-tickets">
                            <SummaryCards
                                icons={<Ticket />}
                                text="Resort-Movie tickets"
                                color="bg-gradient-to-tr from-blue-100 to-blue-700"
                            />
                        </NavLink>

                        <SummaryCards
                            icons={<TicketIcon />}
                            text="Beauty-Salon & Spa"
                            color=" bg-gradient-to-tr from-fuchsia-50 to-pink-800"
                        />
                        <SummaryCards
                            icons={<TicketPercentIcon />}
                            text="BooK Fitness center"
                            color="bg-gradient-to-tr from-yellow-100 to-green-800"
                        />
                        <SummaryCards
                            icons={<TicketCheckIcon />}
                            text="Book Party Hall"
                            color="bg-gradient-to-tr from-amber-500 to-red-900"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingList
