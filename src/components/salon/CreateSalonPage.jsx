import React, { useState } from "react";
import toast from "react-hot-toast";
import salonBg from "../../assets/spa.webp";

const CreateSalonPage = () => {
    const [formData, setFormData] = useState({
        salon_name: "",
        services: [],
        opening_time: "",
        closing_time: "",
        specialist_haircut: "",
        specialist_manicure: "",
    });

    const serviceOptions = [
        "Haircut",
        "Facial",
        "Manicure",
        "Pedicure",
        "Massage Therapy",
        "Hair Coloring",
    ];

    const handleCheckboxChange = (service) => {
        setFormData((prev) => {
            const isChecked = prev.services.includes(service);
            const updatedServices = isChecked
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service];
            return { ...prev, services: updatedServices };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { salon_name, services, opening_time, closing_time } = formData;

        if (!salon_name || services.length === 0 || !opening_time || !closing_time) {
            toast.error("Please fill all required fields.");
            return;
        }

        // Replace this with backend API call
        console.log("Submitted Data:", formData);
        toast.success("Salon created successfully!");
        // Reset form (optional)
    };

    return (
        <div className="min-h-screen bg-[0000] backdrop-blur flex items-center justify-center px-4 py-8 rounded-2xl" >
            <div className="bg-[0000] backdrop-blur p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center text-pink-100 mb-6">
                    Create New Salon
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Salon Name */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Salon Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="salon_name"
                            value={formData.salon_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Services Selection */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Services Offered<span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {serviceOptions.map((service) => (
                                <label key={service} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.services.includes(service)}
                                        onChange={() => handleCheckboxChange(service)}
                                    />
                                    <span>{service}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Opening Time */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label className="block font-medium text-gray-700 mb-1">
                                Opening Time<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="opening_time"
                                value={formData.opening_time}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Closing Time */}
                        <div className="w-full">
                            <label className="block font-medium text-gray-700 mb-1">
                                Closing Time<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="closing_time"
                                value={formData.closing_time}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Haircut Specialist */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Haircut Specialist Name
                        </label>
                        <input
                            type="text"
                            name="specialist_haircut"
                            value={formData.specialist_haircut}
                            onChange={handleChange}
                            placeholder="e.g. Alex Johnson"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Manicure Specialist */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Manicure Specialist Name
                        </label>
                        <input
                            type="text"
                            name="specialist_manicure"
                            value={formData.specialist_manicure}
                            onChange={handleChange}
                            placeholder="e.g. Emily Clark"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-pink-600 hover:bg-fuchsia-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Create Salon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSalonPage;
