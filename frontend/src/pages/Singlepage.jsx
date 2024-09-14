import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
const Singlepage = () => {

    const [data, setData] = useState();

    console.log("data", data)

    const { id } = useParams();

    useEffect(() => {

        const allevent = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/users/${id}`)
                console.log(res?.data?.data)
                setData(res?.data?.data)
            } catch (error) {
                console.log(error)
            }
        }

        allevent();
    }, [])
    return (
        <div className="w-full h-[91vh] bg-slate-500">
            <img className="w-[100vw] opacity-65 h-[91vh] object-cover" src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />


            <div className="w-[45vw] rounded-lg p-3 h-[45vh] flex flex-col items-center gap-4 bg-slate-50 absolute top-[26%] left-[30%]">
                <p className="text-3xl">

                    {data?.title}
                </p>
                <p className="text-3xl">

                    {data?.organizer}
                </p>
                <p className="text-3xl">

                    {data?.venue}
                </p>
                <p className="text-3xl">

                {data?.description}
                </p>
                <p className="text-3xl">

                {data?.date ? format(new Date(data.date), 'MMM dd, yyyy') : 'Date not available'}            
                </p>
                
                </div>




        </div>
    )
}

export default Singlepage