import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function RegisterComponent(){
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const register=async (e)=>{
        e.preventDefault();
        let model={email:email,name:name,password:password};
        console.log(model);
        try {
            const response=await axios.post("http://localhost:5000/auth/register",model);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/");
           console.log(response);
        } catch (error) {
console.error(error);
        }
    }
    return (
        <>
         <div className="d-flex justify-content-center" style={{marginTop:"50px"}}>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h3>Kayit Sayfasi</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={register}>
                                <div className="form-group">
                                    <label htmlFor="name">Kullanici Adi</label>
                                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name" name="name" className="form-control" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Adresi</label>
                                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name="email" className="form-control" />

                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Sifre</label>
                                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name="password" className="form-control" />
                                </div>
                                <div className="form-group mt-2">
                                    <button className="btn btn-outline-success w-100">Kayit Ol</button>
                                    <Link to="/login" className="mt-2" style={{float:"right"}}>Giris Sayfasi</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisterComponent;