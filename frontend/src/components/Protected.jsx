import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProtectedData } from "../actions/protectedDataActions";
import Logout from "./Logout";

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
    <div>
      {data ? (
        <div>
          <h1>Protected Data</h1>

          <h1>Welcome, {data.username}!</h1>
          <p>{data.data}</p>

          <Logout />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Protected;
