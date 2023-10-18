import {useState,useEffect} from 'react';
import axios from 'axios';

function ProductComponent(){
    const [products,setProducts]=useState([]);
    useEffect(async ()=>{
        const response=await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    },[])
    return (
        <>
        <div className="container mt-4">
            <div className="card-">
                <div className="card-header">
                    <h1>Urun Listesi</h1>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Urun Adi</th>
                                    <th>Kategori Adi</th>
                                    <th>Adet</th>
                                    <th>Fiyati</th>
                                    <th>Islemler</th>
                                </tr>
                            </thead>
                            <tbody>
                               {products.map((product,index)=>{
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.categoryName}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button className='btn btn-outline-danger btn-sm'>Sil</button>
                                    </td>

                                </tr>
                               })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ProductComponent;