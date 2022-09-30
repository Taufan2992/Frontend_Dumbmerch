import React, { useState, useEffect } from "react";
import blank from "../../assets/blank-profile.png";
import Navbaruser from "../../components/Navbaruser";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";

function Editprofile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    image: "",
  });

const { data: profileData } = useQuery("userCache", async () => {
  const response = await API.get("/user/" + id);
  console.log('====================================');
  console.log(response);
  console.log('====================================');
  return response.data.data;
});

useEffect(() => {
  if (profileData) {
    setPreview(profileData?.image);
    setProfile({
      ...profile,
      name: profileData?.name,
      email: profileData?.email,
      address: profileData?.address,
      phone: profileData?.phone,
      gender: profileData?.gender,
    });
  }
}, [profileData]);
console.log(profile);
console.log(preview);



  const handleOnChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  console.log(preview);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const data = new FormData();
      if (profile?.image) {
        data.set("image", profile?.image[0], profile?.image[0]?.name);
      }
      data.set("name", profile?.name);
      data.set("email", profile?.email);
      data.set("address", profile?.address);
      data.set("phone", profile?.phone);
      data.set("gender", profile?.gender);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.patch(`/user/${id}`, data, config);
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbaruser />
      <div className="row p-5 bg-black">
        <div className="col-6 pe-4">
          <form className="m-0 px-5" onSubmit={(e) => handleSubmit.mutate(e)}>
            <h4
              className="text-start pt-5 pb-5 fw-bold text-white"
            //   style={{ color: "#613D2B" }}
            >
              Edit Profile
            </h4>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
                className="form-control text-white border-form bg-dark"
                value={profile?.name}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
                className="form-control text-white border-form bg-dark"
                value={profile?.email}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                onChange={handleOnChange}
                className="form-control text-white border-form bg-dark"
                value={profile?.gender}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleOnChange}
                className="form-control text-white border-form bg-dark"
                value={profile?.address}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                onChange={handleOnChange}
                className="form-control text-white border-form bg-dark"
                value={profile?.phone}
              />
            </div>

            <div class="mb-4">
              <input
                class="form-control text-white border-rounded inputfile icon bg-dark"
                type="file"
                name="image"
                onChange={handleOnChange}
                placeholder="Photo Product"
                // value={product?.image}
              />
            </div>

            <div className="text-center">
              <button
                className="btn text-white fw-bold my-5 bg-danger"
                type="submit"
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="col-6 ps-4">
          <div className="ms-3 mt-3 mb-5">
            <img
              style={{ width: 436, height: 555 }}
              src={preview || blank}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Editprofile;
