import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../actions/protectedDataActions";
import "./UsersList.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.protectedData);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-list-container">
      <h1 className="title">Users List</h1>
      <table className="users-list">
        <tr className="user-item">
          <th>
            <strong>User Name</strong>
          </th>
          <th>
            <strong>Created At </strong>
          </th>
        </tr>
        {users?.map((user) => (
          <tr key={user._id} className="user-item">
            <td>{user.username}</td>
            <td>
              <p>{new Date(user.createdAt).toLocaleString()}</p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UsersList;
