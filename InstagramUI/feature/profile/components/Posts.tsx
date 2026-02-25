import { Dispatch, SetStateAction } from 'react';
import { USER_PROFILE_MOCK } from '../constants/data'
import { Post } from '@/types/feed';

type PostsProps = {
    setSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

export default function Posts({setSelectedPost}: PostsProps) {
    return (
        <div className="user-posts my-5 pb-3 w-75 mx-auto row row-cols-3 gap-3">
            {USER_PROFILE_MOCK.posts.map((post, _) => (
                <div onClick={() => setSelectedPost(post)} className="bg-secondary transparent-background-hover-2 p-0 m-0" style={{ width: "250px", height: "350px" }}>
                    {post.contentUrls[0].includes("mp4") ?
                        <video className="w-100 h-100" loop muted src={`${post.contentUrls[0]}#t=0`}></video>
                        :
                        <img className="w-100 h-100" src={post.contentUrls[0]} alt="" />
                    }
                </div>
            ))}
        </div>
    )
}
