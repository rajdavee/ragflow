import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { Avatar } from 'antd';
import React from 'react';
import { history } from 'umi';

import styles from '../../index.less';

const App: React.FC = () => {
  const { data: userInfo } = useFetchUserInfo();

  const toSetting = () => {
    history.push('/user-setting');
  };

  return (
    <Avatar
      size={40}
      onClick={toSetting}
      className={styles.clickAvailable}
      style={{
        cursor: 'pointer',
        border: '2px solid #0A3861',
        backgroundColor: '#F5F7FA',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: '#A8232F',
          transform: 'scale(1.05)'
        }
      }}
      src={
        userInfo.avatar ??
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    />
  );
};

export default App;
