import { useState } from "react";
import styles from "./index.module.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import PhotoPopup from "./photoPopup";

interface Arguments {
    toggleMenu: () => void;
    toggleFavorite: () => void;
}

const UserProfile = ({ toggleMenu, toggleFavorite }: Arguments) => {
    const [posts, setPosts] = useState<{
        id: number,
        postPhotoUrl: string,
        wasLiked: boolean
    }[]>(Array.from({ length: 30 }, (_, index: number) => ({
        id: index + 1,
        postPhotoUrl: `https://picsum.photos/300/300`,
        wasLiked: false
    })))
    const [menuActive, setMenuActive] = useState<boolean>(false);
    const [photoPopup, setPhotoPopup] = useState<boolean>(false);
    const [postOpened, setPostOpened] = useState<number>(0);
    const { id } = useParams();
    const userId = Number(id);

    const user = useSelector((state: RootState) => userId == 0 ? state.users.loggedUser : state.users.users.find(user => user.id == userId));
    const openPhotoPopup = (postId: number) => {
        setPhotoPopup(true);
        setPostOpened(postId);
    }

    return (
        <>
            <PhotoPopup photoPopup={photoPopup} setPhotoPopup={setPhotoPopup} post={posts[postOpened]} />
            <div className={styles.userProfile} onClick={() => {
                toggleFavorite();
                toggleMenu();
            }}>
                <div className={styles.userInformation}>
                    <i className={`fa-solid  fa-user ${styles.profilePicture}`}></i>
                    <div className={styles.userHeader}>
                        <div className={styles.userActions}>
                            <h2>{user?.username}</h2>
                            <div className={styles.buttons}>
                                <button>Follow</button><button>Send a message</button>
                                <button>+ <i className="fa-regular fa-user"></i></button>
                                <i className={`fa-solid fa-ellipsis ${styles.addUser}`}></i>
                            </div>
                        </div>
                        <div className={styles.userNumbers}>
                            <p><span>1</span> publicações</p>
                            <p><span>1</span> seguidore(s)</p>
                            <p><span>1</span> seguindo</p>
                        </div>
                        <div className={styles.userNameAndPronouns}>
                            <h2>{user?.nickname}</h2>
                            <p>{user?.pronouns}</p>
                        </div>
                        <div className={styles.description}>
                            {user?.description}
                        </div>
                        <div className={styles.followers}>
                            <p>Followers : <span>username,</span> <span>username</span> and others.</p>
                        </div>
                    </div>
                </div>
                <hr />
                <nav className={styles.userNav}>
                    <ul>
                        <li onClick={() => setMenuActive(false)} className={`${!menuActive && styles.active}`}>Publications</li>
                        <li onClick={() => setMenuActive(true)} className={`${menuActive && styles.active}`}>Identifications</li>
                    </ul>
                </nav>
                {!menuActive ?
                    <div className={styles.userPhotos}>
                        {posts.map((item) => (
                            <img key={item.id} src={item.postPhotoUrl} onClick={() => openPhotoPopup(item.id)} />
                        ))}
                    </div>
                    :
                    <div className={styles.userPhotos}>
                        {Array(2).fill(1).map((_, index) => (
                            <img key={index} src={`https://picsum.photos/${index * 50}/${index * 50}`} onClick={() => setPhotoPopup(true)} />
                        ))}
                    </div>
                }
            </div >
        </>
    )
};

export default UserProfile;
