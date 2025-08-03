import styles from "./index.module.css"

interface Arguments {
  toggleMenu: () => void;
  toggleFavorite: () => void
}

const Reels = ({ toggleMenu, toggleFavorite }: Arguments) => {
  return (
    <div className={styles.reels} onClick={() => {
      toggleMenu();
      toggleFavorite();
    }}>
      {Array(50).fill(1).map((_, index) => (
        <img key={index} className={`${styles.reel} ${index % 5 == 0 && styles.big}`} src={`https://picsum.photos/${index * 50}/${index * 50}`} />
      ))}
    </div>
  )
};

export default Reels;
