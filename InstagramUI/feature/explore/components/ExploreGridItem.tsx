import { BASE_URL } from "@/constants";
import { Post } from "@/types/feed";

type ExploreGridItemProps = {
    post: Post;
    setPostForModal: (id: number) => void;
}

export default function ExploreGridItem({ post, setPostForModal }: ExploreGridItemProps) {
    const isVideo = post.contentUrls[0].includes(".mp4");
    
    const mediaClasses = "object-fit-cover w-100 h-100 rounded cursor-pointer transparent-background-hover-2";
    return (<div className="ratio ratio-1x1 mb-1">
        {isVideo ? (
            <video
                onClick={() => setPostForModal(post.id)}
                className={mediaClasses}
                src={`${post.contentUrls[0] ? BASE_URL + post.contentUrls[0] : ""}`}
                preload="metadata"
                muted
                playsInline
            />
        ) : (
            <img
                onClick={() => setPostForModal(post.id)}
                className={mediaClasses}
                src={post.contentUrls[0] ? BASE_URL + post.contentUrls[0] : ""}
                alt="Explore"
            />
        )}
    </div>)
}
