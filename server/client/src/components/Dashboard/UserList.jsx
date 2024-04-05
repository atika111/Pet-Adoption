import React, { useState } from "react";
import "./dashboard.css";
import UserModal from "./userModal";
import { deleteUser } from "../../api/user";
import { useUser } from "../../context/UserContext";

function UserList({ users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { fetchUsersData } = useUser();

  const handleUserModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const data = await deleteUser(userId);
      fetchUsersData();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      <h2>UserList</h2>

      <div className="dashboard__user-list__card">
        <ul>
          {users &&
            users.map((user) => (
              <li key={user._id}>
                <div onClick={() => handleUserModal(user._id)}>
                  <img src={user.picture} alt="userImg" />
                  <h3>{user.firstName}</h3>
                  <p>{user.roles}</p>
                </div>
                {!user.isAdmin && (
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
      {isModalOpen && (
        <UserModal
          users={{ ...{ userId, users } }}
          userModal={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default UserList;
