import { Link, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import styles from "./index.module.css"
import { useEffect } from "react";
import Favorite from "./favorite";

interface Arguments {
    toggleMenu: (val: boolean) => void;
    isActive: boolean;
    toggleFavorite: (val: boolean) => void;
    isActiveFavorite: boolean
}

const Header = ({ toggleMenu, isActive, isActiveFavorite, toggleFavorite }: Arguments) => {
    const location = useLocation();
    const loggedUserId = 0;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    return (
        <>
            <SearchBar isActive={isActive} toggleMenu={toggleMenu} />
            <Favorite isActive={isActive} toggleMenu={toggleMenu} isActiveFavorite={isActiveFavorite} toggleFavorite={toggleFavorite} />
            <header className={styles.header}>
                <div>
                    <Link to="/"><i className={`fa-brands fa-instagram ${styles.brand}`}></i></Link>
                    <nav>
                        <ul>
                            <li><Link to="/"><img src="/home.png" alt="" /></Link></li>
                            <li onClick={() => {
                                toggleMenu(!isActive);
                                toggleFavorite(false);
                            }}><Link to="#"><i className="fa-solid fa-search"></i></Link></li>
                            <li><Link to="/discover"><i className="fa-regular fa-compass"></i></Link></li>
                            <li><Link to="/shortFormat"><i className="fa-solid fa-film"></i></Link></li>
                            <li><Link to="/direct"><i className="fa-brands fa-facebook-messenger"></i></Link></li>
                            <li onClick={() => {
                                toggleFavorite(!isActiveFavorite);
                                toggleMenu(false);
                            }}><Link to="#"><i className="fa-regular fa-heart"></i></Link></li>
                            <li><Link to="#"><i className="fa-solid fa-plus"></i></Link></li>
                            <li><Link to={`/profile/${loggedUserId}`}><i className="fa-regular fa-user"></i></Link></li>
                        </ul>
                    </nav>
                </div>
                <i className="fa-solid fa-bars"></i>
            </header>

        </>
    )
};

export default Header;
