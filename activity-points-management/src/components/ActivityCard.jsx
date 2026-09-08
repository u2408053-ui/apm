function ActivityCard({ activity, onView }) {
  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "status-approved";
    }

    if (status === "Partially Approved") {
      return "status-partial";
    }

    return "status-pending";
  };

  return (
    <div className="activity-card">

      <div className="activity-info">

        <div className="activity-icon">
          {activity.category === "Technical"
            ? "💻"
            : activity.category === "Sports"
            ? "🏆"
            : activity.category === "Cultural"
            ? "🎨"
            : activity.category === "Social Service"
            ? "🤝"
            : activity.category === "Leadership"
            ? "👑"
            : "⭐"}
        </div>

        <div>
          <h4>{activity.title}</h4>

          <p>
            {activity.category} • {activity.date}
          </p>
        </div>

      </div>

      <div className="activity-points">
        <strong>{activity.pointsApproved}</strong>
        <span>points</span>
      </div>

      <div>
        <span className={`status-badge ${getStatusClass(activity.status)}`}>
          {activity.status}
        </span>
      </div>

      <button
        className="view-button"
        onClick={() => onView(activity.id)}
      >
        View
      </button>

    </div>
  );
}

export default ActivityCard;