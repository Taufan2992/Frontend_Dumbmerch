import React, { useState, useEffect } from "react";
import Navbaruser from "../../components/Navbaruser";
import {useNavigate} from 'react-router-dom';
import { API } from "../../config/api";
import Rupiah from "rupiah-format";

function Homepage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  //   GET PRODUCTS
  const getProducts = async () => {
    const response = await API.get('/products')
    console.log(response);
    setProducts(response.data.data)
}

useEffect(() => {
    getProducts()
},[])

const ProductDetail = (id) => {
  navigate('/detailproduct/' + id)
} 

  return (
    <div className="">
      <Navbaruser />

      <div className="bg-black" style={{ height: "900px" }}>
        <div className="container pt-5 pb-4">
          <div className="text-danger ms-4 mb-3">
            <h4>Products</h4>
          </div>
          <div className="row ms-4">
          {products?.map((item, index) => (
            <div
              to=""
              className="text-decoration-none card text-white bg-black container col-md-2 m-2 p-0"
              onClick={() => {
                ProductDetail(item.id)
            }}
            >
              <img
                src={
                  item?.image
                }
                className="card-img-top"
                height="210px"
                width="210px"
                alt=""
              />
              <div className="card-body bg-secondary bg-opacity-25">
                <h5 className="card-title text-danger">{item?.name}</h5>
                <p className="card-text">{Rupiah.convert(item?.price)}</p>
                <p className="card-text">Stock: {item?.qty}</p>
              </div>
            </div>
          ))}

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
