import { useTranslate } from '@/hooks/common-hooks';
import { IModalProps } from '@/interfaces/common';
import { Modal, Typography } from 'antd';

import styles from './index.less';

const { Paragraph, Link } = Typography;

const ChatIdModal = ({
  visible,
  hideModal,
  id,
}: IModalProps<any> & { id: string; name?: string; idKey: string }) => {
  const { t } = useTranslate('chat');

  return (
    <Modal
      title={<span style={{ color: '#0A3861', fontWeight: 500 }}>{t('overview')}</span>}
      open={visible}
      onCancel={hideModal}
      cancelButtonProps={{ style: { display: 'none' } }}
      onOk={hideModal}
      okText={t('close', { keyPrefix: 'common' })}
      okButtonProps={{
        style: {
          backgroundColor: '#0A3861',
          borderColor: '#0A3861'
        }
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Paragraph copyable={{ text: id }} className={styles.id}>
        {id}
      </Paragraph>
      <Link
        href="https://ragflow.io/docs/dev/http_api_reference#create-session-with-chat-assistant"
        target="_blank"
        style={{ color: '#A8232F' }}
      >
        {t('howUseId')}
      </Link>
    </Modal>
  );
};

export default ChatIdModal;
