import Image from "next/image";
import IconEllipse from "../icons/icon-ellipse";

import "./message.css";

/**
 * @typedef {import("@/types/chat").ChatMessage} ChatMessage
 */

/**
 * Displays an individual chat message bubble (sent or received).
 *
 * @param {Object} props component props
 * @param {ChatMessage} [props.message={}] message data to display
 * @param {boolean} [props.isSent=false] whether the message was sent by the current user
 *
 * @returns {JSX.Element} message bubble element
 */
export default function Message({ message = {}, isSent = false }) {
  return (
    <div
      className={`message ${isSent ? "message--sent" : "message--received"}`}
    >
      <Image
        src={
          message.userPicture ?? "https://placehold.co/60x60/565656/565656/png"
        }
        width={28}
        height={28}
        alt={`Photo de ${message.userName}`}
      />

      <div className="message-header">
        <span className="message-username">{message.userName}</span>
        <IconEllipse />
        <span className="message-timestamp">{message.sentAt}</span>
      </div>

      <p>{message.content}</p>
    </div>
  );
}
