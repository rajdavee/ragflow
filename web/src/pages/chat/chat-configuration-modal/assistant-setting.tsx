import KnowledgeBaseItem from '@/components/knowledge-base-item';
import { useTranslate } from '@/hooks/common-hooks';
import { useFetchTenantInfo } from '@/hooks/user-setting-hooks';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, message, Select, Switch, Upload } from 'antd';
import classNames from 'classnames';
import { useCallback } from 'react';
import { ISegmentedContentProps } from '../interface';

import styles from './index.less';

const emptyResponseField = ['prompt_config', 'empty_response'];

const AssistantSetting = ({
  show,
  form,
  setHasError,
}: ISegmentedContentProps) => {
  const { t } = useTranslate('chat');
  const { data } = useFetchTenantInfo(true);

  const handleChange = useCallback(() => {
    const kbIds = form.getFieldValue('kb_ids');
    const emptyResponse = form.getFieldValue(emptyResponseField);

    const required =
      emptyResponse && ((Array.isArray(kbIds) && kbIds.length === 0) || !kbIds);

    setHasError(required);
    form.setFields([
      {
        name: emptyResponseField,
        errors: required ? [t('emptyResponseMessage')] : [],
      },
    ]);
  }, [form, setHasError, t]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleTtsChange = useCallback(
    (checked: boolean) => {
      if (checked && !data.tts_id) {
        message.error(`Please set TTS model firstly. 
        Setting >> Model providers >> System model settings`);
        form.setFieldValue(['prompt_config', 'tts'], false);
      }
    },
    [data, form],
  );

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        color: '#0A3861',
      }}
      type="button"
    >
      <PlusOutlined style={{ color: '#0A3861' }} />
      <div style={{ marginTop: 8, color: '#0A3861' }}>{t('upload', { keyPrefix: 'common' })}</div>
    </button>
  );

  return (
    <section
      className={classNames({
        [styles.segmentedHidden]: !show,
      })}
    >
      <Form.Item
        name={'name'}
        label={t('assistantName')}
        rules={[{ required: true, message: t('assistantNameMessage') }]}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Input
          placeholder={t('namePlaceholder')}
          style={{
            borderColor: 'rgba(10, 56, 97, 0.2)',
            borderRadius: '4px',
          }}
        />
      </Form.Item>
      <Form.Item
        name={'description'}
        label={t('description')}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Input
          placeholder={t('descriptionPlaceholder')}
          style={{
            borderColor: 'rgba(10, 56, 97, 0.2)',
            borderRadius: '4px',
          }}
        />
      </Form.Item>
      <Form.Item
        name="icon"
        label={t('assistantAvatar')}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={() => false}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
        >
          {show ? uploadButton : null}
        </Upload>
      </Form.Item>
      <Form.Item
        name={'language'}
        label={t('language')}
        initialValue={'English'}
        tooltip="coming soon"
        style={{ display: 'none' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Select
          options={[
            { value: 'Chinese', label: t('chinese', { keyPrefix: 'common' }) },
            { value: 'English', label: t('english', { keyPrefix: 'common' }) },
          ]}
          style={{
            borderColor: 'rgba(10, 56, 97, 0.2)',
          }}
        />
      </Form.Item>
      <Form.Item
        name={emptyResponseField}
        label={t('emptyResponse')}
        tooltip={t('emptyResponseTip')}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Input
          placeholder=""
          onChange={handleChange}
          style={{
            borderColor: 'rgba(10, 56, 97, 0.2)',
            borderRadius: '4px',
          }}
        />
      </Form.Item>
      <Form.Item
        name={['prompt_config', 'prologue']}
        label={t('setAnOpener')}
        tooltip={t('setAnOpenerTip')}
        initialValue={t('setAnOpenerInitial')}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Input.TextArea
          autoSize={{ minRows: 5 }}
          style={{
            borderColor: 'rgba(10, 56, 97, 0.2)',
            borderRadius: '4px',
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('quote')}
        valuePropName="checked"
        name={['prompt_config', 'quote']}
        tooltip={t('quoteTip')}
        initialValue={true}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Switch
          checkedChildren={t('yes', { keyPrefix: 'common' })}
          unCheckedChildren={t('no', { keyPrefix: 'common' })}
          style={{
            backgroundColor: '#0A3861',
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('keyword')}
        valuePropName="checked"
        name={['prompt_config', 'keyword']}
        tooltip={t('keywordTip')}
        initialValue={false}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Switch
          checkedChildren={t('yes', { keyPrefix: 'common' })}
          unCheckedChildren={t('no', { keyPrefix: 'common' })}
          style={{
            backgroundColor: '#0A3861',
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('tts')}
        valuePropName="checked"
        name={['prompt_config', 'tts']}
        tooltip={t('ttsTip')}
        initialValue={false}
        style={{ marginBottom: '20px' }}
        labelCol={{ style: { color: '#0A3861' } }}
      >
        <Switch
          checkedChildren={t('yes', { keyPrefix: 'common' })}
          unCheckedChildren={t('no', { keyPrefix: 'common' })}
          onChange={handleTtsChange}
          style={{
            backgroundColor: '#0A3861',
          }}
        />
      </Form.Item>
      <KnowledgeBaseItem
        required={false}
        onChange={handleChange}
      ></KnowledgeBaseItem>
    </section>
  );
};

export default AssistantSetting;
