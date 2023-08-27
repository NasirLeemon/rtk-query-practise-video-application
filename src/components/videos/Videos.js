import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import VideoLoader from '../ui/loaders/VideoLoader'
import Error from "../ui/Error";
import { useEffect, useState } from "react";

export default function Videos() {
    const [request, setRequest] = useState(false)

    const { isError, isLoading, data: videos } = useGetVideosQuery(undefined, {
        skip : !request,
    })

useEffect(()=>{
    setRequest(true)
},[])
    let content = null


    if (isLoading) {
        content =
        <>
            <VideoLoader />
            <VideoLoader />
            <VideoLoader />
            <VideoLoader />
        </>
    }

    if(isError && !isLoading) content = <Error />
    
        if(!isLoading && !isError && videos?.length === 0) content =  <Error message = 'No videos Found' />

        if(!isLoading && !isError && videos?.length > 0) {
            content = videos?.map(video => <Video key={video?.id} video={video} />)
        }
    return (
        <>
            {content}

        </>
    );
}
