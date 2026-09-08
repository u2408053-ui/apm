import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";

function Dashboard() {

  const [student, setStudent] = useState(null);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const loggedInStudent = localStorage.getItem("loggedInStudent");

    if (!loggedInStudent) {
      navigate("/login");
      return;
    }

    setStudent(JSON.parse(loggedInStudent));

    fetch("/data/activities.json")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error("Error loading activities:", error);
      });

  }, [navigate]);


  if (!student) {
    return (
      <div className="loading-screen">
        Loading dashboard...
      </div>
    );
  }


  // Calculate total approved points
  const totalPoints = activities.reduce(
    (total, activity) => total + activity.pointsApproved,
    0
  );


  const remainingPoints = Math.max(
    student.targetPoints - totalPoints,
    0
  );


  const progressPercentage = Math.min(
    (totalPoints / student.targetPoints) * 100,
    100
  );


  // Get student's activities
  const studentActivities = activities.filter(
    (activity) => activity.studentUid === student.uid
  );


  // Get recent activities
  const recentActivities = [...studentActivities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);


  // Category-wise points
  const categoryPoints = {};

  studentActivities.forEach((activity) => {

    if (!categoryPoints[activity.category]) {
      categoryPoints[activity.category] = 0;
    }

    categoryPoints[activity.category] += activity.pointsApproved;

  });


  const handleViewActivity = (id) => {
    navigate(`/activity/${id}`);
  };


  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {/* Top Header */}

        <header className="top-header">

          <div>
            <h1>Dashboard</h1>
            <p>Track and manage your activity points.</p>
          </div>

          <div className="student-mini-profile">

            <div className="student-avatar">
              {student.name.charAt(0)}
            </div>

            <div>
              <strong>{student.name}</strong>
              <span>{student.uid}</span>
            </div>

          </div>

        </header>


        {/* Welcome Banner */}

        <section className="welcome-banner">

          <div>

            <p className="welcome-small">
              Welcome back 👋
            </p>

            <h2>
              Hello, {student.name.split(" ")[0]}! 💗
            </h2>

            <p>
              Keep participating in activities and reach your
              activity points target.
            </p>

          </div>

          <div className="banner-decoration">
            ✨
          </div>

        </section>


        {/* Statistics */}

        <section className="stats-grid">

          <StatCard
            icon="⭐"
            title="Points Earned"
            value={totalPoints}
            subtitle="Approved points"
          />

          <StatCard
            icon="🎯"
            title="Target Points"
            value={student.targetPoints}
            subtitle="Required points"
          />

          <StatCard
            icon="📌"
            title="Remaining"
            value={remainingPoints}
            subtitle="Points to reach target"
          />

          <StatCard
            icon="📋"
            title="Activities"
            value={studentActivities.length}
            subtitle="Activities submitted"
          />

        </section>


        {/* Progress Section */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Points Progress</h2>
              <p>Your progress towards the target</p>
            </div>

            <strong>
              {Math.round(progressPercentage)}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>

          </div>

          <div className="progress-labels">
            <span>{totalPoints} points earned</span>
            <span>{student.targetPoints} target</span>
          </div>

        </section>


        {/* Bottom Grid */}

        <div className="dashboard-grid">


          {/* Recent Activities */}

          <section className="dashboard-section recent-section">

            <div className="section-header">

              <div>
                <h2>Recent Activities</h2>
                <p>Your latest submissions</p>
              </div>

              <button
                className="text-button"
                onClick={() => navigate("/activities")}
              >
                View All →
              </button>

            </div>


            <div className="activity-list">

              {recentActivities.length > 0 ? (

                recentActivities.map((activity) => (

                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onView={handleViewActivity}
                  />

                ))

              ) : (

                <div className="empty-state">
                  No activities found.
                </div>

              )}

            </div>

          </section>


          {/* Category Summary */}

          <section className="dashboard-section category-section">

            <div className="section-header">

              <div>
                <h2>Points by Category</h2>
                <p>Your activity distribution</p>
              </div>

            </div>


            <div className="category-list">

              {Object.entries(categoryPoints).map(
                ([category, points]) => (

                  <div
                    className="category-row"
                    key={category}
                  >

                    <div className="category-name">

                      <span className="category-dot"></span>

                      <span>{category}</span>

                    </div>

                    <strong>{points} pts</strong>

                  </div>

                )
              )}

            </div>

          </section>

        </div>

      </main>

    </div>

  );
}

export default Dashboard;