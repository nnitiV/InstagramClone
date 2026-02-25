import { Story } from "@/types/feed";
import Link from "next/link";

type StoryItemProps = {
    story: Story;
}

export default function StoryItem({story}: StoryItemProps) {
    return (
        <Link    key={story.id} href={`/stories/${story.username}/${story.id}`} className="text-decoration-none text-body">
            <div
                className="d-flex flex-column align-items-center px-2 cursor-pointer"
                style={{ minWidth: "85px" }}
            >
                <div className="p-1 rounded-circle border border-2 border-danger position-relative">
                    <img
                        src={story.profilePictureUrl == null ? "https://cdn-icons-png.flaticon.com/512/6522/6522516.png" : story.profilePictureUrl}
                        alt="Story"
                        className="rounded-circle"
                        style={{ width: "62px", height: "62px", objectFit: "cover", border: "2px solid white" }}
                    />
                </div>
                <p className="text-truncate small mt-1 mb-0 text-center" style={{ maxWidth: "70px", fontSize: "11px" }}>
                    {story.username}
                    {/* {storyIndex} */}
                </p>
            </div>
        </Link>
    )
}
