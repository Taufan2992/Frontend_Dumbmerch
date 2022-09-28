import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Register() {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login");
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Data body
    const body = JSON.stringify(data);

    // Insert data user to database
    const response = await API.post("/register", body, config);
    console.log(response);

    const alert = (
        <div class="alert alert-warning mt-3 p-3" role="alert">
          Register Success, Go to Login Section!
        </div>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <div class="alert alert-danger" role="alert">
          {error.message}
        </div>
      );

      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="row text-white bg-black d-flex align-items-center">
      <div className="col-md-1"></div>
      <div className="col-md-5 text-center text-md-start">
        <div className="my-5">
          <img src={logo} alt="" />
        </div>
        <div>
          <h1>Easy, Fast and Reliable</h1>
          <p>
            Go shopping for merchandise, just go to dumb merchshopping. the
            biggest merchandise in <span className="fw-bold">Indonesa</span>
          </p>
        </div>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-4">
        <div className="container bg-secondary mx-auto my-5 rounded-3">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h3 className="pt-5">Register</h3>
            {message}
            <div className=" mt-2 mb-3">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
                id=""
                onChange={handleChange}
              />
            </div>
            <div className=" mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="email"
                id=""
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                id=""
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn form-control mb-5 bg-danger text-light"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-1"></div>
      <div className="col-1"></div>

      <button
        className="ms-3 my-5 col-1 btn btn-danger"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
      <Link className="ms-3 my-5 col-1 btn text-light" to="/Register">
        Register
      </Link>
    </div>
  );
}

export default Register;
