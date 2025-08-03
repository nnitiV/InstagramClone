import useScrollSnap from "react-use-scroll-snap";
import styles from "./index.module.css"
import { useRef } from "react";
interface Arguments {
  toggleMenu: () => void;
  toggleFavorite: () => void;
}
const ShortVideos = ({ toggleMenu, toggleFavorite }: Arguments) => {
  const scrollRef = useRef<HTMLDivElement>(null!);

  useScrollSnap({ ref: scrollRef, duration: 500, isArrowKeysEnabled: true, isDirectionEnabled: true });


  return (
    <div className={styles.shortVideos} ref={scrollRef} onClick={() => {
      toggleFavorite();
      toggleMenu();
    }}>
      {Array(1000).fill(1).map((el, _) => (
        <div className={styles.content} key={el} >
          <div className={styles.video}>
            <div className={styles.user}>
              <i className="fa-solid fa-user"></i>
              <p>User Name</p>
            </div>
            <p className={styles.description}>Description....</p>
          </div>
          <div className={styles.options}>
            <div className={styles.likes}>
              <i className="fa-regular fa-heart"></i>
              <p>1.4k</p>
            </div>
            <div className={styles.comments}>
              <i className="fa-regular fa-comment"></i>
              <p>1.4k</p>
            </div>
            <div>
              <i className="fa-regular fa-paper-plane"></i>
            </div>
            <div>
              <i className="fa-regular fa-bookmark"></i>
            </div>
            <div>
              <i className={`fa-solid fa-ellipsis ${styles.ellipsis}`}></i>
            </div>
            <div>
              <i className={`fa-regular fa-user ${styles.user}`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ShortVideos;
