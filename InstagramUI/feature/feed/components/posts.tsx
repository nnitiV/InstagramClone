import { Post } from "@/types/feed";
import PostMedia from "./postMedia";

type PostsProps = {
    posts: Post[],
}

export default function Posts({ posts }: PostsProps) {
    return (
        <div className="container-fluid p-0" >
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-7">
                    {posts.map((post) => (
                        <div key={post.id} className="border-bottom pb-4 my-3">
                            <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="d-flex align-items-center cursor-pointer">
                                    <img
                                        src={post.profilePictureUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        alt="User"
                                        className="rounded-circle border me-2"
                                        style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                    />
                                    <div className="d-flex align-items-center">
                                        <span className="fw-bold small me-1">{post.authorName}</span>
                                        <span className="text-muted small">• {post.createdAt}</span>
                                    </div>
                                </div>
                                <i className="bi bi-three-dots cursor-pointer"></i>
                            </div>
                            <PostMedia contentUrls={post.contentUrls} />
                            <div className="d-flex align-items-center mt-2">
                                <div className="d-flex align-items-center me-3 cursor-pointer">
                                    <i className="bi bi-heart fs-4"></i>
                                    <span className="ms-1 fw-semibold">{post.likeCount}</span>
                                </div>
                                <div className="d-flex align-items-center me-3 cursor-pointer">
                                    <i className="bi bi-chat fs-4"></i>
                                    <span className="ms-1 fw-semibold">{post.commentCount}</span>
                                </div>
                                <div className="cursor-pointer">
                                    <i className="bi bi-send fs-4"></i>
                                </div>
                                <div className="ms-auto cursor-pointer">
                                    <i className="bi bi-bookmark fs-4"></i>
                                </div>
                            </div>
                            <div className="mt-1">
                                <span className="fw-bold me-2 small">{post.authorName}</span>
                                <span className="small">
                                    {post.caption}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="border-bottom pb-4 my-3">
                        <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="d-flex align-items-center cursor-pointer">
                                <img
                                    src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="User"
                                    className="rounded-circle border me-2"
                                    style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                />
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold small me-1">username</span>
                                    <span className="text-muted small">• 3h</span>
                                </div>
                            </div>
                            <i className="bi bi-three-dots cursor-pointer"></i>
                        </div>
                        <div className="ratio ratio-1x1 bg-light border rounded overflow-hidden">
                            <img
                                src="https://www.animenewsnetwork.com/thumbnails/max600x600/cms/preview-guide/86878/rmls.jpg"
                                className="object-fit-cover w-100 h-100"
                                alt="Post"
                            />
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <div className="d-flex align-items-center me-3 cursor-pointer">
                                <i className="bi bi-heart fs-4"></i>
                                <span className="ms-1 fw-semibold">356</span>
                            </div>
                            <div className="d-flex align-items-center me-3 cursor-pointer">
                                <i className="bi bi-chat fs-4"></i>
                                <span className="ms-1 fw-semibold">9</span>
                            </div>
                            <div className="cursor-pointer">
                                <i className="bi bi-send fs-4"></i>
                            </div>
                            <div className="ms-auto cursor-pointer">
                                <i className="bi bi-bookmark fs-4"></i>
                            </div>
                        </div>
                        <div className="mt-1">
                            <span className="fw-bold me-2 small">username</span>
                            <span className="small">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}