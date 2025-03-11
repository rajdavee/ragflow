import '@js-preview/excel/lib/index.css';
import FileError from '../file-error';
import { useFetchExcel } from '../hooks';

const Excel = ({ filePath }: { filePath: string }) => {
  const { status, containerRef, error } = useFetchExcel(filePath);

  return (
    <div
      id="excel"
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        border: status ? '1px solid rgba(10, 56, 97, 0.1)' : 'none',
        borderRadius: '4px',
        boxShadow: status ? '0 2px 8px rgba(10, 56, 97, 0.05)' : 'none'
      }}
    >
      {status || <FileError>{error}</FileError>}
    </div>
  );
};

export default Excel;
