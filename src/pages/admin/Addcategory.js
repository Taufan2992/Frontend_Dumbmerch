import React, { useState } from "react";
import Navbaradmin from "../../components/Navbaradmin";
import {useNavigate} from 'react-router-dom';
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Addcategory() {
  const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
      });

      const handleChange = (e) => {
        setCategory({
          ...category,
          [e.target.name]: e.target.value,
      });
      };

      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const body = JSON.stringify(category);
    
          // Insert product data
          const response = await API.post("/category", body, config);
          console.log(response);
          navigate("/category");
        } catch (error) {
          console.log(error);
        }
      });
  return (
    <div>
      <Navbaradmin />

      <div className="bg-black" style={{ height: "600px" }}>
        <div className="container">
          <h3 className="text-start text-white py-5">Add Category</h3>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                placeholder="category"
                name="name"
                onChange={handleChange}
              />
            </div>
            <button
              className="btn bg-success text-white fw-bold container mt-3 mb-5"
              type="submit"
              variant="success"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addcategory;
