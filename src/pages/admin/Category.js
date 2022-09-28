import React, {useState, useEffect} from "react";
import Navbaradmin from "../../components/Navbaradmin";
import {useNavigate} from 'react-router-dom';
import Modaldelete from "../../components/Modaldelete";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Category() {
  const navigate = useNavigate()

  const [category, setCategory] = useState([])

  //   GET PRODUCTS
  const getCategory = async () => {
    const response = await API.get('/categories')
    console.log(response.data.data.categories);
    setCategory(response.data.data.categories)
}

useEffect(() => {
  getCategory()
},[])

const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);
const handleDelete = (id) => {
  setIdDelete(id);
};

const deleteById = useMutation(async (id) => {
  try {
    await API.delete(`/category/${id}`);
    const response = await API.get("/categories");
    setCategory(response.data.data.categories);
    
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

  const AddCategory = () => {
    navigate('/addcategory')
} 

  const EditCategry = (id) => {
      navigate('/editcategory/' + id)
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
            <button className="py-1 px-4 bg-success text-light rounded" onClick={() => AddCategory()}>
              Add
            </button>
          </div>
          <table className="row table table-striped">
          <thead className="col-12">
        <tr className={"row bg-secondary opacity-75 text-white"}>
          <th scope="col" className="col-sm-4 ">No.</th>
          <th scope="col" className="col-sm-4 ">Category Name</th>
          <th scope="col" className="col-sm-4 ">Action</th>
        </tr>
      </thead>
      {category?.map((item, index) => (
            <tbody key={index}>
              <tr className="row bg-dark text-light">
                <th
                  className="col-sm-4 text-white mt-1"
                >
                  {index+1}
                </th>
                <td className="col-sm-4 text-white mt-1">
                  {item?.name}
                </td>
                <td className="col-sm-4">
                  <button className={"btn btn-success me-2 px-4"} onClick={() => {
                      EditCategry(item?.id)
                  }}>Edit</button>
                  <button
                    className={"btn btn-danger"}
                    data-bs-target="#Modaldelete" 
                    data-bs-toggle="modal"
                    onClick={() => {
                      handleDelete(item?.id);
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

export default Category;
