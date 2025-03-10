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
        <Circle>
          {theme === 'dark' ? (
            <MoonIcon onClick={onMoonClick} size={20} />
          ) : (
            <SunIcon onClick={onSunClick} size={20} />
          )}
        </Circle>
        
        <Button type="primary" onClick={() => window.open('http://env-2466098.jcloud-ver-jpe.ik-server.com:8501/', '_blank')}>Chatbot</Button>
        <Button type="default" onClick={() => window.open('http://env-2466098.jcloud-ver-jpe.ik-server.com:8502/', '_blank')}>Audio</Button>
        
        <User />
      </Space>
    </div>
  );
};

export default RightToolBar;

