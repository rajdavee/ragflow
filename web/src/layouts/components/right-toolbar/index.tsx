import { CircleHelp, MoonIcon, SunIcon } from 'lucide-react';

import React from 'react';

import { Space } from 'antd';

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



const handleDocHelpClick = () => {

  window.open('https://ragflow.io/docs/dev/category/guides', 'target');

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

        <Circle>

          <CircleHelp className="size-4" onClick={handleDocHelpClick} />

        </Circle>

        <User />

      </Space>

    </div>

  );

};



export default RightToolBar;


