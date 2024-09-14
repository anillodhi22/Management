import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { getUser } from "../redux/userSlice";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/users/login`, { email, password }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res.data.data.loggedInUser)
            dispatch(getUser(res?.data?.data?.loggedInUser));
            if (res?.data?.success) {
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }

    }

    return (
        <div className="w-full flex items-center justify-center h-screen bg-slate-100">
            <div className="w-[27vw]  h-[65vh] bg-red-300">

                <div className="text-center pt-3 mb-9">
                    <h1 className="text-2xl font-semibold">Login Page</h1>
                </div>

                <div>
                    <form onSubmit={submitHandler} className="flex items-center justify-between flex-col gap-6">
                        <input value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-80 outline-none h-14 rounded-lg pl-2" type="email" placeholder="Email" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-80 outline-none h-14 rounded-lg pl-2" type="password" placeholder="Password" />
                        <button className="w-80 h-14 rounded-lg bg-black text-white">Login</button>
                        <Link to="/register">

                            <button className="w-80 h-14 rounded-lg bg-green-500 text-white">Register</button>

                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login