import MessageItem from '@/components/message-item';
import { MessageType } from '@/constants/chat';
import { Flex, Spin } from 'antd';
import {
  useCreateConversationBeforeUploadDocument,
  useGetFileIcon,
  useGetSendButtonDisabled,
  useSendButtonDisabled,
  useSendNextMessage,
} from '../hooks';
import { buildMessageItemReference } from '../utils';

import MessageInput from '@/components/message-input';
import PdfDrawer from '@/components/pdf-drawer';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import {
  useFetchNextConversation,
  useGetChatSearchParams,
} from '@/hooks/chat-hooks';
import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { buildMessageUuidWithRole } from '@/utils/chat';
import { memo } from 'react';
import styles from './index.less';

interface IProps {
  controller: AbortController;
}

const ChatContainer = ({ controller }: IProps) => {
  const { conversationId } = useGetChatSearchParams();
  const { data: conversation } = useFetchNextConversation();

  const {
    value,
    ref,
    loading,
    sendLoading,
    derivedMessages,
    handleInputChange,
    handlePressEnter,
    regenerateMessage,
    removeMessageById,
  } = useSendNextMessage(controller);

  const { visible, hideModal, documentId, selectedChunk, clickDocumentButton } =
    useClickDrawer();
  const disabled = useGetSendButtonDisabled();
  const sendDisabled = useSendButtonDisabled(value);
  useGetFileIcon();
  const { data: userInfo } = useFetchUserInfo();
  const { createConversationBeforeUploadDocument } =
    useCreateConversationBeforeUploadDocument();

  return (
    <>
      <Flex flex={1} className={styles.chatContainer} vertical>
        <Flex flex={1} vertical className={styles.messageContainer}>
          <div>
            <Spin spinning={loading} style={{ color: '#0A3861' }}>
              {derivedMessages?.map((message, i) => {
                return (
                  <MessageItem
                    loading={
                      message.role === MessageType.Assistant &&
                      sendLoading &&
                      derivedMessages.length - 1 === i
                    }
                    key={buildMessageUuidWithRole(message)}
                    item={message}
                    nickname={userInfo.nickname}
                    avatar={userInfo.avatar}
                    avatarDialog={conversation.avatar}
                    reference={buildMessageItemReference(
                      {
                        message: derivedMessages,
                        reference: conversation.reference,
                      },
                      message,
                    )}
                    clickDocumentButton={clickDocumentButton}
                    index={i}
                    removeMessageById={removeMessageById}
                    regenerateMessage={regenerateMessage}
                    sendLoading={sendLoading}
                    messageStyle={{
                      backgroundColor: message.role === MessageType.Assistant ? 'rgba(10, 56, 97, 0.05)' : '#fff',
                      border: '1px solid rgba(10, 56, 97, 0.1)',
                      boxShadow: '0 2px 8px rgba(10, 56, 97, 0.08)',
                      borderRadius: '8px',
                      margin: '12px 0'
                    }}
                  ></MessageItem>
                );
              })}
            </Spin>
          </div>
          <div ref={ref} />
        </Flex>
        <MessageInput
          disabled={disabled}
          sendDisabled={sendDisabled}
          sendLoading={sendLoading}
          value={value}
          onInputChange={handleInputChange}
          onPressEnter={handlePressEnter}
          conversationId={conversationId}
          createConversationBeforeUploadDocument={
            createConversationBeforeUploadDocument
          }
          style={{
            '& .ant-input': {
              borderColor: 'rgba(10, 56, 97, 0.2)',
              borderRadius: '6px',
              '&:hover, &:focus': {
                borderColor: '#0A3861',
                boxShadow: '0 0 0 2px rgba(10, 56, 97, 0.1)'
              }
            },
            '& .ant-btn-primary': {
              backgroundColor: '#0A3861',
              borderColor: '#0A3861',
              '&:hover': {
                backgroundColor: '#072a49',
                boxShadow: '0 2px 8px rgba(10, 56, 97, 0.2)'
              }
            }
          }}
        ></MessageInput>
      </Flex>
      <PdfDrawer
        visible={visible}
        hideModal={hideModal}
        documentId={documentId}
        chunk={selectedChunk}
      ></PdfDrawer>
    </>
  );
};

export default memo(ChatContainer);
