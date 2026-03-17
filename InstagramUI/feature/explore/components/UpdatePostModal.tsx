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
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>(postToUpdate.contentUrls);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (editIndex !== null) {
          setSelectedFiles((prev) => {
            const newFiles = [...prev];
            newFiles[editIndex] = file;
            return newFiles;
          });
          setPreviewUrls((prev) => {
            const newUrls = [...prev];
            newUrls[editIndex] = URL.createObjectURL(file);
            return newUrls;
          });
          setEditIndex(null);
        } else {
          setSelectedFiles((prev) => [...prev, file]);
          setPreviewUrls((prev) => [...prev, URL.createObjectURL(file)]);
        }
      }
    };
   
    const handlePostUpdate = async () => {
      if (caption.length <= 0 || previewUrls.length <= 0) return;
      
      let uploadedUrls: string[] = [];
      if (selectedFiles && selectedFiles.length > 0) {
        uploadedUrls = await Promise.all(
          selectedFiles.filter(f => f != null || f != undefined).map(async (selectedFile) => {
            const url = await uploadFile(selectedFile);
            return url;
          }),
        );
      }
      const finalContentUrls: string[] = [];
      let uploadIndex = 0; 

      for (const previewUrl of previewUrls) {
          if (previewUrl.startsWith("blob:")) {
          finalContentUrls.push(uploadedUrls[uploadIndex]);
          uploadIndex++;
        } else {
          finalContentUrls.push(previewUrl);
        }
      }
      let post: PostToSave = {
        id: postToUpdate.id,
        title: "",
        caption,
        contentUrls: finalContentUrls,
      };

      const res = await updatePost(post);

      if (res) {
        updatePostStore({
          id: postToUpdate.id,
          caption,
          contentUrls: finalContentUrls,
        } as Post);
      }

      document.getElementById("discardChanges")?.click();
      discardPost();
    };

    const discardPost = () => {
        setCaption("");
        setPreviewUrls([]);
        setSelectedFiles([]);
        setPostToUpdate(null);
    };
    const removeImage = (indexToRemove: number) => {
      setPreviewUrls((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );
      setSelectedFiles((prev) =>
        prev ? prev.filter((_, index) => index !== indexToRemove) : [],
      );
    };
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updatePostModalLabel">
              Update post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="caption" className="form-label">
                Caption
              </label>
              <input
                type="text"
                className="form-control"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column align-items-center mb-4">
              {previewUrls.length <= 0 ? (
                <div
                  className="mb-3 position-relative"
                  style={{ height: "250px" }}
                  onClick={() => {
                    setEditIndex(null);
                    document.getElementById("upload-image-label")?.click();
                  }}
                >
                  <img
                    src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                    alt="Profile Preview"
                    className="border object-fit-cover mb-3"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ) : (
                <div className="row">
                  {previewUrls.map((previewUrl, index) => {
                    const colClass =
                      previewUrls.length === 1
                        ? "col-12"
                        : previewUrls.length === 2
                          ? "col-6"
                          : "col-4";

                    const containerHeight =
                      previewUrls.length === 1 ? "250px" : "150px";

                    return (
                      <div
                        key={index}
                        className={`mb-3 position-relative ${colClass}`}
                        style={{ height: containerHeight }}
                      >
                        <img
                          src={previewUrl.startsWith("blob:") ? previewUrl : BASE_URL + previewUrl}
                          alt="Profile Preview"
                          className="border object-fit-cover rounded"
                          style={{ width: "100%", height: "100%" }}
                        />
                        <i
                          role="button"
                          className="bi-pencil-square position-absolute"
                          onClick={() => {
                            setEditIndex(index);
                            document.getElementById("post-upload")?.click();
                          }}
                          style={{
                            right: "45px",
                            top: "7px",
                            color: "rgba(155,185,255,1)",
                          }}
                        ></i>
                        <i
                          role="button"
                          className="bi-trash text-danger position-absolute"
                          onClick={() => removeImage(index)}
                          style={{ right: "20px", top: "7px" }}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="d-flex gap-2">
                {previewUrls.length <= 0 && (
                  <label
                    htmlFor="post-upload"
                    id="upload-image-label"
                    onClick={() => setEditIndex(null)}
                    className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer"
                  >
                    Select Image
                  </label>
                )}
                <input
                  type="file"
                  id="post-upload"
                  className="d-none"
                  accept="image/*"
                  key={previewUrls.length}
                  onChange={handleImageChange}
                />
                {previewUrls.length > 0 && (
                  <>
                    <label
                      role="button"
                      className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer"
                      htmlFor="post-upload"
                      onClick={() => setEditIndex(null)}
                    >
                      Add another image
                    </label>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer"
                      onClick={() => {
                        setSelectedFiles([]);
                        setPreviewUrls([]);
                      }}
                    >
                      Clear all images
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              id="discardChanges"
              data-bs-dismiss="modal"
              onClick={discardPost}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePostUpdate}
            >
              Update post
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
