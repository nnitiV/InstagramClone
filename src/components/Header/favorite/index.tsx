import styles from "./index.module.css"


interface Arguments {
    isActive: boolean;
    toggleMenu: (val: boolean) => void;
    isActiveFavorite: boolean;
    toggleFavorite: (val: boolean) => void;
}
const Favorite = ({ isActiveFavorite }: Arguments) => {
    return (
        <div className={`${styles.favoriteSlider} ${isActiveFavorite && styles.active}`}>
            <h1>Notifications</h1>
            <p>Today</p>
            <hr />
        </div>
    )
};

export default Favorite;
