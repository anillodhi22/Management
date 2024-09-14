import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:8000/api/v1/users/register`, { name, email, password }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error('This is an error when register user');
            console.log(error)
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="w-full flex items-center justify-center h-screen bg-slate-100">
            <div className="w-[27vw] h-[77vh] bg-red-300">

                <div className="text-center pt-3 mb-9">
                    <h1 className="text-2xl font-semibold">Register Page</h1>
                </div>

                <div>
                    <form onSubmit={submitHandler} className="flex items-center justify-between flex-col gap-6">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-80 outline-none h-14 rounded-lg pl-2" type="email" placeholder="Email" />
                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-80 outline-none h-14 rounded-lg pl-2" type="text" placeholder="Name" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-80 outline-none h-14 rounded-lg pl-2" type="password" placeholder="Password" />
                        <button className="w-80 h-14 rounded-lg bg-black text-white">
                            {loading ? "Loading..."

                                : "Register"}
                        </button>
                        <Link to="/login">

                            <button className="w-80 h-14 rounded-lg bg-blue-800 text-white">Login</button>

                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register