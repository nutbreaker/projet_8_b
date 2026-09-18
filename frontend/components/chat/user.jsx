import Image from "next/image";

import "./user.css";
import IconEllipse from "../icons/icon-ellipse";

/**
 * @typedef {import("@/types/chat").ChatConversationUser} ChatConversationUser
 */

/**
 * Displays an individual user conversation item in the chat sidebar.
 *
 * @param {Object} props component props
 * @param {ChatConversationUser} [props.user={}] user and conversation preview data
 * @param {boolean} [props.isSelected=false] whether this conversation is currently selected
 *
 * @returns {JSX.Element} conversation link element
 */
export default function User({ user = {}, isSelected = false }) {
  return (
    <a
      className={`chat-user ${isSelected ? "chat-user--selected" : ""}`}
      href={`/messagerie?host_id=${user.id}`}
    >
      <Image
        src={user.picture}
        alt={`Photo de ${user.name}`}
        width={45}
        height={45}
      />
      <div className="chat-details">
        <span className="chat-user-name">{user.name}</span>
        <p className="chat-excerpt">{user.lastMessage}</p>
        <span className="chat-time">{user.lastMessageTime}</span>
        <span className="chat-status-icon">
          {!user.isRead && <IconEllipse />}
        </span>
      </div>
    </a>
  );
}
