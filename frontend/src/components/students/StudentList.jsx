import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useStudents } from '../../hooks/useStudents';
import StudentCard from './StudentCard';
import StudentStats from './StudentStats';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import './StudentList.css';

const StudentList = () => {
  const {
    students,
    stats,
    loading,
    error,
    deleteStudent,
    refresh
  } = useStudents();

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteStudent(id);
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
        <p className="loading-text">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-message">{error}</p>
        <Button onClick={refresh} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <h1 className="page-title">Students</h1>
        <Link to="/add">
          <Button icon={Plus}>
            Add Student
          </Button>
        </Link>
      </div>

      <StudentStats stats={stats} />

      <div className="list-meta">
        <p className="student-count">
          {students.length} {students.length === 1 ? 'student' : 'students'} found
        </p>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h2 className="empty-state-title">No students yet</h2>
          <p className="empty-state-description">
            Get started by adding your first student to the system.
          </p>
          <Link to="/add">
            <Button>Add Your First Student</Button>
          </Link>
        </div>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;