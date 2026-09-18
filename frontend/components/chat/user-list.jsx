"use client";

import { useSearchParams } from "next/navigation";

import User from "./user";

import "./user-list.css";

/**
 * @typedef {import("@/types/chat").ChatConversationUser} ChatConversationUser
 */

/**
 * Displays a list of user conversations in the chat sidebar.
 *
 * @param {Object} props component props
 * @param {ChatConversationUser[]} [props.users=[]] list of conversation users to display
 *
 * @returns {JSX.Element} list of chat users
 */
export default function UserList({ users = [] }) {
  const searchParams = useSearchParams();
  const hostId = searchParams.get("host_id");

  return (
    <ul className="chat-user-list">
      {users.map((user) => (
        <li key={user.id}>
          <User user={user} isSelected={user.id === +hostId} />
        </li>
      ))}
    </ul>
  );
}
