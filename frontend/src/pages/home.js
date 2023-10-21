import { useEffect, useState } from "react";
import axios from 'axios';
function HomeComponent(){
    const [products,setProducts]=useState([]);
    const getAll=async ()=>{
        var response=await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }
    useEffect(()=>{
        getAll();
    },[]);
    const addBasket=async (productId)=>{
        let user=JSON.parse(localStorage.getItem("user"));
        let model={
            productId:productId,userId:user._id
        }
        var response=await axios.post("http://localhost:5000/baskets/add",model);
        alert(response.data.message);
        getAll();
    }

    return (
        <>
        <div className="container">
            <div className="row">
                {
                    products.map((product,index)=>(
                        <div key={index} className="col-md-3">
                            <div className="card">
                                <div className="card-header">
                                    <h3>{product.name}</h3>
                                </div>
                                <div className="card-body" style={{}}>
                                <img style={{width:"200px", height:"180px", margin:"auto", display:"block"}} src={"http://localhost:5000/"+product.imageUrl} />
                                <h4 style={{border:"1px solid #ccc", padding:"10px"}} className=" text-center mt-1">Adet:{product.stock}</h4>
                                <h4 style={{border:"1px solid #ccc", padding:"10px"}} className=" text-danger text-center mt-1">Price:{product.price}</h4>
                                {
                                    product.stock > 0 ?
                                <button className="btn btn-outline-success w-100" onClick={()=>{addBasket(product._id)}}>Sepete Ekle</button>
                                :
                                <button className="btn btn-danger w-100" >Urun Stokta Yok !</button>
                                }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}
export default HomeComponent;