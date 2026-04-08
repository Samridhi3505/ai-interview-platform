export default function Filters({ setFilters }) {
  return (
    <div className="filters">

      <select onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}>
        <option value="tech">Tech</option>
        <option value="non-tech">Non-Tech</option>
      </select>

      <select onChange={(e) => setFilters(f => ({ ...f, topic: e.target.value }))}>
        <option value="arrays">Arrays</option>
        <option value="binary">Binary Search</option>
        <option value="trees">Trees</option>
      </select>

      <select onChange={(e) => setFilters(f => ({ ...f, language: e.target.value }))}>
        <option value="javascript">JS</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
      </select>

    </div>
  );
}