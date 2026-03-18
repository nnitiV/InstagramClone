import { Post } from '@/types/feed';
import { BASE_URL } from '@/constants';

type PostsProps = {
    posts: Post[];
    setSelectedPost: (post: Post) => void;
}

export default function Posts({posts, setSelectedPost}: PostsProps) {
    return (
        <div className="user-posts my-5 pb-3 w-75 mx-auto row row-cols-3 gap-3">
            {posts.map((post, _) => (
                <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-secondary transparent-background-hover-2 p-0 m-0" style={{ width: "250px", height: "350px" }}>
                    {posts && post.contentUrls[0] && post.contentUrls[0].includes("mp4") ?
                        <video className="w-100 h-100" loop muted src={`${BASE_URL + post.contentUrls[0]}#t=0`}></video>
                        :
                        <img className="w-100 h-100 object-fit-cover" src={BASE_URL + post.contentUrls[0]} alt="" />
                    }
                </div>
            ))}
        </div>
    )
}
