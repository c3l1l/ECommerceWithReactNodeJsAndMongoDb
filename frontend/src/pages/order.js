import { useEffect, useState } from "react";
import axios from "axios";

function OrderComponent(){
    const [orders,setOrders]=useState([]);

    const getAll=async ()=>{
        let user=JSON.parse(localStorage.getItem("user"));
        let model={userId:user._id};
        let response=await axios.post("http://localhost:5000/orders",model);
        setOrders(response.data);

    }
    useEffect(()=>{
        getAll();
    },[])
    return (
        <>
        <div className="container mt-4">
            <div className="card ">
            <div className="card-header">
                <h2 className="text-center">Siparis Listesi</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Urun Adi</th>
                            <th>Adet</th>
                            <th>Birim Fiyati</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order,index)=>(
                            <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{order.products[0].name}</td>
                                    <td>1</td>
                                    <td>{order.products[0].price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    )
}
export default OrderComponent;