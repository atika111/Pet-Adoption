import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { PiListFill } from "react-icons/pi";
import styles from "../../utility.module.css";
import "../Navbar/navbar.css";
import { useUser } from "../../context/UserContext";
import Login from "../Auth/Login";
import Modal from "../Auth/Modal";
import { logout } from "../../api/user";
import Cookies from "js-cookie";

function Navbar() {
  const [isActive, setIsActive] = useState({
    image: false,
    menu: false,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isLogin, setIsLogin, user, setIsClick,  isClick} = useUser();

  const toggleIsActive = (e) => {
    const stateObj = checkEventModal(e);
    setIsActive({ ...stateObj });
  };

  const checkEventModal = (e) => {
    const { id } = e.currentTarget;
    console.log("e.currentTarget: ", id);

    if (typeof id === "string") id.toString();
    console.log("typeof id === ", typeof id === "string");
    const stateObj = {
      image: false,
      menu: false,
    };

    switch (id) {
      case "image":
        stateObj.image = !isActive.image;
        stateObj.menu = false;
        break;
      case "menu":
        stateObj.menu = !isActive.menu;
        stateObj.image = false;
        break;

      default:
        console.log(`Error navbar modal value ${id}`);
    }

    return stateObj;
  };

  const removeActive = (e) => {
    const { id } = e.currentTarget;
    console.log("e.currentTarget: ", id);
    if (!isActive.hasOwnProperty(id)) {
      throw new Error(`Cant remove isActive ${id}`);
    }
    setIsActive((prevData) => ({
      ...prevData,
      [id]: !isActive[id],
    }));
  };

  const handleLogoutUser = async () => {
    try {
      const res = await logout();
      Cookies.remove("token")
      Cookies.remove("usersPets")
      Cookies.remove("user")
    } catch (error) {
      console.log("error: ", error);
    }
    setIsLogin(false);
  };

  const handleOpenAccountModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <header className="header">
        <nav>
          <div
            id="menu"
            onClick={(e) => toggleIsActive(e)}
            className={`header__icon-list ${
              isActive.image ? styles.active : ""
            }`}
          >
            <PiListFill />
          </div>

          <div className={`Header__menu ${isActive.menu ? styles.active : ""}`}>
            <ul className={`${styles.menuModal} ${styles.navbar__links} `}>
              <li id="menu" onClick={(e) => removeActive(e)}>
                <Link to="/">Home</Link>
              </li>
              <li id="menu" onClick={(e) => removeActive(e)}>
                <Link to="/search">Search</Link>
              </li>

              {isLogin && (
                <>
                  {user?.isAdmin && (
                    <>
                      <li id="menu" onClick={(e) => removeActive(e)}>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li id="menu" onClick={(e) => removeActive(e)}>
                        <Link to="/addPet">Add pet</Link>
                      </li>
                    </>
                  )}
                  <li id="menu" onClick={(e) => removeActive(e)}>
                    <Link to="/myPets">My pets</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {isLogin ? (
          <>
            <div
              id="image"
              className={`header__user-image 
        }`}
              src=""
              alt=""
              onClick={(e) => toggleIsActive(e)}
            >
              <img src={user?.picture} alt="User" />
            </div>

            <ul
              className={`${styles.menuModal} ${styles.navbar__links} ${
                isActive.image ? styles.active : ""
              } user-image-modal`}
            >
              <li id="image" onClick={(e) => removeActive(e)}>
                <Link to="/profile">Profile</Link>
              </li>
              <li id="image" onClick={(e) => removeActive(e)}>
                <Link onClick={handleLogoutUser} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button onClick={handleOpenAccountModal}>Login</button>
            {isOpenModal && <Modal />}
          </>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default Navbar;
