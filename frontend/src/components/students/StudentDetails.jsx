import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Calendar,
  User
} from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { useStudent } from '../../hooks/useStudent';
import { Card, CardBody, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import './StudentDetails.css';

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { student, loading, error, deleteStudent } = useStudent(id);

  const handleDelete = async () => {
    if (!student) return;

    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await deleteStudent();
        navigate('/');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';

    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'MMMM d, yyyy');
    } catch (err) {
      console.error('Date formatting error:', err);
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Unknown';

    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (err) {
      console.error('DateTime formatting error:', err);
      return 'Invalid date';
    }
  };

  const getAgeBadgeClass = (age) => {
    if (age < 18) return 'badge-warning';
    if (age > 25) return 'badge-info';
    return 'badge-success';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
        <p className="loading-text">Loading student details...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h2 className="error-title">Error Loading Student</h2>
        <p className="error-message">{error || 'Student not found'}</p>
        <Button onClick={() => navigate('/')} variant="primary">
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Card>
        <CardHeader>
          <div className="details-header">
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/')}
            >
              Back
            </Button>
            <h2 className="details-title">Student Profile</h2>
          </div>
        </CardHeader>

        <CardBody>
          <div className="profile">
            <div className="profile-avatar">
              {student.name?.charAt(0).toUpperCase() || '?'}
            </div>

            <div className="profile-info">
              <div className="profile-name-section">
                <h1 className="profile-name">{student.name || 'Unknown'}</h1>
                {student.age && (
                  <span className={`badge ${getAgeBadgeClass(student.age)}`}>
                    {student.age} years
                  </span>
                )}
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <Mail size={18} className="detail-icon" />
                  <a href={`mailto:${student.email}`} className="detail-link">
                    {student.email || 'No email provided'}
                  </a>
                </div>
                <div className="detail-row">
                  <Calendar size={18} className="detail-icon" />
                  <span>
                    Joined {formatDate(student.created_at)}
                  </span>
                </div>
                <div className="detail-row">
                  <User size={18} className="detail-icon" />
                  <span>Student ID: #{student.id || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="metadata">
            <div className="metadata-item">
              <span className="metadata-label">Created</span>
              <span className="metadata-value">
                {formatDateTime(student.created_at)}
              </span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Last Updated</span>
              <span className="metadata-value">
                {formatDateTime(student.updated_at)}
              </span>
            </div>
          </div>
        </CardBody>

        <CardFooter>
          <div className="details-actions">
            <Link to={`/edit/${student.id}`}>
              <Button variant="outline" icon={Edit2}>
                Edit
              </Button>
            </Link>
            <Button variant="danger" icon={Trash2} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentDetails;