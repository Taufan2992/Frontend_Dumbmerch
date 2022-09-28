import React, {useState, useEffect} from "react";
import Navbaradmin from "../../components/Navbaradmin";
import {useNavigate} from 'react-router-dom';
import Modaldelete from "../../components/Modaldelete";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Rupiah from "rupiah-format";

function Product() {
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

const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);
const handleDelete = (id) => {
  setIdDelete(id);
};

const deleteById = useMutation(async (id) => {
  try {
    await API.delete(`/product/${id}`);
    const response = await API.get("/products");
    setProducts(response.data.data);
    
  } catch (error) {
    console.log(error);
  }
});

useEffect(() => {
  if (confirmDelete) {
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
  }

  },[confirmDelete])

  const AddProduct = () => {
    navigate('/addproduct')
}

const editProduct = (id) => {
  navigate('/editproduct/' + id)
} 


  return (
    <div>
      <Navbaradmin />
      <Modaldelete 
      setConfirmDelete={setConfirmDelete}
      />

      <div className="bg-black" style={{height:"900px"}}>
        <div className="container text-light">
          <div className="pt-5">
            <h5>List Product</h5>
          </div>
          <div className="py-3 text-end pe-5">
            <button className="py-1 px-4 bg-success text-light rounded" onClick={() => AddProduct()}>
              Add
            </button>
          </div>
          <table className="row table table-striped">
            <thead className="col-12">
              <tr className={"row bg-secondary opacity-75 text-light"}>
                <th className="col-sm-1 ">
                  No.
                </th>
                <th className="col-sm-2 ">
                  Photo
                </th>
                <th className="col-sm-2 ">
                  Product Name
                </th>
                <th className="col-sm-2 ">
                  Product Desc
                </th>
                <th className="col-sm-1 ">
                  Price
                </th>
                <th className="col-sm-1 ">
                  Qyt
                </th>
                <th className="col-sm-3 ">
                  Action
                </th>
              </tr>
            </thead>
            {products?.map((item, index) => (
            <tbody key={index}>
              <tr className="row bg-dark text-light">
                <th
                  className="col-sm-1 text-white" style={{paddingTop:42}}
                >
                  {index+1}
                </th>
                <td className="col-sm-2 py-3 text-white">
                  <img
                    src={
                      item?.image
                    }
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </td>
                <td className="col-sm-2 text-white" style={{paddingTop:42}}>
                  {item?.name}
                </td>
                <td className="col-sm-2 text-white" style={{paddingTop:42}}>
                  {item?.desc}
                </td>
                <td className="col-sm-1 text-white" style={{paddingTop:42}}>
                  {Rupiah.convert(item?.price)}
                </td>
                <td className="col-sm-1 text-white" style={{paddingTop:42}}>{item?.qty}</td>
                <td className="col-sm-3">
                  <button className={"btn btn-success me-2 mt-4 px-4"} onClick={() => {
                      editProduct(item.id)
                  }}>Edit</button>
                  <button
                    className={"btn btn-danger mt-4"}
                    data-bs-target="#Modaldelete" 
                    data-bs-toggle="modal"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
