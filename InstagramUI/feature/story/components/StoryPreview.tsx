import { Story } from "@/types/feed";
import Link from "next/link";

type StoryPreviewProps = {
  story: Story | undefined;
  storyPosition: number;
}
export default function StoryPreview({ story, storyPosition }: StoryPreviewProps) {
  const getOffset = () => {
    switch (storyPosition) {
      case 1:
        return { right: 400 };
      case 2:
        return { right: 100 };
      case -1:
        return { left: 400 };
      case -2:
        return { left: 100 };
    }
  }
  const storyPositionOffset = getOffset();
  return (
    <Link href={`/stories/${story?.username}/${story?.id}`} className="card p-0 m-0 border-0 position-absolute text-decoration-none" 
      style={{
        ...storyPositionOffset,
        width: "13vw", height: "50vh", backgroundImage: `url(${story?.mediaurl != null ? story.mediaurl :'https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg'})`,
        backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
      }}>
      <div className="card-body text-white d-flex flex-column align-items-center justify-content-center" style={{ background: "rgba(25,25,25,0.5)" }}>
        <img src={story?.profilePictureUrl != null ? story?.profilePictureUrl : "https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg"} alt="Profile picture"
          className="rounded-circle border m-0 p-0 me-2 mb-2" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        <p className="card-title m-0 p-0 mb-2">{story?.username}</p>
        <p className="p-0 m-0 fw-normal fw-bold" style={{ color: "rgba(175,175,175,0.75)" }}>{story?.createdAt.toDateString()}</p>
      </div>
    </Link>
  )
}
