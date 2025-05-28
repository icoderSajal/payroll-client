import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EmployeeTaskDetails() {
  const [singletask, setSingletask] = useState([]);
  const { id } = useParams();
  const fetchSingleTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/task/single/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSingletask(response.data.task);
      }

      console.log(setSingletask(response.data.task));
    } catch (error) {}
  };

  useEffect(() => {
    fetchSingleTask();
  }, []);
  return <div>EmployeeTaskDetails</div>;
}

export default EmployeeTaskDetails;
