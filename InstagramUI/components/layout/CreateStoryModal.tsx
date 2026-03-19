"use client";
import { createStory } from "@/services/story.service";
import { StoryToSave } from "@/types/story";
import { useRef, useState } from "react";

export default function CreateStoryModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleStoryCreation = async () => {
    if (!selectedFile || previewUrl.length <= 0) return;
    setLoading(true);
    if (selectedFile) {
      let story: StoryToSave = {
        file: selectedFile,
      };
      await createStory(story);
    }
    discardStory();
    closeBtnRef.current?.click();
    setLoading(false);
  };
  const discardStory = () => {
    if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    setPreviewUrl("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div
      className="modal fade"
      id="createStory"
      tabIndex={-1}
      aria-labelledby="createStoryLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="createStoryLabel">
              Create Story
            </h1>
            <button
              type="button"
              className="btn-close"
              id="close"
              ref={closeBtnRef}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="mb-3" style={{ height: "350px" }} onClick={() => fileInputRef.current?.click()}>
                <img
                  src={
                    previewUrl ||
                    "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  }
                  alt="Profile Preview"
                  className="border object-fit-cover mb-3"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="d-flex gap-2">
                <label
                  htmlFor="story-upload"
                  className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer"
                >
                  Select Image
                </label>

                <input
                  type="file"
                  id="story-upload"
                  className="d-none"
                  accept="image/*"
                  ref={fileInputRef}
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
            <button
              type="button"
              className="btn btn-secondary"
              id="discardChanges"
              data-bs-dismiss="modal"
              onClick={discardStory}
            >
              Discard
            </button>
            {loading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStoryCreation}
              >
                Create story
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
