import ChunkedResultPanel from '../chunked-result-panel';
import ParsedResultPanel from '../parsed-result-panel';

export default function ChunkResult() {
  return (
    <section className="flex chunkPage">
      <ParsedResultPanel></ParsedResultPanel>
      <div className="flex-1" style={{
        borderLeft: '1px solid rgba(10, 56, 97, 0.15)',
        boxShadow: 'inset 4px 0 6px -4px rgba(10, 56, 97, 0.05)'
      }}>
        <ChunkedResultPanel></ChunkedResultPanel>
      </div>
    </section>
  );
}
