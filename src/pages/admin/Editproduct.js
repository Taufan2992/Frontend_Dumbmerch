import React, { useState, useEffect } from "react";
import Navbaradmin from "../../components/Navbaradmin";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";

function Editproduct() {
  const [preview, setPreview] = useState(null); //For image preview
  const navigate = useNavigate();
  const { id } = useParams();
  // Create Variabel for store product data here ...
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  });

  const { data: productData } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    return response.data.data.products;
  });

  useEffect(() => {
    if (productData) {
      setPreview(productData?.image);
      setForm({
        ...form,
        name: productData?.name,
        qty: productData?.qty,
        price: productData?.price,
        desc: productData?.desc,
      });
    }
  }, [productData]);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
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

      // Store data with FormData as object
      const formData = new FormData();
      if (form?.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form?.name);
      formData.set("stock", form?.qty);
      formData.set("price", form?.price);
      formData.set("desc", form?.desc);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.patch(`/product/${id}`, formData, config);
      console.log(response.data);
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
            <h5 className="text-start pt-5 pb-4 text-white">Edit Product</h5>

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
                  className="mt-2 mb-4"
                />
              </div>
            )}
            <input
              type="file"
              id="upload"
              name="image"
              hidden
              onChange={handleChange}
              class="form-control bg-transparent text-white border-0"
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
                value={form?.name}
                onChange={handleChange}
                type="text"
                placeholder="Nama Product"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
              />
            </div>
            <div className="input-group mb-3">
              <textarea
                name="desc"
                value={form?.desc}
                onChange={handleChange}
                className="form-control bg-dark bg-opacity-90 text-white border-form"
                placeholder="Description"
                rows="5"
              ></textarea>
            </div>

            <div className="input-group mb-3">
              <input
                name="price"
                value={form?.price}
                onChange={handleChange}
                type="number"
                placeholder="Price"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
              />
            </div>
            <div className="input-group mb-3">
              <input
                name="qty"
                value={form?.qty}
                onChange={handleChange}
                type="number"
                placeholder="Stock"
                className="form-control bg-dark bg-opacity-90 text-white border-form"
              />
            </div>

            <div className="card-form-input mt-4 px-2 py-1 pb-2">
              <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
                Category
              </div>
              {/* {product &&
                  categories?.map((item, index) => (
                    <label key={index} className="checkbox-inline me-4">
                      <CheckBox
                        categoryId={categoryId}
                        value={item?.id}
                        handleChangeCategoryId={handleChangeCategoryId}
                      />
                      <span className="ms-2">{item?.name}</span>
                    </label>
                  ))} */}
            </div>

            <button
              type="submit"
              variant="success"
              className="btn bg-success text-white fw-bold container mt-3 mb-5"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
