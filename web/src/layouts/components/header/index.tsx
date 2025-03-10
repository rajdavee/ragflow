import { ReactComponent as FileIcon } from '@/assets/svg/file-management.svg';
import { ReactComponent as GraphIcon } from '@/assets/svg/graph.svg';
import { ReactComponent as KnowledgeBaseIcon } from '@/assets/svg/knowledge-base.svg';
import { useTranslate } from '@/hooks/common-hooks';
import { useFetchAppConf } from '@/hooks/logic-hooks';
import { useNavigateWithFromState } from '@/hooks/route-hook';
import { MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { Flex, Layout, Radio, Space, theme } from 'antd';
import { MouseEventHandler, useCallback, useMemo } from 'react';
import { useLocation } from 'umi';
import Toolbar from '../right-toolbar';
import { useTheme } from '@/components/theme-provider';
import styles from './index.less';

const { Header } = Layout;

const RagHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigateWithFromState();
  const { pathname } = useLocation();
  const { t } = useTranslate('header');
  const { theme: themeRag } = useTheme();

  const tagsData = useMemo(
    () => [
      { path: '/knowledge', name: t('knowledgeBase'), icon: KnowledgeBaseIcon },
      { path: '/chat', name: t('chat'), icon: MessageOutlined },
      { path: '/search', name: t('search'), icon: SearchOutlined },
      { path: '/flow', name: t('flow'), icon: GraphIcon },
      { path: '/file', name: t('fileManager'), icon: FileIcon },
    ],
    [t],
  );

  const currentPath = useMemo(() => {
    return tagsData.find((x) => pathname.startsWith(x.path))?.name || 'knowledge';
  }, [pathname, tagsData]);

  const handleChange = useCallback(
    (path: string): MouseEventHandler =>
      (e) => {
        e.preventDefault();
        navigate(path);
      },
    [navigate],
  );

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Header
      style={{
        padding: '0 24px',
        background: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <a href={window.location.origin}>
        <Space
          size={12}
          onClick={handleLogoClick}
          className={styles.logoWrapper}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://www.rag.lu/wp-content/uploads/2024/11/logo-rag-lu.png"
            alt="RAG.lu"
            className={styles.appIcon}
            style={{ height: '40px' }}
          />
          <span
            className={styles.appName}
            style={{
              color: '#0A3861',
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
            }}
          >
            RAG.lu
          </span>
        </Space>
      </a>
      <Space size={[0, 8]} wrap>
        <Radio.Group
          defaultValue="a"
          buttonStyle="solid"
          className={themeRag === 'dark' ? styles.radioGroupDark : styles.radioGroup}
          value={currentPath}
          style={{
            backgroundColor: '#F5F7FA',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          {tagsData.map((item, index) => (
            <Radio.Button
              className={`${themeRag === 'dark' ? 'dark' : 'light'} ${index === 0 ? 'first' : ''
                } ${index === tagsData.length - 1 ? 'last' : ''}`}
              value={item.name}
              key={item.name}
              style={{
                border: 'none',
                backgroundColor: item.name === currentPath ? '#0A3861' : 'transparent',
                color: item.name === currentPath ? '#FFFFFF' : '#0A3861',
                borderRadius: '6px',
                padding: '6px 16px',
                transition: 'all 0.3s ease',
                marginRight: '4px',
                fontWeight: 500,
              }}
            >
              <a href={item.path}>
                <Flex
                  align="center"
                  gap={8}
                  onClick={handleChange(item.path)}
                  className="cursor-pointer"
                >
                  <item.icon
                    className={styles.radioButtonIcon}
                    stroke={item.name === currentPath ? '#FFFFFF' : '#0A3861'}
                    style={{ fontSize: '18px' }}
                  />
                  {item.name}
                </Flex>
              </a>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Space>
      <Toolbar />
    </Header>
  );
};

export default RagHeader;