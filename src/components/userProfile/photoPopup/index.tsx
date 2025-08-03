import { useState } from "react";
import styles from "./index.module.css"

interface Arguments {
    photoPopup: boolean;
    setPhotoPopup: (val: boolean) => void;
    post: {
        id: number,
        postPhotoUrl: string,
        wasLiked: boolean
    }
}

export default function PhotoPopup({ photoPopup, setPhotoPopup, post }: Arguments) {
    const [photoLike, setPhotoLike] = useState<boolean>(post.wasLiked);
    const toggleLike = () => {
        post.wasLiked = !post.wasLiked;
        setPhotoLike(prev => !prev)
    }
    return (
        <div className={`${styles.wrapper} ${photoPopup && styles.active}`} >
            <i className={`fa-solid fa-close ${styles.closeIcon}`} onClick={() => setPhotoPopup(false)}></i>
            <div className={styles.photoPopup}>
                <img src={"https://picsum.photos/300/300"} alt="Profile photo" />
                <div className={styles.rightSide} >
                    <div className={styles.header}>
                        <div className={styles.userInfo}>
                            <i className="fa-solid fa-user"></i>
                            <p>username</p>
                        </div>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className={styles.comments}>
                        <h1>No comments for now</h1>
                        <p>Start the conversation</p>
                    </div>
                    <div className={styles.likeSection}>
                        <hr />
                        <div className={styles.actions}>
                            <div className={styles.mainActions}>
                                <img onClick={toggleLike} src={`${post.wasLiked ? 'https://img.icons8.com/?size=100&id=7697&format=png&color=000000' : 'https://img.icons8.com/?size=100&id=85038&format=png&color=000000'}`} alt="" />
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                                    <path d="M 16 3 C 12.210938 3 8.765625 4.113281 6.21875 5.976563 C 3.667969 7.835938 2 10.507813 2 13.5 C 2 17.128906 4.472656 20.199219 8 22.050781 L 8 29 L 14.746094 23.9375 C 15.15625 23.96875 15.570313 24 16 24 C 19.789063 24 23.234375 22.886719 25.78125 21.027344 C 28.332031 19.164063 30 16.492188 30 13.5 C 30 10.507813 28.332031 7.835938 25.78125 5.976563 C 23.234375 4.113281 19.789063 3 16 3 Z M 16 5 C 19.390625 5 22.445313 6.015625 24.601563 7.589844 C 26.757813 9.164063 28 11.246094 28 13.5 C 28 15.753906 26.757813 17.835938 24.601563 19.410156 C 22.445313 20.984375 19.390625 22 16 22 C 15.507813 22 15.015625 21.972656 14.523438 21.925781 L 14.140625 21.894531 L 10 25 L 10 20.859375 L 9.421875 20.59375 C 6.070313 19.019531 4 16.386719 4 13.5 C 4 11.246094 5.242188 9.164063 7.398438 7.589844 C 9.554688 6.015625 12.609375 5 16 5 Z"></path>
                                </svg>
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <div className={styles.save}>
                                <i className="fa-regular fa-bookmark"></i>
                            </div>
                        </div>
                        <div className={styles.peopleLiked}>
                            <i className="fa-solid fa-user"></i>
                            <i className="fa-solid fa-user"></i>
                            <i className="fa-solid fa-user"></i>
                            <p>Liked by: <span>username</span> and <span>13 others</span></p>
                        </div>
                        <hr />
                    </div>
                    <div className={styles.insertComment}>
                        <i className="fa-solid fa-face-smile"></i>
                        <input type="text" placeholder="Add a comment..." />
                        <p>Publish</p>
                    </div>
                </div>
            </div>
        </div>
    )
};