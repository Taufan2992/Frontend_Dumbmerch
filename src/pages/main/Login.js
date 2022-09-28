import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import {Link} from 'react-router-dom'
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/user-context"

function Login() {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
  const [state, dispatch] = useContext(UserContext)
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // CONFIG TYPE DATA
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // CONVERT DATA TO STRING
      const body = JSON.stringify(datas);
      console.log(datas);
      // INPUT DATA
      const response = await API.post('/login', body, config);
      const { status, name } = response.data.data.user
      console.log(response.data.data.user);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data.user
      })
      
      if(status == 'customer'){
        alert(`Welcome ${name} !`)
        navigate('/')
      } else if(status == 'admin'){ 
        alert(`Welcome ${name} !`)
        navigate('/product')
      } else {
        alert("status tidak terdaftar")
      }
    } catch (error) {
      const alert = (
        <div class="alert alert-danger mt-3 p-3" role="alert">
          {error.response.data.message}
        </div>
      )
      console.error(error);
      setMessage(alert)
    }
  })

    const handleLogin = () => {
        navigate ('/Login')
    }

  return (
    <div className="row text-white bg-black d-flex align-items-center" style={{height:900}}>
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
                    <h3 className="pt-5">Login</h3>
                    {message}
                    <div className=" mb-3">
                        <input name="email" type="email" className="form-control" placeholder="email" id="" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <input name="password" type="password" className="form-control" placeholder="Password" id="" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn form-control mb-5 bg-danger text-light" >
                        Login
                    </button>
                </form>
            </div>

            
        </div>
        <div className="col-md-1"></div>
        <div className="col-1"></div>

        <button className="ms-3 my-5 col-1 btn btn-danger" type="button" onClick={handleLogin}>Login</button>
        <Link className="ms-3 my-5 col-1 btn text-light" to="/Register">Register</Link>
        

    </div>
  );
}

export default Login;
