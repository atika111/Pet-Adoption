import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import utilities from "../../utilitiesClient";

function WelcomeHeader() {

  const { isLogin, user} = useUser();

  

  return (
    <div>
      {isLogin ? (
        <>
          <h1>Hello {user?.firstName}</h1>
        </>
      ) : (
        <>
          <h1>Welcome to our Pet Adoption Platform</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero nam,
            maiores iste illo quos praesentium beatae repudiandae temporibus
            veritatis, quo ipsam incidunt atque voluptate impedit eveniet
            similique ducimus a nemo!
          </p>
        </>
      )}
    </div>
  );
}

export default WelcomeHeader;
