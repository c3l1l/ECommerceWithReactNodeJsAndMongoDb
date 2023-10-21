import { useEffect, useState } from "react";
import axios from 'axios';

function BasketComponent() {
    const [baskets, setBaskets] = useState([]);
    const [total, setTotal] = useState(0);

    const getAll = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let model = { userId: user._id };
        let response = await axios.post("http://localhost:5000/baskets/getAll", model);
        console.log(response.data);
        setBaskets(response.data);
        let totalX = 0;
        for (let i = 0; i < baskets.length; i++) {
            totalX += baskets[i].products[0].price;

        }
        setTotal(totalX);
    }
    const remove=async(_id)=>{
        let confirm=window.confirm("Urunu sepetten kaldirmak istediginizden emin misiniz?");
       if(confirm){
        let model={_id:_id};
        await axios.post("http://localhost:5000/baskets/remove", model);
        getAll();
       }
    }

    const addOrder=async()=>{
        let user=JSON.parse(localStorage.getItem("user"));
        let model={userId:user._id};
        await axios.post("http://localhost:5000/orders/add",model);
        getAll();
    }

    useEffect(() => {
        //debugger
        getAll();

    })
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Sepetteki Urunler</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Urun Adi</th>
                                            <th>Urun Resmi</th>
                                            <th>Urun Adedi</th>
                                            <th>Urun Fiyati</th>
                                            <th>Islemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            baskets.map((basket, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{basket.products[0].name}</td>
                                                    <td>
                                                        <img src={"http://localhost:5000/" + basket.products[0].imageUrl} width="75" />
                                                    </td>
                                                    <td>1</td>
                                                    <td>{basket.products[0].price}</td>
                                                    <td>
                                                        <button onClick={()=>remove(basket._id)} className="btn btn-outline-danger btn-sm">Sil</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text-center">Sepet Toplami</h4>
                                <hr />
                                <h5 className=" text-center">Toplam Urun Sayisi: {baskets.length}</h5>
                                <h6 className="alert alert-danger text-center">Toplam Tutar:{total}</h6>
                                <hr />
                                <button onClick={addOrder} className="btn btn-outline-danger w-100">Odeme Yap</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BasketComponent;