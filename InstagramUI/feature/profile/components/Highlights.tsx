import { useState } from "react"

type HighlightsProps = {
    isLoggedUser: boolean;
}

type Highlight = {
    id: number
    cover: string;
    name: string;
}

export default function Highlights({ isLoggedUser }: HighlightsProps) {
    const [userHighlights] = useState<Highlight[]>([]);
    return (
        <div className="profile-highlights mt-4 mt-md-5 w-75 mx-auto d-flex overflow-x-auto no-scrollbar pb-2">
            {isLoggedUser &&
                <button className="d-flex flex-column align-items-center me-4 ms-2 ms-md-0 btn btn-link p-0 text-decoration-none border-0">                    <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-transparent border text-muted"
                    style={{ width: "84px", height: "84px", fontSize: "1.5rem", borderStyle: "dashed" }}
                >
                    <i className="bi bi-plus-lg"></i>
                </div>
                    <span className="small mt-1 fw-medium text-secondary">New</span>
                </button>
            }

            {userHighlights.map((highlight) => (
                <button
                    key={highlight.id}
                    className="d-flex flex-column align-items-center me-4 cursor-pointer btn btn-link p-0 text-decoration-none border-0"
                    style={{ width: "fit-content" }}
                >
                    <div className="rounded-circle border p-1" style={{ width: "84px", height: "84px" }}>
                        <img
                            className="rounded-circle w-100 h-100 object-fit-cover"
                            src={highlight.cover || "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                            alt={highlight.name}
                        />
                    </div>
                    <p className="small mt-1 mb-0 fw-medium text-truncate" style={{ maxWidth: "84px" }}>
                        {highlight.name}
                    </p>
                </button>
            ))
            }
        </div>
    )
}
