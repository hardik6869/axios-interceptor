import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProtectedData } from "../actions/protectedDataActions";
import Logout from "./Logout";
import "./Protected.css";

const Protected = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.protectedData);

  useEffect(() => {
    dispatch(fetchProtectedData());
  }, [dispatch]);

  if (error) {
    return navigate("/");
  }

  return (
    <div className="container">
      {data ? (
        <div>
          <h1 className="title">Welcome, {data.username}!</h1>
          <p className="content">
            {data.message} & protected page. Only authenticated users can access
            it
          </p>

          <Logout />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Protected;
