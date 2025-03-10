import { MoonIcon, SunIcon } from 'lucide-react';
import React from 'react';
import { Space, Button } from 'antd';
import User from '../user';
import { useTheme } from '@/components/theme-provider';
import styled from './index.less';

const Circle = ({ children, ...restProps }: React.PropsWithChildren) => {
  return (
    <div {...restProps} className={styled.circle}>
      {children}
    </div>
  );
};

const RightToolBar = () => {
  const { setTheme, theme } = useTheme();

  const onMoonClick = React.useCallback(() => {
    setTheme('light');
  }, [setTheme]);

  const onSunClick = React.useCallback(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <div className={styled.toolbarWrapper}>
      <Space wrap size={16} className={styled.toolbarSpace}>
        <Circle style={{
          backgroundColor: theme === 'dark' ? '#0A3861' : '#F5F7FA',
          color: theme === 'dark' ? '#FFFFFF' : '#0A3861',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          {theme === 'dark' ? (
            <MoonIcon onClick={onMoonClick} size={20} />
          ) : (
            <SunIcon onClick={onSunClick} size={20} />
          )}
        </Circle>

        <Button
          type="primary"
          onClick={() => window.open('http://env-2466098.jcloud-ver-jpe.ik-server.com:8501/', '_blank')}
          style={{
            backgroundColor: '#0A3861',
            borderColor: '#0A3861',
            height: '40px',
            borderRadius: '6px',
            fontWeight: 500,
            boxShadow: 'none'
          }}
        >
          Chatbot
        </Button>
        <Button
          type="default"
          onClick={() => window.open('http://env-2466098.jcloud-ver-jpe.ik-server.com:8502/', '_blank')}
          style={{
            borderColor: '#0A3861',
            color: '#0A3861',
            height: '40px',
            borderRadius: '6px',
            fontWeight: 500
          }}
        >
          Audio
        </Button>

        <User />
      </Space>
    </div>
  );
};

export default RightToolBar;

