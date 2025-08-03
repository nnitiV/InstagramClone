import styles from "./index.module.css"

interface Arguments {
    postId: number,
    current: number,
    images: { id: number }[]
    prev: (postId: number) => void,
    next: (postId: number) => void,
    setActiveIndexes: React.Dispatch<React.SetStateAction<Record<number, number>>>
}

const Post = ({ postId, current, images, prev, next, setActiveIndexes }: Arguments) => {
    return (
        <div className={styles.post} key={postId}>
            <div className={styles.userInfo}>
                <div className={styles.userPhotoAndName}>
                    <i className={`fa-solid fa-user ${styles.userProfile}`}></i>
                    <p>User name <span>● 4d</span></p>
                </div>
                <div className={styles.options}>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <div className={styles.postImages}>
                <div className={styles.arrows}>
                    <i className="fa-solid fa-arrow-left" onClick={() => prev(postId)}></i>
                    <i className="fa-solid fa-arrow-right" onClick={() => next(postId)}></i>
                </div>
                <div className={styles.imagesWrapper} style={{ transform: `translateX(-${current * 100}%)` }}>
                    {images.map((image) => {
                        const photoNumber = Math.floor(Math.random() * 100) + 100;

                        return (
                            <img key={image.id} src={`https://picsum.photos/${photoNumber}/${photoNumber}`} />
                        )
                    })}
                </div>
                <div className={styles.postNav}>
                    {images.map((image) => (
                        <div className={`${styles.navCircle} ${image.id == current && styles.active}`} key={image.id} onClick={() => setActiveIndexes(prev => ({ ...prev, [postId]: image.id }))}></div>
                    ))}
                </div>
            </div>
            <div className={styles.postActions}>
                <div className={styles.mainActions}>
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                </div>
                <i className="fa-regular fa-bookmark"></i>
            </div>
            <p className={styles.likes}>3000 likes</p>
            <input type="text" placeholder={`Adicione um comentário`} />
        </div>
    )
};

export default Post;
