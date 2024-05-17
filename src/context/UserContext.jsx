import React from "react";
const UserContext = React.createContext({ id:"", userName: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : { id:"", userName: "", auth: false }
  );

  const login = (user) => {
    setUser({
      id:user.id,
      userName: user.username,
      auth: true,
    });
    sessionStorage.setItem("user", JSON.stringify({ id:user.id, userName: user.username, auth: true }));
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(() => ({
      id: "",
      userName: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
