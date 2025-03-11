import FileIcon from '@/components/file-icon';
import HightLightMarkdown from '@/components/highlight-markdown';
import { ImageWithPopover } from '@/components/image';
import PdfDrawer from '@/components/pdf-drawer';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import RetrievalDocuments from '@/components/retrieval-documents';
import SvgIcon from '@/components/svg-icon';
import {
  useFetchKnowledgeList,
  useSelectTestingResult,
} from '@/hooks/knowledge-hooks';
import { useGetPaginationWithRouter } from '@/hooks/logic-hooks';
import { IReference } from '@/interfaces/database/chat';
import {
  Card,
  Divider,
  Flex,
  FloatButton,
  Input,
  Layout,
  List,
  Pagination,
  PaginationProps,
  Popover,
  Skeleton,
  Space,
  Spin,
  Tag,
  Tooltip,
} from 'antd';
import DOMPurify from 'dompurify';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownContent from '../chat/markdown-content';
import { useSendQuestion, useShowMindMapDrawer } from './hooks';
import styles from './index.less';
import MindMapDrawer from './mindmap-drawer';
import SearchSidebar from './sidebar';

const { Content } = Layout;
const { Search } = Input;

const SearchPage = () => {
  const { t } = useTranslation();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { chunks, total } = useSelectTestingResult();
  const { list: knowledgeList } = useFetchKnowledgeList();
  const checkedWithoutEmbeddingIdList = useMemo(() => {
    return checkedList.filter((x) => knowledgeList.some((y) => y.id === x));
  }, [checkedList, knowledgeList]);

  const {
    sendQuestion,
    handleClickRelatedQuestion,
    handleSearchStrChange,
    handleTestChunk,
    setSelectedDocumentIds,
    answer,
    sendingLoading,
    relatedQuestions,
    searchStr,
    loading,
    isFirstRender,
    selectedDocumentIds,
    isSearchStrEmpty,
  } = useSendQuestion(checkedWithoutEmbeddingIdList);
  const { visible, hideModal, documentId, selectedChunk, clickDocumentButton } =
    useClickDrawer();
  const { pagination } = useGetPaginationWithRouter();
  const {
    mindMapVisible,
    hideMindMapModal,
    showMindMapModal,
    mindMapLoading,
    mindMap,
  } = useShowMindMapDrawer(checkedWithoutEmbeddingIdList, searchStr);

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    pagination.onChange?.(pageNumber, pageSize);
    handleTestChunk(selectedDocumentIds, pageNumber, pageSize);
  };

  const InputSearch = (
    <Search
      value={searchStr}
      onChange={handleSearchStrChange}
      placeholder={t('header.search')}
      allowClear
      enterButton
      onSearch={sendQuestion}
      size="large"
      loading={sendingLoading}
      disabled={checkedWithoutEmbeddingIdList.length === 0}
      className={isFirstRender ? styles.globalInput : styles.partialInput}
      style={{
        boxShadow: '0 4px 12px rgba(10, 56, 97, 0.1)'
      }}
    />
  );

  return (
    <>
      <Layout className={styles.searchPage} style={{ background: '#f5f7fa' }}>
        <SearchSidebar
          isFirstRender={isFirstRender}
          checkedList={checkedWithoutEmbeddingIdList}
          setCheckedList={setCheckedList}
        ></SearchSidebar>
        <Layout className={isFirstRender ? styles.mainLayout : ''}>
          <Content>
            {isFirstRender ? (
              <Flex justify="center" className={styles.firstRenderContent}>
                <Flex vertical align="center" gap={'large'}>
                  {InputSearch}
                </Flex>
              </Flex>
            ) : (
              <Flex className={styles.content}>
                <section className={styles.main}>
                  {InputSearch}
                  <Card
                    title={
                      <Flex gap={10} align="center">
                        <img src="/logo.svg" alt="" width={20} />
                        <span style={{ color: '#0A3861', fontWeight: 500 }}>{t('chat.answerTitle')}</span>
                      </Flex>
                    }
                    className={styles.answerWrapper}
                    headStyle={{ backgroundColor: 'rgba(10, 56, 97, 0.08)' }}
                    bodyStyle={{ padding: '16px 20px' }}
                  >
                    {isEmpty(answer) && sendingLoading ? (
                      <Skeleton active />
                    ) : (
                      answer.answer && (
                        <MarkdownContent
                          loading={sendingLoading}
                          content={answer.answer}
                          reference={answer.reference ?? ({} as IReference)}
                          clickDocumentButton={clickDocumentButton}
                        ></MarkdownContent>
                      )
                    )}
                  </Card>
                  <Divider style={{ borderColor: 'rgba(10, 56, 97, 0.15)' }}></Divider>
                  <RetrievalDocuments
                    selectedDocumentIds={selectedDocumentIds}
                    setSelectedDocumentIds={setSelectedDocumentIds}
                    onTesting={handleTestChunk}
                  ></RetrievalDocuments>
                  <Divider style={{ borderColor: 'rgba(10, 56, 97, 0.15)' }}></Divider>
                  <Spin spinning={loading}>
                    {chunks?.length > 0 && (
                      <List
                        dataSource={chunks || []}
                        className={styles.chunks}
                        renderItem={(item) => (
                          <List.Item>
                            <Card
                              className={styles.card}
                              style={{
                                boxShadow: '0 2px 8px rgba(10, 56, 97, 0.06)',
                                border: '1px solid rgba(10, 56, 97, 0.1)',
                              }}
                            >
                              <Space>
                                <ImageWithPopover
                                  id={item.img_id}
                                ></ImageWithPopover>
                                <Flex vertical gap={10}>
                                  <Popover
                                    content={
                                      <div className={styles.popupMarkdown}>
                                        <HightLightMarkdown>
                                          {item.content_with_weight}
                                        </HightLightMarkdown>
                                      </div>
                                    }
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                          `${item.highlight}...`,
                                        ),
                                      }}
                                      className={styles.highlightContent}
                                    ></div>
                                  </Popover>
                                  <Space
                                    className={styles.documentReference}
                                    onClick={() =>
                                      clickDocumentButton(
                                        item.doc_id,
                                        item as any,
                                      )
                                    }
                                  >
                                    <FileIcon
                                      id={item.image_id}
                                      name={item.docnm_kwd}
                                    ></FileIcon>
                                    <span style={{ color: '#0A3861' }}>{item.docnm_kwd}</span>
                                  </Space>
                                </Flex>
                              </Space>
                            </Card>
                          </List.Item>
                        )}
                      />
                    )}
                  </Spin>
                  {relatedQuestions?.length > 0 && (
                    <Card
                      title={<span style={{ color: '#0A3861' }}>{t('chat.relatedQuestion')}</span>}
                      style={{
                        marginTop: '20px',
                        boxShadow: '0 2px 8px rgba(10, 56, 97, 0.08)',
                        border: '1px solid rgba(10, 56, 97, 0.1)',
                      }}
                      headStyle={{ backgroundColor: 'rgba(10, 56, 97, 0.05)' }}
                    >
                      <Flex wrap="wrap" gap={'10px 0'}>
                        {relatedQuestions?.map((x, idx) => (
                          <Tag
                            key={idx}
                            className={styles.tag}
                            onClick={handleClickRelatedQuestion(x)}
                          >
                            {x}
                          </Tag>
                        ))}
                      </Flex>
                    </Card>
                  )}
                  <Divider style={{ borderColor: 'rgba(10, 56, 97, 0.15)' }}></Divider>
                  <Pagination
                    {...pagination}
                    total={total}
                    onChange={onChange}
                    className={styles.pagination}
                    style={{
                      textAlign: 'center',
                      '& .ant-pagination-item-active': {
                        borderColor: '#0A3861',
                        color: '#0A3861'
                      }
                    }}
                  />
                </section>
              </Flex>
            )}
          </Content>
        </Layout>
      </Layout>
      {!isFirstRender &&
        !isSearchStrEmpty &&
        !isEmpty(checkedWithoutEmbeddingIdList) && (
          <Tooltip title={t('chunk.mind')} zIndex={1}>
            <FloatButton
              className={styles.mindMapFloatButton}
              onClick={showMindMapModal}
              icon={
                <SvgIcon name="paper-clip" width={24} height={30}></SvgIcon>
              }
              style={{
                backgroundColor: '#0A3861',
                boxShadow: '0 6px 16px rgba(10, 56, 97, 0.25)',
              }}
            />
          </Tooltip>
        )}
      {visible && (
        <PdfDrawer
          visible={visible}
          hideModal={hideModal}
          documentId={documentId}
          chunk={selectedChunk}
        ></PdfDrawer>
      )}
      {mindMapVisible && (
        <MindMapDrawer
          visible={mindMapVisible}
          hideModal={hideMindMapModal}
          data={mindMap}
          loading={mindMapLoading}
        ></MindMapDrawer>
      )}
    </>
  );
};

export default SearchPage;
