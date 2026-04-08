export default function QuestionList({ questions, selectedQ, setSelectedQ }) {
  return (
    <div className="sidebar">
      {questions.map(q => (
        <div
          key={q._id}
          className={`q-item ${selectedQ?._id === q._id ? "active" : ""}`}
          onClick={() => setSelectedQ(q)}
        >
          <span>{q.title}</span>
          <span className={`diff ${q.difficulty}`}>
            {q.difficulty}
          </span>
        </div>
      ))}
    </div>
  );
}