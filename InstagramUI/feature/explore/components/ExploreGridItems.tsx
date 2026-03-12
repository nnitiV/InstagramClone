import { Post } from '@/types/feed';
import { MOCK_EXPLORE_POSTS } from '../constants/data';
import ExploreGridItem from './ExploreGridItem';

type ExploreGridItemsProps = {
    setPostForModal: (id: number) => void;
    posts: Post[];
}

export default function ExploreGridItems({ setPostForModal, posts }: ExploreGridItemsProps) {
    return (
        <div className="container-fluid p-1 p-md-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-lg-8">
                    <div className="row g-1">
                        {posts.map((post) => (
                            <div key={post.id} className="col-4">
                                <ExploreGridItem post={post} setPostForModal={setPostForModal} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
