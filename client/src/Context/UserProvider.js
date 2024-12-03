import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
    if (!user) {
      // navigate("/");
    }
  }, [navigate]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () =>{
  return useContext(UserContext);
};

export default UserProvider;