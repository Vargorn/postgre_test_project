import React from 'react';
import { Users, UserPlus, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import './StudentStats.css';

const StatCard = ({ icon: Icon, label, value }) => (
  <Card className="stat-card">
    <CardBody>
      <div className="stat-content">
        <div className="stat-icon-wrapper">
          <Icon size={24} />
        </div>
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
      </div>
    </CardBody>
  </Card>
);

const StudentStats = ({ stats }) => {
  if (!stats || stats.total_students === 0) {
    return null;
  }

  return (
    <div className="stats-grid">
      <StatCard
        icon={Users}
        label="Total Students"
        value={stats.total_students}
      />
      <StatCard
        icon={UserPlus}
        label="Average Age"
        value={stats.average_age}
      />
      <StatCard
        icon={Calendar}
        label="Youngest"
        value={`${stats.min_age} years`}
      />
      <StatCard
        icon={Calendar}
        label="Oldest"
        value={`${stats.max_age} years`}
      />
    </div>
  );
};

export default StudentStats;