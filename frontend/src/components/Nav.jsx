import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice"
import toast from "react-hot-toast"

const Nav = () => {

    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("user", user)

       const logout = async () => {
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/users/logout`)
                dispatch(getUser(null));
                dispatch(getOtherUsers(null));
                dispatch(getMyProfile(null));
    
                navigate('/login');
                toast.success(res.data.message);


            } catch (error) {
                console.log(error)
            }
        }

    
    return (
        <div className="w-full  px-4 h-16 bg-slate-700 text-white flex items-center justify-between">
            <div className="flex text-xl gap-8">
                <Link to='/'>Home</Link>
                <Link to='/read'>Read</Link>
                <Link to='/list'>List</Link>

            </div>

            <div className="flex text-xl gap-10">
                <Link to='/create'>Create</Link>

                {user ? <Link onClick={logout}>Logout</Link> : <Link to='/login'>Login</Link>}


            </div>
        </div>
    )
}

export default Nav