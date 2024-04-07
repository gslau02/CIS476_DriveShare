// client/pages/InboxPage.js
import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList';
import NotificationList from '../components/NotificationList';
import SendMessageForm from '../components/SendMessageForm';
import { fetchMessages, createMessage, fetchNotifications } from '../utils/inbox';

const InboxPage = () => {
  const userId = localStorage.getItem('userId');
  const [selectedTab, setSelectedTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesData = await fetchMessages(); // Fetch messages
        setMessages(messagesData); // Set messages state

        const notificationsData = await fetchNotifications(); // Fetch notifications
        setNotifications(notificationsData); // Set notifications state
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async (messageContent) => {
    try {
      if (selectedUser) {
        // Create message data
        const messageData = {
          senderId: userId,
          recipientId: selectedUser.id,
          content: messageContent
        };
        // Call createMessage function to send message
        await createMessage(userId, messageData);
        // Optionally, update the state or fetch messages again after sending a message
        // For example:
        // const updatedMessagesData = await fetchMessages();
        // setMessages(updatedMessagesData);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      <div className="tabs">
        <button onClick={() => setSelectedTab('messages')}>Messages</button>
        <button onClick={() => setSelectedTab('notifications')}>Notifications</button>
      </div>
      {selectedTab === 'messages' && (
        <div className="inbox-container">
          <div className="message-list-container">
            <MessageList messages={messages} onSelectUser={handleSelectUser} />
          </div>
          <div className="send-message-form-container">
            {selectedUser && (
              <SendMessageForm userId={userId} recipientId={selectedUser.id} onSendMessage={handleSendMessage} />
            )}
          </div>
        </div>
      )}
      {selectedTab === 'notifications' && (
        <NotificationList 
          // notifications={notifications} 
          userId = {localStorage.getItem("userId")}
        />
      )}
    </div>
  );
};

export default InboxPage;
