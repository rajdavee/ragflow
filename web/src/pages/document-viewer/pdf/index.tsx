import { Authorization } from '@/constants/authorization';
import { getAuthorization } from '@/utils/authorization-util';
import { Skeleton } from 'antd';
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter';
import FileError from '../file-error';
import { useCatchError } from '../hooks';

type PdfLoaderProps = React.ComponentProps<typeof PdfLoader> & {
  httpHeaders?: Record<string, string>;
};

const Loader = PdfLoader as React.ComponentType<PdfLoaderProps>;

interface IProps {
  url: string;
}

const PdfPreviewer = ({ url }: IProps) => {
  const { error } = useCatchError(url);
  const resetHash = () => { };
  const httpHeaders = {
    [Authorization]: getAuthorization(),
  };

  const customSkeletonStyle = {
    background: 'rgba(10, 56, 97, 0.05)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(10, 56, 97, 0.08)'
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f9fa',
      padding: '16px'
    }}>
      <Loader
        url={url}
        httpHeaders={httpHeaders}
        beforeLoad={<Skeleton active paragraph={{ rows: 10 }} style={customSkeletonStyle} />}
        workerSrc="/pdfjs-dist/pdf.worker.min.js"
        errorMessage={<FileError>{error}</FileError>}
        onError={(e) => {
          console.warn(e);
        }}
      >
        {(pdfDocument) => {
          return (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={() => { }}
              onSelectionFinished={() => null}
              highlightTransform={() => {
                return <div></div>;
              }}
              highlights={[]}
            />
          );
        }}
      </Loader>
    </div>
  );
};

export default PdfPreviewer;
