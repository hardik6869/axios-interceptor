import React, { useEffect, useState } from "react";
import api from "../utils/axiosinterceptor";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/protected/data");
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch protected data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return navigate("/");
  }

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {data ? (
        <div>
          <h1>Protected Data</h1>
          <h2>{data.username}</h2>
          <p>{data.data}</p>

          <button onClick={handleClick}> LogOut </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Protected;
