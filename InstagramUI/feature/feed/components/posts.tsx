type PostsProps = {
    posts: number[],
}

export default function Posts({ posts }: PostsProps) {
    return (
        <div>
            {posts.map(post => (
                <div className="w-50 m-auto pb-3 border-bottom border-1 my-3">
                    <div id="postHeader" className="d-flex align-items-center">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="Add Story"
                            className="rounded-circle border me-2"
                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                        />
                        <div>
                            <p className="m-0 p-0">name - 3h</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://www.animenewsnetwork.com/thumbnails/max600x600/cms/preview-guide/86878/rmls.jpg" alt="" />
                    </div>
                </div>
            ))}
        </div>
    );
}