import { uploadFile } from "@/feature/auth/services/auth-service";
import { createPost, createStory } from "@/services/post.service";
import { Post } from "@/types/feed";
import { StoryToSave } from "@/types/post";
import { useState } from "react";

export default function CreateStoryModal() {
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
        if (previewUrl.length <= 0) return;
        if (selectedFile) {
            let story: StoryToSave = {
                file: selectedFile,
            }
            let res = await createStory(story);
        }
    }
    const discardPost = () => {
        setPreviewUrl("");
        setSelectedFile(null);
    }
    return (
        <div className="modal fade" id="createStory" tabIndex={-1} aria-labelledby="createStoryLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="createStoryLabel">Create Story</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                <label htmlFor="story-upload" className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer">
                                    Select Image
                                </label>

                                <input
                                    type="file"
                                    id="story-upload"
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
