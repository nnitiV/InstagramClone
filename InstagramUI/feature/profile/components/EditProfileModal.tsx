import { BASE_URL } from "@/constants";
import { uploadFile } from "@/services/file.service";
import { updateUserProfile } from "@/services/user.service";
import { EditUserProfile, UserProfile } from "@/types/user";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type EditProfileModalProps = {
    user: UserProfile | null;
    setUser: Dispatch<SetStateAction<UserProfile | null>>
}

export default function EditProfileModal({ user, setUser }: EditProfileModalProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<EditUserProfile>({
        id: user?.id || 0,
        username: user?.username || "",
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePictureUrl: user?.profilePictureUrl || "",
        dateOfBirth: user?.dateOfBirth || new Date().toISOString(),
        age: user?.age || 0,
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(editUser.profilePictureUrl || "");
    const editBtnClose = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (user) {
            setEditUser({
                id: user.id,
                username: user.username,
                name: user.name || "",
                email: user.email,
                bio: user.bio || "",
                profilePictureUrl: user.profilePictureUrl || "",
                dateOfBirth: user.dateOfBirth,
                age: user.age,
            });
            if(user.profilePictureUrl) {
                setPreviewUrl(BASE_URL + user.profilePictureUrl);
            }
        }
    }, [user]);
    const updateUser = async () => {
        setLoading(true);
        let userToSave = { ...editUser };
        let photoUrl = "";
        if (selectedFile) {
            photoUrl = await uploadFile(selectedFile);
        }
        if (photoUrl.length > 0) userToSave.profilePictureUrl = photoUrl;
        try{
        const res = await updateUserProfile(userToSave);
        if(res) {
            setUser({
                id: userToSave.id ?? 0,
                username: userToSave.username || "",
                name: userToSave.name || "",
                email: userToSave.email || "",
                bio: userToSave.bio || "",
                profilePictureUrl: userToSave.profilePictureUrl || "",
                dateOfBirth: userToSave.dateOfBirth || "",
                age: userToSave.age ?? 0,
                followersCount: userToSave.followersCount ?? 0,
                followingCount: userToSave.followingCount ?? 0,
                postsCount: userToSave.postsCount ?? 0,
            } as UserProfile);
            editBtnClose.current?.click();
        }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
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
    const handleDiscard = () => {
        if (user) {
            setEditUser({
                id: user.id,
                username: user.username,
                name: user.name || "",
                email: user.email,
                bio: user.bio || "",
                profilePictureUrl: user.profilePictureUrl || "",
                dateOfBirth: user.dateOfBirth,
                age: user.age,
            });
            
            setPreviewUrl((prev) => {
                if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
                return user.profilePictureUrl ? BASE_URL + user.profilePictureUrl : "";
            });
            setSelectedFile(null);
        }
    };
    return (
        <div className="modal fade" id="editProfile" tabIndex={-1} aria-labelledby="editProfileLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editProfileLabel">Edit profile info</h1>
                        <button type="button" id="edit-modal-close" ref={editBtnClose} onClick={handleDiscard} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="d-flex flex-column align-items-center mb-4">
                                <img
                                    src={previewUrl || "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
                                    alt="Profile Preview"
                                    className="rounded-circle border object-fit-cover mb-3"
                                    style={{ width: "150px", height: "150px" }}
                                />

                                <div className="d-flex gap-2">
                                    <label htmlFor="profile-upload" className="btn btn-primary btn-sm fw-bold m-0 cursor-pointer">
                                        Change Photo
                                    </label>

                                    <input
                                        type="file"
                                        id="profile-upload"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                    {previewUrl && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm fw-bold"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setPreviewUrl(user?.profilePictureUrl ? BASE_URL + user?.profilePictureUrl : "");
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-12 col-md-6">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username"
                                        value={editUser.username} onChange={(e) => setEditUser(prev => ({
                                            ...prev,
                                            username: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="mb-3 col-12 col-md-6">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name"
                                        value={editUser.name} onChange={(e) => setEditUser(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))} />
                                </div>
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <textarea className="form-control" id="bio" rows={3}
                                    value={editUser.bio} onChange={(e) => setEditUser(prev => ({
                                        ...prev,
                                        bio: e.target.value
                                    }))}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleDiscard}>Close</button>
                         {
                            loading ?
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                                :
                                <button type="button" className="btn btn-primary" onClick={updateUser}>Save changes</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
