import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginComponent(){

    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const login=async (e)=>{
        e.preventDefault();
        try {
            let model={email:email,password:password};
            console.log(`Model : ${model.email} ${model.password}`);
let response=await axios.post("http://localhost:5000/auth/login",model);
localStorage.setItem("token",response.data.token);
localStorage.setItem("user",JSON.stringify(response.data.user));
navigate("/");
console.log("After navigate");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center" style={{marginTop:"50px"}}>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h3>Giris Sayfasi</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label htmlFor="email">Mail Adresi</label>
                                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name="email" className="form-control" />

                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Sifre</label>
                                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name="password" className="form-control" />
                                </div>
                                <div className="form-group mt-2">
                                    <button className="btn btn-outline-primary w-100">Giris Yap</button>
                                    <Link to="/register" className="mt-2" style={{float:"right"}}>Kayit Ol</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginComponent;