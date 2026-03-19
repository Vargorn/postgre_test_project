import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Eye, Edit2, Trash2, Mail, Calendar } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
import { Card, CardBody } from '../ui/Card';
import './StudentCard.css';

const StudentCard = ({ student, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatJoinDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
      if (!isValid(date)) return 'Invalid date';
      return format(date, 'MMM d, yyyy');
    } catch (err) {
      return 'Invalid date';
    }
  };

  const getAgeBadgeClass = (age) => {
    if (age < 18) return 'badge-warning';
    if (age > 25) return 'badge-info';
    return 'badge-success';
  };

  return (
    <Card className="student-card">
      <CardBody>
        <div className="student-card-header">
          <div className="student-avatar">
            {student.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="student-info">
            <h3 className="student-name">{student.name || 'Unknown'}</h3>
            {student.age && (
              <span className={`badge ${getAgeBadgeClass(student.age)}`}>
                {student.age} years
              </span>
            )}
          </div>
          <div className="student-menu">
            <button 
              className="menu-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <>
                <div className="menu-backdrop" onClick={() => setShowMenu(false)} />
                <div className="menu-dropdown">
                  <Link 
                    to={`/student/${student.id}`}
                    className="menu-item"
                    onClick={() => setShowMenu(false)}
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  <Link 
                    to={`/edit/${student.id}`}
                    className="menu-item"
                    onClick={() => setShowMenu(false)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </Link>
                  <button
                    className="menu-item menu-item-danger"
                    onClick={() => {
                      onDelete(student.id, student.name);
                      setShowMenu(false);
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="student-details">
          <div className="detail-item">
            <Mail size={16} className="detail-icon" />
            <span className="detail-text">{student.email || 'No email'}</span>
          </div>
          <div className="detail-item">
            <Calendar size={16} className="detail-icon" />
            <span className="detail-text">
              Joined {formatJoinDate(student.created_at)}
            </span>
          </div>
        </div>

        <div className="student-card-footer">
          <Link to={`/student/${student.id}`} className="view-link">
            View Profile →
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default StudentCard;