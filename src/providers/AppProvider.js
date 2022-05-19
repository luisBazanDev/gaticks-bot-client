import { useState } from "react";
import AppContext from "../context/AppContext";
import Axios from "axios";

function AppProvider(props) {
  const isProduction = true;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const [commands, setCommands] = useState([]);

  const sendPost = async (url, body) => {
    return await Axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
    });
  };

  const sendGet = async (url, body) => {
    return await Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
      body,
    });
  };

  const apiUrl = isProduction
    ? "https://max.bifrostnetwork.es/api"
    : "http://localhost:5461/api";

  return (
    <AppContext.Provider
      value={{
        setPassword,
        setUsername,
        apiUrl,
        isAuthenticate: authenticate,
        setAuthenticate,
        commands,
        setCommands,
        sendPost,
        sendGet,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
