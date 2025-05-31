import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `${Base_Url}/api/v1/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Base_Url}/api/v1/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Department Updated");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl  mx-auto mt-10 bg-amber-50 p-8 rounded-md  shadow-md w-96">
          <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
            Edit Departments
          </h3>

          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="dep_name" type="text">
                Department Name
              </label>
              <input
                placeholder="Enter Department Name"
                name="dep_name"
                className="block w-full text-sm font-medium text-gray-700 p-2 border border-gray-300  rounded-md"
                type="text"
                onChange={handleChange}
                value={department.dep_name}
              />
            </div>
            <div className="">
              <label htmlFor="description" type="text">
                Description
              </label>
              <textarea
                placeholder="Description"
                name="description"
                type="text"
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300  rounded-md"
                value={department.description}
              ></textarea>
            </div>
            <div className="flex justify-between items-center gap-2">
              <button
                type="submit"
                className="w-full mt-6 font-bold bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
              >
                Update
              </button>

              <button
                type="button"
                className="w-full mt-6 font-bold bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
                onClick={() => navigate(`/admin-dashboard/departments`)}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
