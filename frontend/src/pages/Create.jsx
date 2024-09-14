import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getRefresh } from "../redux/eventSlice";

const Create = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [venue, setVenue] = useState();
    const [organizer, setOrganizer] = useState();
    const [remindersSent, setRemindersSent] = useState(false);

    const dispatch = useDispatch();

    console.log(title, description, date, venue, organizer, remindersSent);

    const submitHandler = async () => {

        try {
            const res = await axios.post(`http://localhost:8000/api/v1/users/create-event`, { title, description, date, venue, organizer, remindersSent }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(res)
            dispatch(getRefresh());
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
        // setTitle("");
        // setDescription("");
        // setDate("")
        // setVenue("")
        // setOrganizer("")
        // setRemindersSent("")

    }



    return (
        <div className="w-full flex items-center justify-center h-[91vh] bg-[#DFD7CB]">

            <div className="w-[50vw] gap-5 h-[60vh] rounded-md bg-white">
                <h1 className="text-center text-3xl font-semibold mt-2 mb-8">Create Event</h1>
                <form onSubmit={submitHandler} className="flex flex-wrap gap-4 pl-8">
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="text" placeholder="Title" />
                    <input value={description} onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="text" placeholder="Description" />
                    <input value={date} onChange={(e) => setDate(e.target.value)}
                        className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="date" placeholder="Date" />
                    <input value={venue} onChange={(e) => setVenue(e.target.value)}
                        className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="text" placeholder="Venue" />
                    <input value={organizer} onChange={(e) => setOrganizer(e.target.value)}
                        className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="text" placeholder="Organizer" />

                    {/* <input className="bg-gray-200 w-80 rounded-md pl-3 outline-none h-14" type="text" placeholder="Attendees" /> */}

                    <select value={remindersSent} onChange={(e) => setRemindersSent(e.target.value)}
                        className="w-[43vw] rounded-md outline-none h-14 bg-gray-200 " name="remidersent" >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <button className="w-[43vw] bg-black text-white h-12 rounded-md">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create