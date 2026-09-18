import Message from "./message";

import "./messages-by-day.css";

/**
 * @typedef {import("@/types/chat").ChatMessage} ChatMessage
 */

/**
 * Displays a group of chat messages for a specific day with a date divider header.
 *
 * @param {Object} props component props
 * @param {number|string} props.currentUser identifier of the currently authenticated user
 * @param {string} [props.date=""] formatted date string for the divider header
 * @param {ChatMessage[]} [props.messages=[]] list of messages for the day
 *
 * @returns {JSX.Element} day group of chat messages
 */
export default function MessagesByDay({
  currentUser,
  date = "",
  messages = [],
}) {
  return (
    <div className="messages-by-day">
      <header className="messages-header">
        <h3 className="messages-day-divider">{date}</h3>
      </header>

      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isSent={message.userId === currentUser}
          />
        ))}
      </div>
    </div>
  );
}
