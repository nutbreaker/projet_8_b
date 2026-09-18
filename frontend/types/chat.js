/**
 * Represents a single chat message.
 *
 * @typedef {Object} ChatMessage
 * @property {number|string} id unique message identifier
 * @property {number|string} [userId] sender's user identifier
 * @property {string} userName sender's display name
 * @property {string} [userPicture] sender's avatar image URL
 * @property {string} sentAt formatted timestamp of when the message was sent
 * @property {string} content message body text
 */

/**
 * Represents a group of messages exchanged on a specific date.
 *
 * @typedef {Object} MessagesByDayGroup
 * @property {number|string} hostId identifier of the host conversation
 * @property {string} date formatted date string for the group header
 * @property {ChatMessage[]} messages list of messages sent on this date
 */

/**
 * Represents a conversation contact displayed in the chat sidebar.
 *
 * @typedef {Object} ChatConversationUser
 * @property {number|string} id user identifier
 * @property {string} name user full name
 * @property {string} picture avatar image URL
 * @property {string} lastMessage preview text of the most recent message
 * @property {string} lastMessageTime formatted time of the most recent message
 * @property {boolean} [isRead=false] whether the last message has been read
 * @property {boolean} [isSelected=false] whether the conversation is currently selected
 */

export {};
