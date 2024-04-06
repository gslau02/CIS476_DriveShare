import React from 'react';
import PropTypes from 'prop-types';

const ConversationsList = ({ conversations, onSelectConversation }) => {
  return (
    <div className="conversations-list">
      {conversations.map((conversation) => (
        <div key={conversation._id} onClick={() => onSelectConversation(conversation)}>
          {/* Display conversation summary */}
        </div>
      ))}
    </div>
  );
};

ConversationsList.propTypes = {
  conversations: PropTypes.array.isRequired,
  onSelectConversation: PropTypes.func.isRequired,
};

export default ConversationsList;