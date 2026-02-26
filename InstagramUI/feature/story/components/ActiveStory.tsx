import { Story } from "@/types/feed"
import Link from "next/link"

type StoryProps = {
  activeStory: Story | undefined;
  activeStoryPosition: number;
  amountOfActiveStory: number;
  thereBefore: boolean;
  thereAfter: boolean;
  firstPreviousStory: { id: number; username: string };
  firstAfterStory: { id: number; username: string };
}
export default function ActiveStory({ activeStory, activeStoryPosition, amountOfActiveStory, thereBefore, thereAfter, firstPreviousStory: firstPreviousStoryIndex, firstAfterStory: firstAfterStoryIndex }: StoryProps) {
  return (
    <>
      {thereBefore &&
        <div className="h-100 d-flex align-items-center m-3">
          <Link href={`/stories/${firstPreviousStoryIndex.username}/${firstPreviousStoryIndex.id}`}>
            <i className="bi bi-arrow-left-circle-fill fs-4" style={{ color: "rgba(235,235,235,0.75" }}></i>
          </Link>
        </div>
      }
      <div className="card p-0 m-0 border-0"
        style={{
          width: "25vw", height: "90vh", backgroundImage: `url(${activeStory?.mediaurl != null ? activeStory.mediaurl : 'https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg'})`,
          backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
        }}>
        <div className="card-body text-white d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex gap-1 px-2 pt-3 mb-2">
              {[...Array(amountOfActiveStory)].map((_, index) => (
                <div key={index} className="rounded" style={{ background: `${index <= activeStoryPosition ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"}`, height: "2px", flex: 1 }}></div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="d-flex align-items-center">
                <img src={activeStory?.profilePictureUrl != null ? activeStory.profilePictureUrl : "https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg"} alt="Profile picture"
                  className="rounded-circle border m-0 p-0 me-2" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
                <div className="text-start">
                  <p className="card-title m-0 p-0 fs-">{activeStory?.username}</p>
                  <span className="text-secondary">{activeStory?.createdAt.toDateString()}</span>
                </div>
              </div>
              <div className="fs-4 w-25 d-flex justify-content-between">
                <i className="bi bi-volume-up"></i>
                <i className="bi bi-play"></i>
                <i className="bi bi-three-dots"></i>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around fs-4">
            <input type="text" className="form-control bg-transparent transparent-input  text-white rounded-4 w-75" placeholder={`Reply to ${activeStory?.username}...`} aria-label="Username" aria-describedby="basic-addon1" />
            <i className="bi bi-heart"></i>
            <i className="bi bi-send"></i>
          </div>
        </div>
      </div>
      {thereAfter &&
        <div className="h-100 d-flex align-items-center m-3">
          <Link href={`/stories/${firstAfterStoryIndex.username}/${firstAfterStoryIndex.id}`}>
            <i className="bi bi-arrow-right-circle-fill fs-4" style={{ color: "rgba(235,235,235,0.75" }}></i>
          </Link>
        </div>
      }
    </>
  )
}
