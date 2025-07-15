// src/components/common/UnauthorizedPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
            <div className="text-center p-8 bg-white rounded shadow-md border">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
                <p className="text-gray-700 mb-4">
                    You do not have permission to access this page.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
