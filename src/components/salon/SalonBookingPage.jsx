import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SalonBookingPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        service: "",
        date: "",
        time: "",
        notes: "",
    });

    const salonServices = [
        "Haircut",
        "Facial",
        "Manicure",
        "Pedicure",
        "Massage Therapy",
        "Hair Coloring",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.service || !formData.date || !formData.time) {
            toast.error("Please fill all required fields");
            return;
        }

        // Mock submit - integrate with backend API
        console.log("Salon Booking:", formData);
        toast.success("Salon appointment booked!");
        navigate("/voyager/dashboard"); // Adjust based on your route
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                    Book a Salon Appointment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Service Select */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Select Service<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Choose a service --</option>
                            {salonServices.map((service, idx) => (
                                <option key={idx} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Time Picker */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Time<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Notes (optional) */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Notes (optional)
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                            placeholder="Any special request?"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SalonBookingPage;
