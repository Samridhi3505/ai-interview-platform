function getColor(name) {
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="avatar"
      style={{ background: getColor(name || "A") }}
    >
      {initials || "?"}
    </div>
  );
}

export default Avatar;