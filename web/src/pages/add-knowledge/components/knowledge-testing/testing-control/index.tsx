import Rerank from '@/components/rerank';
import SimilaritySlider from '@/components/similarity-slider';
import { useTranslate } from '@/hooks/common-hooks';
import { useChunkIsTesting } from '@/hooks/knowledge-hooks';
import { Button, Card, Divider, Flex, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib';
import { LabelWordCloud } from './label-word-cloud';

import { UseKnowledgeGraphItem } from '@/components/use-knowledge-graph-item';
import styles from './index.less';

type FieldType = {
  similarity_threshold?: number;
  vector_similarity_weight?: number;
  question: string;
};

interface IProps {
  form: FormInstance;
  handleTesting: () => Promise<any>;
}

const TestingControl = ({ form, handleTesting }: IProps) => {
  const question = Form.useWatch('question', { form, preserve: true });
  const loading = useChunkIsTesting();
  const { t } = useTranslate('knowledgeDetails');

  const buttonDisabled =
    !question || (typeof question === 'string' && question.trim() === '');

  return (
    <section className={styles.testingControlWrapper}>
      <div>
        <b style={{ color: '#0A3861' }}>{t('testing')}</b>
      </div>
      <p style={{ color: '#0A3861', opacity: 0.7 }}>{t('testingDescription')}</p>
      <Divider style={{ borderColor: 'rgba(10, 56, 97, 0.1)' }} />
      <section>
        <Form name="testing" layout="vertical" form={form}>
          <SimilaritySlider isTooltipShown />
          <Rerank />
          <UseKnowledgeGraphItem filedName={['use_kg']} />
          <Card
            size="small"
            title={t('testText')}
            style={{
              borderColor: 'rgba(10, 56, 97, 0.2)',
              borderRadius: '8px'
            }}
          >
            <Form.Item<FieldType>
              name={'question'}
              rules={[{ required: true, message: t('testTextPlaceholder') }]}
            >
              <Input.TextArea
                autoSize={{ minRows: 8 }}
                style={{
                  borderColor: 'rgba(10, 56, 97, 0.2)',
                  borderRadius: '6px'
                }}
              />
            </Form.Item>
            <Flex justify={'end'}>
              <Button
                type="primary"
                size="small"
                onClick={handleTesting}
                disabled={buttonDisabled}
                loading={loading}
                style={{
                  backgroundColor: '#0A3861',
                  borderColor: '#0A3861',
                  borderRadius: '6px',
                  '&:hover': {
                    backgroundColor: '#A8232F',
                    borderColor: '#A8232F'
                  }
                }}
              >
                {t('testingLabel')}
              </Button>
            </Flex>
          </Card>
        </Form>
      </section>
      <LabelWordCloud />
    </section>
  );
};

export default TestingControl;
