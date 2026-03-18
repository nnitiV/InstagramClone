import { Story } from "@/types/feed";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { checkStoryLikeStatus, likeStory, unlikeStory } from "../services/stories.service";
import { getUserByUsername } from "@/feature/profile/services/profile.service";
import { useChatStore } from "@/stores/useChatStore";
import { BASE_URL } from "@/constants";

type StoryProps = {
  activeStory: Story | undefined;
  activeStoryPosition: number;
  amountOfActiveStory: number;
  thereBefore: boolean;
  thereAfter: boolean;
  firstPreviousStory: { id: number; username: string };
  firstAfterStory: { id: number; username: string };
};

export default function ActiveStory({
  activeStory,
  activeStoryPosition,
  amountOfActiveStory,
  thereBefore,
  thereAfter,
  firstPreviousStory: firstPreviousStoryIndex,
  firstAfterStory: firstAfterStoryIndex,
}: StoryProps) {
  const [message, setMessage] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sendMessage = useChatStore(state => state.sendMessage);
  useEffect(() => {
    const checkStoryStatus = async () => {
      if (activeStory != null) {
        setIsLiked(await checkStoryLikeStatus(activeStory.id));
      }
    }
    checkStoryStatus();
  }, [])
  const formatShortDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { locale: ptBR })
      .replace("aproximadamente ", "")
      .replace("há ", "")
      .replace("menos de um minuto", "agora")
      .replace(" minutos", "min")
      .replace(" minuto", "min")
      .replace(" horas", "h")
      .replace(" hora", "h")
      .replace(" dias", "d")
      .replace(" dia", "d");
  };

  const goTouser = () => {
    redirect(`/profile/${activeStory?.username}`);
  };

  const toggleLikeStory = async () => {
    if (activeStory != null) {
      if (isLiked) {
        const res = await unlikeStory(activeStory.id);
        if (res != null) {
          setIsLiked(false);
        }
      } else {
        const res = await likeStory(activeStory.id);
        if (res != null) {
          setIsLiked(true);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }
    }
  }

  const handleSendMessage = async (
    e: React.KeyboardEvent<HTMLInputElement> | null = null) => {
    if (e == null || (e != null && e.key == "Enter")) {
      messageSend();
    }
  }

  const messageSend = async () => {
    const messageToSend = `Respondeu ao seu story: ${message}`;
    if (activeStory?.username != null) {
      const userId = (await getUserByUsername(activeStory.username)).user.id;
      await sendMessage({
        receiverId: userId,
        content: messageToSend,
        storyId: activeStory.id
      });
      setMessage("");
    }
  }

  return (
    <>
      {thereBefore && (
        <div className="h-100 d-flex align-items-center m-3">
          <Link
            href={`/stories/${firstPreviousStoryIndex.username}/${firstPreviousStoryIndex.id}`}
          >
            <i
              className="bi bi-arrow-left-circle-fill fs-4"
              style={{ color: "rgba(235,235,235,0.75" }}
            ></i>
          </Link>
        </div>
      )}
      <div
        className="card p-0 m-0 border-0"
        style={{
          width: "25vw",
          height: "90vh",
          backgroundImage: `url(${BASE_URL + activeStory?.mediaUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card-body text-white d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex gap-1 px-2 pt-3 mb-2">
              {[...Array(amountOfActiveStory)].map((_, index) => (
                <div
                  key={index}
                  className="rounded"
                  style={{
                    background: `${index <= activeStoryPosition ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"}`,
                    height: "2px",
                    flex: 1,
                  }}
                ></div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="d-flex align-items-center" onClick={goTouser}>
                <img
                  src={
                    activeStory?.profilePictureUrl &&
                      activeStory?.profilePictureUrl.length > 0
                      ? BASE_URL +
                      activeStory?.profilePictureUrl
                      : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  }
                  alt="Profile picture"
                  className="rounded-circle border m-0 p-0 me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="text-start">
                  <p className="card-title m-0 p-0 fs-">
                    {activeStory?.username}
                  </p>
                  <span className="text-secondary">
                    {formatShortDate(
                      activeStory?.createdAt != null
                        ? activeStory?.createdAt.toString()
                        : "",
                    )}
                  </span>
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
            <input
              type="text"
              className="form-control bg-transparent transparent-input  text-white rounded-4 w-75 text-truncate"
              placeholder={`Reply to ${activeStory?.username}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSendMessage}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <i onClick={toggleLikeStory} className={isLiked ? "bi-heart-fill text-danger" : "bi-heart"}
              style={{
                transform: isAnimating ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }}></i>
            <i className="bi bi-send" onClick={() => handleSendMessage(null)}></i>
          </div>
        </div>
      </div>
      {thereAfter && (
        <div className="h-100 d-flex align-items-center m-3">
          <Link
            href={`/stories/${firstAfterStoryIndex.username}/${firstAfterStoryIndex.id}`}
          >
            <i
              className="bi bi-arrow-right-circle-fill fs-4"
              style={{ color: "rgba(235,235,235,0.75" }}
            ></i>
          </Link>
        </div>
      )}
    </>
  );
}
