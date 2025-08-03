import { useState } from "react";
import styles from "./index.module.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router-dom";

interface Arguments {
  toggleMenu: () => void;
  toggleFavorite: () => void;
}
const listOfNames = ["Eberty", "Fernanda"]

interface Message {
  message: {
    sender: string;
    content: string;
    time: string
  }
}

const Direct = ({ toggleMenu, toggleFavorite }: Arguments) => {
  const listOfUserFriends = useSelector((state: RootState) => state.users.loggedUser.friends);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number>(-1);
  const [messages, setMessages] = useState<Message[]>();


  const openChat = (id: number) => {
    console.log("Setting chat for user " + listOfNames[id] + " of id " + id)
    setIsChatOpen(true);
    setChatId(id);
  }

  const closeChat = () => {
    setIsChatOpen(false);
    setChatId(-1);
  }

  return (
    <div className={styles.direct} onClick={() => {
      toggleFavorite();
      toggleMenu();
    }}>
      <aside className={styles.sideMenu}>
        <div className={styles.topMenu}>
          <h1>Username</h1>
          <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <div className={styles.inputWrapper}>
          <i className="fa-solid fa-search"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles.users}>
          <div className={styles.user}>
            <i className="fa-solid fa-user"></i>
            <p className={styles.userName}>Your note</p>
          </div>
          {listOfUserFriends.map((user) => (
            <Link to={`/profile/${chatId}`} >
              <div className={styles.user} key={user.id}>
                <i className="fa-solid fa-user"></i>
                <p>{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.messagesHeader}>
          <p>Messages</p>
          <p className={styles.requestText}>Requests</p>
        </div>
        <div className={styles.chats}>
          {listOfUserFriends.length === 0 ? <h1>No friends yet.</h1> : listOfUserFriends.map((user) => (
            <div className={styles.chat} key={user.id} onClick={() => openChat(user.id)}>
              <i className="fa-solid fa-user"></i>
              <div className={styles.userInfo}>
                <p>{user.username}</p>
                <p className="lighterText">Online </p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      {isChatOpen ?
        <div className={styles.chatOpen}>
          <div className={styles.chatHeader}>
            <div className={styles.userInfo}>
              <Link to={`/profile/${chatId}`} >
                <i className="fa-solid fa-user"></i>
                <div className={styles.userNameAndActivity}>
                  <h1>{listOfUserFriends[chatId].username}</h1>
                  <p>User activity</p>
                </div>
              </Link>
            </div>
            <div className={styles.chatOptions}>
              <i className="fa-solid fa-phone"></i>
              <i className="fa-solid fa-video"></i>
              <i className={`fa-solid fa-info ${styles.info}`}></i>
              <i className="fa-solid fa-close" onClick={closeChat}></i>
            </div>
          </div>
          <div className={styles.chatMessages}>
            {messages?.map((message) => (
              <div className={styles.separator}>
                <div className={message.message.sender == "friend" ? styles.friendMessage : styles.userMessage}>
                  {message.message.content}
                  <span className={styles.messageTime}>{message.message.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input type="text" placeholder="Message..." />
          </div>
        </div>
        :
        <div className={styles.noChatOpen}>
          <i className="fa-brands fa-facebook-messenger"></i>
          <h2>Your messages</h2>
          <p>Send photos and private messages to a friend or group</p>
          <button>Send a message</button>
        </div>
      }
    </div >
  )
};

export default Direct;
