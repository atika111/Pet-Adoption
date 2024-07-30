import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { PiListFill } from "react-icons/pi";
import styles from "../../utility.module.css";
import "../Navbar/navbar.css";
import { useUser } from "../../context/UserContext";
import Login from "../Auth/Login";
import Modal from "../UtilitiesComponent/Modal";
import ToggleLoginSignupContent from "../Auth/ToggleLoginSignupContent";
import { logout } from "../../api/user";
import Cookies from "js-cookie";
import { useModal } from "../../context/ModalContext";
import MenuItem from "./MenuItem";

function Navbar() {
  const [isActive, setIsActive] = useState({
    image: false,
    menu: false,
  });

  const { isLogin, setIsLogin, user } = useUser();
  const { isOpen, openModal, closeModal, modalContent } = useModal();

  const toggleIsActive = (id) => {
    setIsActive((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const removeActive = (id) => {
    setIsActive((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleLogoutUser = async () => {
    try {
      await logout();
      Cookies.remove("token");
      Cookies.remove("usersPets");
      Cookies.remove("users");
      Cookies.remove("user");
      setIsLogin(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleOpenAccountModal = () => {
    openModal(<ToggleLoginSignupContent />);
  };

  return (
    <div>
      <header className="header">
        <nav>
          {/* MENU START*/}
          <div
            id="menu"
            onClick={() => toggleIsActive("menu")}
            className={`header__icon-list ${
              isActive.menu ? styles.active : ""
            }`}
          >
            <PiListFill />
          </div>

          <div className={`Header__menu ${isActive.menu ? styles.active : ""}`}>
            <ul className={`${styles.menuModal} ${styles.navbar__links}`}>
              <MenuItem id="menu" onClick={removeActive} to="/">
                Home
              </MenuItem>
              <MenuItem id="menu" onClick={removeActive} to="/search">
                Search
              </MenuItem>
              {isLogin && (
                <>
                  {user?.isAdmin && (
                    <>
                    {/* ADMIN MENU START*/}
                      <MenuItem
                        id="menu"
                        onClick={removeActive}
                        to="/dashboard"
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem id="menu" onClick={removeActive} to="/addPet">
                        Add pet
                      </MenuItem>
                    </>
                  )}
                  <MenuItem id="menu" onClick={removeActive} to="/myPets">
                    My pets
                  </MenuItem>
                  
                    {/* ADMIN MENU END*/}

                </>
              )}
            </ul>
          </div>
        </nav>
        {/* USER IMAGE MENU START */}
        {isLogin ? (
          <>
            <div
              id="image"
              className={`header__user-image ${
                isActive.image ? styles.active : ""
              }`}
              src=""
              alt=""
              onClick={() => toggleIsActive("image")}
            >
              <img src={user?.picture} alt="User" />
            </div>

            <ul
              className={`${styles.menuModal} ${styles.navbar__links} ${
                isActive.image ? styles.active : ""
              } user-image-modal`}
            >
              <MenuItem id="image" onClick={removeActive} to="/profile">
                Profile
              </MenuItem>
              <MenuItem
                id="image"
                onClick={() => {
                  removeActive("image");
                  handleLogoutUser();
                }}
                to="/"
              >
                Logout
              </MenuItem>
            </ul>
          </>
        ) : (
          <button onClick={handleOpenAccountModal}>Login</button>
        )}
        {isOpen && (
          <Modal
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
            modalContent={modalContent}
          />
        )}
        {/* USER IMAGE MENU END */}

      </header>
      <Outlet />
    </div>
  );
}

export default Navbar;
