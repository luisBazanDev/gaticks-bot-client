import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate()
  const context = useContext(AppContext);

  useEffect(() => {
    if (context.isAuthenticate) return navigate("/");
  });

  const validateCredentials = async () => {
    const apiResponse = await context.sendGet(`${context.apiUrl}/validate`);
    if (apiResponse.data.isValid) {
      context.setAuthenticate(true);
      navigate('/')
    } else {
      alert("No valid credentials");
    }
  };

  return (
    <div className="container">
      <div className="row col-8">
        <h1 className="text-center">Login</h1>
        <div className="card">
          <div className="card-body">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              className="form-control"
              onChange={(e) => context.setUsername(e.target.value)}
            ></input>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              className="form-control"
              onChange={(e) => context.setPassword(e.target.value)}
            ></input>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={validateCredentials}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
