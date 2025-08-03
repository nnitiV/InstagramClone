import { useState } from "react";
import styles from "./index.module.css"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { clearSearchHistory, filterUserSearchHistory } from "../../../features/users";
import { Link } from "react-router-dom";

interface Arguments {
  isActive: boolean;
  toggleMenu: (val: boolean) => void;
}

const SearchBar = ({ isActive, toggleMenu }: Arguments) => {
  const listOfUsers = useSelector((state: RootState) => state.users.users);
  const searchHistory = useSelector((state: RootState) => state.users.searcHistory);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState<string>("");
  const [showConfirmationToRemoveAll, setShowConfirmatioToRemoveAll] = useState<boolean>(false);

  const removeUser = (id: number) => {
    dispatch(filterUserSearchHistory(id));
  }

  const openConfirmationToRemoveAll = () => { if (searchHistory.length > 0) { setShowConfirmatioToRemoveAll(true) } };

  const closeConfirmationToRemoveAll = () => setShowConfirmatioToRemoveAll(false);

  const cleanSearchHistory = () => {
    closeConfirmationToRemoveAll();
    dispatch(clearSearchHistory());
  }
  return (
    <>
      <div className={`${styles.searchbar} ${isActive ? styles.active : ""}`}>
        <h1>Search</h1>
        <input type="text" placeholder="Search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <hr />
        {searchName.length == 0 ?
          <>
            <div className={styles.recent}>
              <p className={styles.recentText}>Recent</p>
              <p className={styles.showAllText} onClick={openConfirmationToRemoveAll}>Remove all</p>
            </div>
            <div className={styles.users}>
              {searchHistory.length != 0 ? searchHistory.map((user) => (
                <div className={styles.user} key={user.id}>
                  <div className={styles.info}>
                    <Link to={`/profile/${user.id}`} onClick={() => toggleMenu(false)}>
                      <i className="fa-solid fa-user"></i>
                      <div className={styles.userInfo}>
                        <p className={styles.userName}>{user.username}</p>
                        <p >Full username</p>
                      </div>
                    </Link>
                  </div>
                  <i className="fa-solid fa-close" onClick={() => removeUser(user.id)}></i>
                </div>
              ))
                :
                <div className={styles.noUsers}>
                  <p>No recent search!</p>
                </div>
              }
            </div>
          </>
          :
          <div className={styles.users}>
            {listOfUsers.length != 0 ? listOfUsers.filter(user => user.username.startsWith(searchName)).map((user) => (
              <div className={styles.user} key={user.id}>
                <div className={styles.info}>
                  <i className="fa-solid fa-user"></i>
                  <Link to={`/profile/${user.id}`} onClick={() => toggleMenu(false)}>
                    <div className={styles.userInfo}>
                      <p className={styles.userName}>{user.username}</p>
                      <p >Full username</p>
                    </div>
                  </Link>
                </div>
                <i className="fa-solid fa-close" onClick={() => removeUser(user.id)}></i>
              </div>
            ))
              :
              <div className={styles.noUsers}>
                <p>No recent search!</p>
              </div>
            }
          </div>
        }
      </div >
      {showConfirmationToRemoveAll &&
        <div className={styles.bg}>
          <div className={styles.confirmRemoveAll}>
            <div className={styles.info}>
              <h2>Delete search history?</h2>
              <p>You can't undo this action.</p>
            </div>
            <div className={styles.actions}>
              <button onClick={cleanSearchHistory}>Delete everything</button>
              <button onClick={closeConfirmationToRemoveAll}>Later</button>
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default SearchBar;
