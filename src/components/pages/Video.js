import { useParams } from "react-router-dom";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Error from "../ui/Error";

export default function Video() {

    const { videoId } = useParams()

    const { data: video, isLoading, isError } = useGetVideoQuery(videoId)
    const {title, link} = video || {}

    let content = null

 

    if (isLoading) {
        content =
            <>
                <PlayerLoader link ={link } title={title} />
                <DescriptionLoader video={video} />
            </>
    }

    if (isError && !isLoading) content = <Error />

    if (!isLoading && !isError && !video?.id) content = <Error message='There was an Error occured' />

    if (!isLoading && !isError && video?.id) {
        content =
            <>
                <Player link={link} title={title} />
                <Description video={video}/>
            </>
    }
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>

                    {video?.id ? (<RelatedVideos id={video?.id} title={video?.title} /> ) : isLoading ? (<><RelatedVideoLoader /><RelatedVideoLoader /><RelatedVideoLoader /></> ) : ( <Error message='there was an error occured' /> )}
                </div>
            </div>
        </section>
    );
}
