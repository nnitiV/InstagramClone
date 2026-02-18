import { use } from "react";
import Story from "../../../feature/story/features/Story"
import Link from "next/link";

type StoriesPageProps = {
    params: Promise<{ username: string }>;
}

export default function StoriesPage({ params }: StoriesPageProps) {
    const { username } = use(params);
    return (
        <div className="position-relative text-center d-flex justify-content-center align-items-center vh-100 text-primary"
            style={{ background: "rgba(25,25,25)" }}
        >
            <i data-visualcompletion="css-img" aria-label="Instagram" className="position-absolute" role="img"
                style={{
                    backgroundImage: "url('https://static.cdninstagram.com/rsrc.php/v4/ya/r/7RjayfbZ-nN.png')",
                    backgroundPosition: "0px 0px",
                    backgroundSize: "auto",
                    width: "103px",
                    height: "29px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                    top: 35, left: 50
                }}></i>
            <Link href="/"><i className="bi bi-x-lg position-absolute fs-3 text-white fw-bold" style={{ top: 25, right: 50 }}></i></Link>
            <Story username={username} />
        </div>
    )
}