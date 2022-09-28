import React, {useState, useEffect} from "react";
import Navbaruser from "../../components/Navbaruser";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import Rupiah from "rupiah-format";
import { useMutation } from "react-query";

function Detailproduct() {
    // GET PRODUCT
    const [gettingProduct, setGettingProduct] = useState({});
    const navigate = useNavigate()
    let { id } = useParams();
    console.log(id);
    const getDetailProduct = async () => {
    const response = await API.get(`/product/${id}`);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
      setGettingProduct(response.data.data.products);
    };

      // FETCH
  useEffect(() => {
    getDetailProduct();
  }, []);

useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = "SB-Mid-client-dvSylGTkNfM9YPtd";

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);

const handleBuy = useMutation(async (e) => {
  try {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Get data from product
    const data = {
      idProduct: gettingProduct.id,
      idSeller: gettingProduct.user.id,
      price: gettingProduct.price,
    };

    console.log(data);

    // Data body
    const body = JSON.stringify(data);

    // Insert transaction data
    const response = await API.post("/transaction", body, config);
    console.log(response);
    const token = response.data.payment.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.log(error);
  }
});


  return (
<div>
<Navbaruser/>

<div className="row flex-lg-row align-items-center g-5 px-5 bg-black text-light" style={{height: 'auto'}}>
    <div className="col-10 col-sm-8 col-lg-6 ps-5">
        <img src={gettingProduct?.image} className="d-block mx-lg-auto" style={{objectFit: 'contain'}} width="400" height="400" />
    </div>
    
    <div className="col-lg-6 p-5">
        <h3 className="display-6 fw-bold lh-1 mb-3 text-danger">{gettingProduct?.name}</h3>
        
        <div>
            <p>Stock: {gettingProduct?.qty}</p>
        </div>
        <div className="my-5">  
            <p className="lead">{gettingProduct?.desc}</p>
        </div>
        
        <div className="text-end text-danger fw-bold fs-3 my-4">
            <p>{Rupiah.convert(gettingProduct?.price)}</p>
        </div>
        
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
          <button type="submit" className="btn btn-danger form-control btn-lg me-md-2" onClick={(e) => handleBuy.mutate(e)}>Buy</button>
        </div>
      </div>



</div>
</div>


  );
}

export default Detailproduct;
