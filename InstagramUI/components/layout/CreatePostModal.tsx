import { uploadFile } from "@/feature/auth/services/auth-service";
import { createPost } from "@/services/post.service";
import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types/feed";
import { PostToSave } from "@/types/post";
import { Dispatch, SetStateAction, useState } from "react";

export default function CreatePostModal() {
    const addPost = usePostStore(state => state.addPost);
    const [caption, setCaption] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }
    const handlePostCreation = async () => {
        if (caption.length <= 0 || previewUrl.length <= 0) return;
        let url = "";
        if (selectedFile) {
            url = await uploadFile(selectedFile);
        }
        if (url.length > 0) {
            let post: PostToSave = {
                title: "",
                caption,
                contentUrls: [url],
            }
            const res = await createPost(post);
            console.log("Res:", res);
            if(res) {
                addPost({
                    id: res.post.id,
                    contentUrls: [res.post.contentUrl] 
                } as Post);
            }
            document.getElementById("discardChanges")?.click();
        }
    }

    const discardPost = () => {
        setCaption("");
        setPreviewUrl("");
        setSelectedFile(null);
    }
    return (
        <div className="modal fade" id="createModal" tabIndex={-1} aria-labelledby="createModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="createModalLabel">Create post</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label">Caption</label>
                            <input type="text" className="form-control" id="caption"
                                value={caption} onChange={e => setCaption(e.target.value)} />
                        </div>
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div className="mb-3" style={{ height: "250px" }}>
                                <img
                                    src={previewUrl || "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                    alt="Profile Preview"
                                    className="border object-fit-cover mb-3"
                                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <label htmlFor="post-upload" className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer">
                                    Select Image
                                </label>

                                <input
                                    type="file"
                                    id="post-upload"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {previewUrl.length > 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm fw-bold"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPreviewUrl("");
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" id="discardChanges" data-bs-dismiss="modal" onClick={discardPost}>Discard</button>
                        <button type="button" className="btn btn-primary" onClick={handlePostCreation}>Create post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
