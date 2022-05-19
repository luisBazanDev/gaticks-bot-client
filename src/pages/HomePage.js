import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import CommandsList from "../components/CommandsList";
import ClipNotify from '../components/ClipNotify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faClapperboard } from "@fortawesome/free-solid-svg-icons";
import "../css/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  useEffect(() => {
    if (!context.isAuthenticate) return navigate("/login");
  });

  const reloadCommands = () => {
    navigate("/login");
  };

  const makeClip = async () => {
    try {
      const response = await context.sendPost(context.apiUrl + "/clip");
      const clip = response.data ? response.data : {url:'', error:true};
      document.getElementById("clipNotify").appendChild = <ClipNotify clip={clip} />
    } catch (error) {
      document.getElementById("clipNotify").appendChild = <ClipNotify error={true} />
    }
  };

  return (
    <div id="home-page">
      <h1>Dashboard</h1>
      <div className="btn-group methods" role="group">
        <button className="btn btn-warning" onClick={reloadCommands}>
          <FontAwesomeIcon icon={faRefresh} />
          <span>Refresh</span>
        </button>
        <button className="btn btn-primary" onClick={makeClip}>
          <FontAwesomeIcon icon={faClapperboard} />
          <span>Clip</span>
        </button>
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faRefresh} />
          <span></span>
        </button>
      </div>
      <div id="clipNotify"></div>
      <CommandsList />
    </div>
  );
}

export default HomePage;
