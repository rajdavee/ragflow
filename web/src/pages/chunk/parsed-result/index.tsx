import ParsedResultPanel from '../parsed-result-panel';

export default function ParsedResult() {
  return (
    <section className="flex chunkPage">
      <div className="flex-1" style={{
        borderRight: '1px solid rgba(10, 56, 97, 0.15)'
      }}></div>
      <ParsedResultPanel></ParsedResultPanel>
    </section>
  );
}
