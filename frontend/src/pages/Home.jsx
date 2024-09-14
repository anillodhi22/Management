import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from "react-router-dom";


const Home = () => {

  const [allData, setAllData] = useState();

  const user = useSelector((state) => state.user.user)
  console.log(user)

  useEffect(() => {

    const allevent = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/users/')
        console.log(res.data.data)
        setAllData(res?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }

    allevent();
  }, [])

  // console.log("allData", allData)

  return (
    <div className="w-full ">

      <div className="ml-[10vw] p-5 mt-3 flex flex-wrap gap-7">



        {allData && allData.map((item, index) => (
          <div key={index} className="w-[36vw] p-2 rounded-md h-[30vh] bg-violet-400">
            <Link to={`/singlePage/${item._id}`}>

              <h1 className="text-3xl text-center font-semibold mt-2">{item.title}</h1>
            </Link>

            <p className="mt-2 font-semibold">{item.description}</p>
            <p className="mt-2 font-semibold">{item.organizer}</p>

            <div className="flex items-center justify-between">
              <p className="font-semibold">{item.venue}</p>
              <p className="font-semibold">
                {item.date ? format(new Date(item.date), 'MMM dd, yyyy') : 'Date not available'}
              </p>
              {/* <p>{item.date}</p> */}
            </div>
          </div>
        ))}
      </div>







    </div>
  )
}

export default Home