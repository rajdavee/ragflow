import IndentedTree from '@/components/indented-tree/indented-tree';
import { IModalProps } from '@/interfaces/common';
import { Drawer, Flex, Progress } from 'antd';
import { useTranslation } from 'react-i18next';
import { usePendingMindMap } from './hooks';

interface IProps extends IModalProps<any> {
  data: any;
}

const MindMapDrawer = ({ data, hideModal, visible, loading }: IProps) => {
  const { t } = useTranslation();
  const percent = usePendingMindMap();
  return (
    <Drawer
      title={t('chunk.mind')}
      onClose={hideModal}
      open={visible}
      width={'40vw'}
      headerStyle={{
        backgroundColor: 'rgba(10, 56, 97, 0.05)',
        color: '#0A3861',
        fontWeight: 500,
        borderBottom: '1px solid rgba(10, 56, 97, 0.1)'
      }}
      contentWrapperStyle={{
        boxShadow: '0 0 20px rgba(10, 56, 97, 0.2)'
      }}
    >
      {loading ? (
        <Flex justify="center" align="center" style={{ height: '400px' }}>
          <Progress
            type="circle"
            percent={percent}
            size={200}
            strokeColor={{
              '0%': '#0A3861',
              '100%': '#A8232F'
            }}
          />
        </Flex>
      ) : (
        <IndentedTree
          data={data}
          show
          style={{ width: '100%', height: '100%' }}
        ></IndentedTree>
      )}
    </Drawer>
  );
};

export default MindMapDrawer;
