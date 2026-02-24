import ReactPlayer from "react-player";

export default function SearchPage() {
    const sampleMedia = [
        { type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
        { type: "video", url: "https://vjs.zencdn.net/v/oceans.mp4" },
        { type: "image", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
    ];
    return (
        <div className="d-flex justify-content-center">
            <div className="mx-auto w-75 column-gap-1 p-3" style={{
                columns: "3",
            }}>
                {sampleMedia.map((media, index) => {
                    if (media.type == "image") return <img className="transparent-background-hover-2 mw-100 d-block mb-1" src={media.url} alt="" />
                    return (
                        <video
                            className="transparent-background-hover-2 mw-100 d-block mb-1"
                            src={`${media.url}#t=1`}
                            preload="metadata"
                            muted
                            playsInline
                        />
                    );
                })}
            </div>
        </div>
    )
};