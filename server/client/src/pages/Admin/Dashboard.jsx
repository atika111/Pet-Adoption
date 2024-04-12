import React, { useEffect} from "react";
import UserList from "../../components/Dashboard/UserList";
import PetList from "../../components/Dashboard/PetList";
import { usePet } from "../../context/PetContext";
import { useUser } from "../../context/UserContext";

function Dashboard() {
  const { fetchPetsData, pets } = usePet();
  const { fetchUsersData, users, state} = useUser();
  useEffect(() => {
    fetchPetsData();
    fetchUsersData();
  }, []);


  return (
    <div className="dashboard">
      {state.isLoading ? (
        "Loading..."
      ) : (
        <>
          <h1>Dashboard</h1>
          <UserList users={users} />
          <PetList pets={pets} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
