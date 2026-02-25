import { Post } from "@/types/feed";

type ExploreGridItemProps = {
    post: Post;
    setPostForModal: (id: number) => void;
}

export default function ExploreGridItem({post, setPostForModal}: ExploreGridItemProps) {
    if (post.contentUrls[0].includes(".mp4")) return (
        <video key={post.id}
            onClick={() => setPostForModal(post.id)}
            className="transparent-background-hover-2 mw-100 d-block mb-1"
            src={`${post.contentUrls[0]}#t=1`}
            preload="metadata"
            muted
            playsInline
        />
    );
    return (
        <img key={post.id}
            onClick={() => setPostForModal(post.id)}
            className="transparent-background-hover-2 mw-100 d-block mb-1"
            src={post.contentUrls[0]} alt="" />
    );
}
