import { BASE_URL } from "@/constants";
import { Story } from "@/types/feed";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type StoryPreviewProps = {
  story: Story | undefined;
  storyPosition: number;
};
export default function StoryPreview({
  story,
  storyPosition,
}: StoryPreviewProps) {
  function useWindowSize() {
    const [width, setWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 1200,
    );

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  const width = useWindowSize();

  const getOffset = () => {
    const farOffset = width * 0.05;
    const nearOffset = width * 0.2;
    switch (storyPosition) {
      case 1:
        return { right: nearOffset };
      case 2:
        return { right: farOffset };
      case -1:
        return { left: nearOffset };
      case -2:
        return { left: farOffset };
      default:
        return {};
    }
  };
  const storyPositionOffset = getOffset();
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
      redirect(`/profile/${story?.username}`)
    }
  return (
    <Link
      href={`/stories/${story?.username}/${story?.id}`}
      className="card p-0 m-0 border-0 position-absolute text-decoration-none"
      style={{
        ...storyPositionOffset,
        width: "13vw",
        height: "50vh",
        backgroundImage: `url(${story?.mediaUrl != null ? BASE_URL + story.mediaUrl : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card-body text-white d-flex flex-column align-items-center justify-content-center"
        style={{ background: "rgba(25,25,25,0.5)" }}
        onClick={goTouser}
      >
        <img
          src={
            story?.profilePictureUrl && story?.profilePictureUrl.length > 0
              ? BASE_URL + story?.profilePictureUrl
              : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
          }
          alt="Profile picture"
          className="rounded-circle border m-0 p-0 me-2 mb-2"
          style={{ width: "48px", height: "48px", objectFit: "cover" }}
        />
        <p className="card-title m-0 p-0 mb-2">{story?.username}</p>
        <p
          className="p-0 m-0 fw-normal fw-bold"
          style={{ color: "rgba(175,175,175,0.75)" }}
        >
          {formatShortDate(
            story?.createdAt != null ? story?.createdAt.toString() : "",
          )}
        </p>
      </div>
    </Link>
  );
}
