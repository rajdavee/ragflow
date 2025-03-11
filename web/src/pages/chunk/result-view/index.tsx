import ChunkedResultPanel from '../chunked-result-panel';

export default function ResultView() {
  return (
    <section className="flex chunkPage">
      <div className="flex-1" style={{
        borderRight: '1px solid rgba(10, 56, 97, 0.15)'
      }}>xxx</div>
      <div className="flex-1">
        <ChunkedResultPanel></ChunkedResultPanel>
      </div>
    </section>
  );
}
