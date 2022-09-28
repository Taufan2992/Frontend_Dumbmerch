import React, { useState, useEffect } from "react";
import Navbaradmin from "../../components/Navbaradmin";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Addproduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  });

  //   GET CATEGORIES
  const [category, setCategory] = useState([])
  const getCategory = async () => {
    const response = await API.get('/categories')
    console.log(response);
    setCategory(response.data.data.categories)
}
useEffect(() => {
  getCategory()
},[])

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", product.image[0], product.image[0].name);
      formData.set("name", product.name);
      formData.set("price", product.price);
      formData.set("qty", product.qty);
      formData.set("desc", product.desc);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Navbaradmin />

      <div className="bg-black">
        <div className="container">
          <form className="m-0" onSubmit={(e) => handleSubmit.mutate(e)}>
            <h5 className="text-start pb-4 pt-5 text-white">Add Product</h5>

            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "250px",
                    maxHeight: "250px",
                    objectFit: "cover",
                    marginBottom: 20,
                  }}
                  alt="preview"
                />
              </div>
            )}

            <input
              type="file"
              id="upload"
              name="image"
              onChange={handleChange}
              hidden
            />
            <label
              for="upload"
              className="label-file-add-product text-white mb-3 border border-danger rounded px-2 py-1 bg-danger"
            >
              Upload file
            </label>

            <div className="input-group mb-3">
              <input
                name="name"
                type="text"
                placeholder="Nama Product"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <textarea
                name="desc"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                placeholder="Description"
                id=""
                rows="5"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="input-group mb-3">
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <input
                name="qty"
                type="number"
                placeholder="Stock"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                onChange={handleChange}
              />
            </div>

            <div className="card-form-input pb-2 border-form">
              {/* <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
                Category
              </div> */}
              <select class="form-select bg-dark text-white">
                <option selected>Category</option>
                {category?.map((option) => (
                <option value={option?.name}>{option?.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              variant="success"
              className="btn bg-success text-white fw-bold container mt-3 mb-5"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
