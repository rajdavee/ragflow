import ChatContainer from './large';
import styles from './index.less';

const SharedChat = () => {
  return (
    <div className={styles.chatWrapper} style={{
      backgroundColor: '#f8f9fa',
      boxShadow: 'inset 0 2px 8px rgba(10, 56, 97, 0.05)'
    }}>
      <ChatContainer></ChatContainer>
    </div>
  );
};

export default SharedChat;
