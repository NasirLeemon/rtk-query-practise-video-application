import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";

export default function Form({video}) {

    const navigate = useNavigate()
    const {id, title: initialTitle, link: initialLink, date: initialDate, duration: initialDuration, author: initialAuthor, views: initialViews, description: initialDescription, thumbnail: initialThumbnail } = video || {}

    const [editVideo, {isError,isSuccess, isLoading, error, }] = useEditVideoMutation()

    const [title, setTitle] = useState(initialTitle);
    const [link, setLink] = useState(initialLink);
    const [date, setDate] = useState(initialDate);
    const [duration, setDuration] = useState(initialDuration);
    const [author, setAuthor] = useState(initialAuthor);
    const [views, setViews] = useState(initialViews);
    const [description, setDescription] = useState(initialDescription);
    const [thumbnail, setThumbnail] = useState(initialThumbnail);

   
    const handleEditVideo =(e)=>{
        e.preventDefault()

        editVideo({
            id,
            data : {
            title,
            author,
            link,
            date,
            duration,
            thumbnail,
            views,
            description }
        })
       
    }

    isSuccess && navigate('/')


    return (
        <form action="#" method="POST" onSubmit={handleEditVideo} >
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                            title="Video Title" />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput 
                            value={author}
                            onChange={(e)=> setAuthor(e.target.value)}
                             title="Author" />
                        </div>

                        <div className="col-span-6">
                            <TextArea
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                             title="Description" />
                        </div>

                        <div className="col-span-6">
                            <TextInput 
                            value={link}
                            onChange={(e)=> setLink(e.target.value)}
                             title="YouTube Video link" />
                        </div>

                        <div className="col-span-6">
                            <TextInput 
                            value={thumbnail}
                            onChange={(e)=> setThumbnail(e.target.value)}
                            title="Thumbnail link" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput 
                            value={date}
                            onChange={(e)=> setDate(e.target.value)}
                            title="Upload Date" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput 
                            value={duration}
                            onChange={(e)=> setDuration(e.target.value)}
                            title="Video Duration" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput 
                            value={views}
                            onChange={(e)=> setViews(e.target.value)}title="Video no of views" />

                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                    disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                {isSuccess &&   <Success message="Video was edited successfully" />}
             {!isSuccess && isError &&  <Error message={error} />}
            </div>
        </form>
    );
}
