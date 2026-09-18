import Link from "next/link";
import MessageWriter from "@/components/chat/message-writer";
import MessagesByDay from "@/components/chat/messages-by-day";
import UserList from "@/components/chat/user-list";
import IconBack from "@/components/icons/icon-back";

import "./page.css";

const currentUser = 69;
const mockUserList = [
  {
    id: 1,
    name: "Nathalie Jean",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg",
    lastMessageTime: "11:04 am",
    lastMessage:
      "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    isSelected: false,
    isRead: false,
  },
  {
    id: 3,
    name: "Franck Maher",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg",
    lastMessageTime: "11:04 am",
    lastMessage:
      "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    isSelected: false,
    isRead: false,
  },
  {
    id: 4,
    name: "Line Rolland",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-3.jpg",
    lastMessageTime: "11:04 am",
    lastMessage:
      "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    isSelected: false,
    isRead: true,
  },
];
const mockMessagesGroupByDay = [
  {
    hostId: 1,
    date: "03 Septembre 2025",
    messages: [
      {
        id: 1,
        userId: mockUserList[0].id,
        userName: mockUserList[0].name,
        userPicture: mockUserList[0].picture,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
      {
        id: 2,
        userName: "Current User",
        userId: currentUser,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
      {
        id: 3,
        userId: mockUserList[0].id,
        userName: mockUserList[0].name,
        userPicture: mockUserList[0].picture,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
    ],
  },
  {
    hostId: 3,
    date: "03 Septembre 2025",
    messages: [
      {
        id: 5,
        userName: mockUserList[1].name,
        userPicture: mockUserList[1].picture,
        userId: mockUserList[1].id,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
      {
        id: 6,
        userName: "Current User",
        userId: currentUser,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
      {
        id: 7,
        userName: mockUserList[1].name,
        userPicture: mockUserList[1].picture,
        userId: mockUserList[1].id,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
    ],
  },
  {
    hostId: 4,
    date: "03 Septembre 2025",
    messages: [
      {
        id: 8,
        userName: "Current User",
        userId: currentUser,
        sentAt: "11:04pm",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      },
      {
        id: 9,
        userId: mockUserList[2].id,
        userName: mockUserList[2].name,
        userPicture: mockUserList[2].picture,
        sentAt: "11:04pm",
        content: "Bonjour",
      },

      {
        id: 10,
        userId: mockUserList[2].id,
        userName: mockUserList[2].name,
        userPicture: mockUserList[2].picture,
        sentAt: "11:04pm",
        content: "Oui tout à fait!",
      },
    ],
  },
];

export default async function ChatPage({ searchParams }) {
  const { host_id = -1 } = await searchParams;
  const hostFilteredMessages = mockMessagesGroupByDay.filter(
    (messagesByDay) => +host_id === messagesByDay.hostId,
  );

  return (
    <div
      className={`container chat-page ${host_id > -1 ? "chat--active" : ""}`}
    >
      <aside className="chat-users">
        <Link href="/" className="chat-back-home">
          <IconBack /> Retour
        </Link>

        <Link href="/messagerie" className="chat-back-messages">
          <IconBack /> Retour
        </Link>

        <h2>Messages</h2>

        <UserList users={mockUserList} />
      </aside>
      <section className="chat-container">
        {hostFilteredMessages.length ? (
          <>
            <div className="messages-container">
              {hostFilteredMessages.map((messagesByDay) => (
                <MessagesByDay
                  key={messagesByDay.hostId}
                  currentUser={currentUser}
                  date={messagesByDay.date}
                  messages={messagesByDay.messages}
                />
              ))}
            </div>

            <footer>
              <MessageWriter />
            </footer>
          </>
        ) : (
          <p className="no-discussion">Sélectionnez une discussion.</p>
        )}
      </section>
    </div>
  );
}
