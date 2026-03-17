import { URL as BASE_URL} from "@/constants";
import { uploadFile } from "@/feature/auth/services/auth-service";
import { createPost, updatePost } from "@/services/post.service";
import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types/feed";
import { PostToSave } from "@/types/post";
import {  Dispatch, SetStateAction, useState } from "react";

type UpdatePostModalProps = {
  onClose: () => void;
  username: string | undefined;
  postToUpdate: Post;
  setPostToUpdate: Dispatch<SetStateAction<Post | null>>;
};

export default function UpdatePostModal({ onClose, username, postToUpdate, setPostToUpdate }: UpdatePostModalProps) {
    const updatePostStore = usePostStore(state => state.updatePost);
    const [caption, setCaption] = useState<string>(postToUpdate.caption);
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string>(BASE_URL + postToUpdate.contentUrls[0]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }
    const handlePostUpdate = async () => {
        if (caption.length <= 0 || previewUrl.length <= 0) return;
        let url = "";
        if (selectedFile && !previewUrl.includes(BASE_URL)) {
            url = await uploadFile(selectedFile);
        }
        if (url.length > 0 || !previewUrl.includes(BASE_URL)) {
            let post: PostToSave = {
                id: postToUpdate.id,
                title: "",
                caption,
                contentUrls: previewUrl.includes(BASE_URL) ? postToUpdate.contentUrls : [url],
            }
            if(previewUrl.includes(BASE_URL)) post.contentUrls = postToUpdate.contentUrls;
            const res = await updatePost(post);
            if(res) {
                updatePostStore({
                    id: postToUpdate.id,
                    caption,
                    contentUrls: previewUrl.includes(BASE_URL) ? postToUpdate.contentUrls : [url]
                } as Post);
            }
            document.getElementById("discardChanges")?.click();
            discardPost();
        }
    }

    const discardPost = () => {
        setCaption("");
        setPreviewUrl("");
        setSelectedFile(null);
        setPostToUpdate(null);
    }
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updatePostModalLabel">Update post</h1>
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
                        <button type="button" className="btn btn-primary" onClick={handlePostUpdate}>Update post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
