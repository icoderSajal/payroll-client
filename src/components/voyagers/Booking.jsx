import React from 'react'
import SummaryCards from "../dashboard/SummaryCards";
import { FaUsers, FaBuilding } from "react-icons/fa"
const Booking = () => {
    return (
        <>
            <div className="mt-20">
                <h3 className="text-4xl font-bold text-center text-teal-100 mb-8">
                    Booking Overview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SummaryCards
                        icons={<FaUsers />}
                        text="Book Resort-Movie tickets"
                        number={10}
                        color="bg-gradient-to-tr from-blue-200 to-blue-700"
                    />
                    <SummaryCards
                        icons={<FaBuilding />}
                        text="Book Beauty Salon"
                        number={10}
                        color="bg-gradient-to-tr from-fuchsia-200 to-fuchsia-800"

                    />

                    <SummaryCards
                        icons={<FaBuilding />}
                        text="Book Fitness Center Salon"
                        number={10}
                        color="bg-gradient-to-tr from-teal-200 to-teal-600"
                    />
                    <SummaryCards
                        icons={<FaBuilding />}
                        text="Book Party Hall"
                        number={10}
                        color="bg-gradient-to-tr from-amber-200 to-amber-800"
                    />

                </div>


            </div>


        </>
    )
}

export default Booking
