import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({id, title}) {

    const {data : RelatedVideos , isLoading, isError } = useGetRelatedVideosQuery({id, title})

    let content = null

    if (isLoading) {
        content =
        <>
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
        </>
    }

    if(isError && !isLoading) content = <Error />
    
        if(!isLoading && !isError && RelatedVideos.length === 0) content =  <Error message = 'No videos Found' />

        if(!isLoading && !isError && RelatedVideos?.length > 0) {
            content = RelatedVideos?.map(video => <RelatedVideo key={video?.id} video={video} />)
        }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
