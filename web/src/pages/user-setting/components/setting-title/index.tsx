import { useTranslate } from '@/hooks/common-hooks';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface IProps {
  title: string;
  description: string;
  showRightButton?: boolean;
  clickButton?: () => void;
}

const SettingTitle = ({
  title,
  description,
  clickButton,
  showRightButton = false,
}: IProps) => {
  const { t } = useTranslate('setting');

  return (
    <Flex align="center" justify={'space-between'}>
      <div>
        <Title level={5} style={{ color: '#0A3861', marginBottom: '8px' }}>
          {title}
        </Title>
        <Paragraph style={{ color: '#0A3861', opacity: 0.7 }}>
          {description}
        </Paragraph>
      </div>
      {showRightButton && (
        <Button
          type={'primary'}
          onClick={clickButton}
          style={{
            backgroundColor: '#0A3861',
            borderColor: '#0A3861',
            '&:hover': {
              backgroundColor: '#A8232F',
              borderColor: '#A8232F'
            }
          }}
        >
          <Flex align="center" gap={4}>
            <SettingOutlined />
            {t('systemModelSettings')}
          </Flex>
        </Button>
      )}
    </Flex>
  );
};

export default SettingTitle;
