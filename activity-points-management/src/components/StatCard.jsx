function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h3>{value}</h3>
        <span>{subtitle}</span>
      </div>

    </div>
  );
}

export default StatCard;