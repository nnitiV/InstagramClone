import { useState } from "react";
import styles from "./index.module.css"

const stories = Array(16).fill(1).map((_, index) => (
    { id: index }
))

const Stories = () => {
    const visibleStories = 8;
    const step = 4;
    const [curr, setCurr] = useState<number>(0);

    const maxScroll = Math.max(0, stories.length - visibleStories);

    const prev = () => setCurr(prev => curr == 0 ? maxScroll : Math.max(prev - step, 0))
    const next = () => setCurr(prev => curr == maxScroll ? 0 : Math.min(prev + step, maxScroll))

    return (
        <div className={styles.stories}>
            <div className={styles.arrows}>
                <i className={`fa-solid fa-arrow-left ${styles.arrowLeft}`} onClick={prev}></i>
                <i className={`fa-solid fa-arrow-right ${styles.arrowRight}`} onClick={next}></i>
            </div>
            <div className={styles.storiesWrapper} style={{ transform: `translateX(-${curr * (100 / visibleStories)}%)` }}>
                {stories.map((story) => {
                    const photoNumber = Math.floor(Math.random() * 100) + 100;
                    return (
                        <div className={styles.story} key={story.id}>
                            <div className={styles.image}>
                                <img src={`https://picsum.photos/${photoNumber}/${photoNumber}`} />
                            </div>
                            <p>Name {story.id + 1}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
};

export default Stories;