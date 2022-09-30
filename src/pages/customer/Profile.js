import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/logo.png"
import blank from "../../assets/blank-profile.png"
import Navbaruser from "../../components/Navbaruser";
import { API } from "../../config/api";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../../context/user-context"
import Moment from "moment";
import Rupiah from "rupiah-format";

function Profile() {
  const navigate = useNavigate()
  const [state, _] = useContext(UserContext);
  const ID = state.user.id;
  const [profile, setProfile] = useState([])
  const [transaction, setTransaction] = useState([])

  //   GET PRODUCTS
  const getProfile = async () => {
    const response = await API.get('/user/' + ID)
    console.log(response);
    setProfile(response.data.data)
}

  // GET TRANSACTIONS
  const getTransaction = async () => {
    const response = await API.get("/transactions")
    console.log(response.data.data);
    setTransaction(response.data.data)
}

useEffect(() => {
    getProfile()
    getTransaction()
},[])

const editProfile = (id) => {
  navigate('/editprofile/' + id)
} 

  return (
<div>
  <Navbaruser/>

  <div class="row bg-black m-0 pb-5 px-5" style={{height: 'auto', width: 'auto'}}>
        <div class="col-md-6 mb-3" >
            <div class="ms-5 my-5 text-danger">
                <h3>My Profile</h3>
            </div>
            <div class="row ">
              <div class="col-6 ">
                <img src={profile?.image || blank} class={"d-block mx-lg-auto ps-4"} width="300px" height="400px" alt="..." style={{objectFit:"cover"}}/>
                <button class="btn btn-success mt-5 ms-5" onClick={() => {
                editProfile(profile?.id);
              }}> Edit Prodile</button>
              </div>
              <div class="col-6 d-flex justify-content-center pe-5">
                <div class="">
                  <div> 
                    <h6 class="text-danger fw-bold lh-1">Name</h6>
                    <p class="text-light">{profile?.name}</p> 
                  </div>
                  <div>
                    <h6 class="text-danger fw-bold">Email</h6>
                    <p class="text-light">{profile?.email}</p>
                  </div>
                  <div>
                    <h6 class="text-danger fw-bold">Phone Number</h6>
                    <p class="text-light">{profile?.phone}</p>
                  </div>
                  <div>
                    <h6 class="text-danger fw-bold">Gender</h6>
                    <p class="text-light">{profile?.gender}</p>
                  </div>
                  <div >
                    <h6 class="text-danger fw-bold">Address</h6>
                    <p class="text-light">{profile?.address}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-6 mb-3 p-0">
            <div class="ms-5 my-5 text-danger">
                <h3>My Transaction</h3>
            </div>

            {transaction?.map((item, index) => (
            <div class="row bg-secondary bg-opacity-25 pb-2 mx-4">
              <div class="col-4">
                <img src={item?.product?.image} alt="img" class="d-flex mx-lg-auto ps-3 align-items-center mt-2" height="140px" />
              </div>
              <div class="col-5">
                <div class="card-body">
                  <div className="card-title text-danger fs-6 mt-2 fw-bold"> {item?.product?.name} </div>
                  <h6 class="card-text mt-1 text-danger" >{Moment(item?.createdAt).format("MMM Do YY")}</h6>
                  {/* {dateFormat(item.createdAt, 'dddd, d mmmm yyyy')} */}
                  
                  <p class="mt-4 text-light">Price: {Rupiah.convert(item?.price)}</p>
                </div>
              </div>
              <div class="col-2 mt-3">
                <img src={logo} height="90px" width="100px" alt=""/>
              </div>
            </div>
            ))}



        </div>
    </div>

</div>

    
  );
}

export default Profile;
