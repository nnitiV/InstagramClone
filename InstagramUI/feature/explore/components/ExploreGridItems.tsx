import { Post } from '@/types/feed';
import { MOCK_EXPLORE_POSTS } from '../constants/data';
import ExploreGridItem from './ExploreGridItem';

type ExploreGridItemsProps = {
    setPostForModal: (id: number) => void;
}

export default function ExploreGridItems({ setPostForModal }: ExploreGridItemsProps) {
    return (
        <div className="mx-auto w-75 column-gap-1 p-3" style={{
            columns: "3",
        }}>
            {MOCK_EXPLORE_POSTS.map((post, _) => 
                <ExploreGridItem key={post.id} post={post} setPostForModal={setPostForModal} />
            )}
        </div>
    )
}
