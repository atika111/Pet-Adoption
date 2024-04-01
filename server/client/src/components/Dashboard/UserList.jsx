import React, { useState } from "react";
import './dashboard.css'
import UserModal from "./userModal";

function UserList({users}) {
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [userId, setUserId] = useState('')


      const handleUserModal = (userId) => {
        setUserId(userId)        
        setIsModalOpen(true)
      }

  return (
    <div>
       <h2>UserList</h2>
      
      <div className="dashboard__user-list__card">
        <ul>
          {users && users.map((user) => (
            <li key={user._id} onClick={() => handleUserModal(user._id)}>
              <img src={user.picture} alt="userImg" />
              <h3>{user.firstName}</h3>
            <p>{user.roles}</p>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <UserModal users={{...{userId, users}}} userModal={setIsModalOpen} />
      )}
    </div>
  );
}

export default UserList;
