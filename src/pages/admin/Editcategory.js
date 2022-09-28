import React, { useState, useEffect } from "react";
import Navbaradmin from "../../components/Navbaradmin";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";

function Editcategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  // Create Variabel for store product data here ...
  const [form, setForm] = useState({
    name: "",
  });

  const { data: categories } = useQuery("categoryCache", async () => {
    const response = await API.get("/category/" + id);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    return response.data.data.categories;
  });

  useEffect(() => {
    if (categories) {
      setForm({
        ...form,
        name: categories?.name,
      });
    }
  }, [categories]);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      console.log('====================================');
      console.log(form);
      console.log('====================================');

      // Insert product data
      const response = await API.patch(`/category/${id}`, body, config);
      console.log(response.data);
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  });

  return (
<div>
    <Navbaradmin/>

    <div className="bg-black" style={{height: '600px'}}>
    <div className="container">
      <h3 className="text-start text-white py-5">Edit Category</h3>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control bg-dark bg-opacity-90 text-white border-form" name="name" onChange={handleChange} placeholder="category"
                />
        </div>
        <button className="btn bg-success text-white fw-bold container mt-3 mb-5" type="submit" variant="success">Save</button>
      </form>
    </div>
    </div>
</div>



  );
}

export default Editcategory;
