import { useState } from "react";
import styles from "./index.module.css"
import Post from "./post";
import Stories from "./stories";

interface Arguments {
    toggleMenu: () => void;
    toggleFavorite: () => void;
}

const images = Array(3).fill(1).map((_, index) => (
    {
        id: index,
    }
));

const Home = ({ toggleMenu, toggleFavorite }: Arguments) => {
    const [activeIndexes, setActiveIndexes] = useState<Record<number, number>>({});

    const prev = (postId: number) => {
        const currentActive = activeIndexes[postId] || 0;
        const newIndex = currentActive - 1 < 0 ? images.length - 1 : currentActive - 1;
        console.log(currentActive, newIndex);
        setActiveIndexes(prev => ({ ...prev, [postId]: newIndex }))
    };

    const next = (postId: number) => {
        const currentActive = activeIndexes[postId] || 0;
        const newCurrent = currentActive + 1 >= images.length ? 0 : currentActive + 1;
        setActiveIndexes(prev => ({ ...prev, [postId]: newCurrent }))
    };

    return (
        <main onClick={() => {
            toggleMenu();
            toggleFavorite();
        }}>
            <Stories />
            <div className={styles.posts}>
                {Array.from({ length: 3 }).map((_, index) => {
                    const postId = index;
                    const current = activeIndexes[index] || 0;

                    return (
                        <Post key={index} current={current} images={images} next={next} postId={postId} prev={prev} setActiveIndexes={setActiveIndexes} />
                    )
                })}
            </div>
        </main>
    )
};

export default Home;
