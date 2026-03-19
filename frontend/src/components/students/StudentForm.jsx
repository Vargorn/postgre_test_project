import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useStudent } from '../../hooks/useStudent';
import { Card, CardBody, CardHeader, CardFooter } from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import './StudentForm.css';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { student, loading, error, createStudent, updateStudent } = useStudent(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        age: student.age?.toString() || '', // Convert number to string for input
      });
    }
  }, [student]);

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Age validation - convert to number for validation
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum)) {
      newErrors.age = 'Age must be a number';
    } else if (!Number.isInteger(ageNum)) {
      newErrors.age = 'Age must be a whole number';
    } else if (ageNum < 1) {
      newErrors.age = 'Age must be at least 1';
    } else if (ageNum > 120) {
      newErrors.age = 'Age must not exceed 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For age field, only allow numbers
    if (name === 'age') {
      // Allow empty string or numbers only
      if (value === '' || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    // Prepare data for submission - convert age to number
    const submitData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      age: parseInt(formData.age, 10), // Convert string to number
    };

    try {
      if (isEditing) {
        await updateStudent(submitData);
      } else {
        await createStudent(submitData);
      }
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save student' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
        <p className="loading-text">Loading student...</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <Card>
        <CardHeader>
          <div className="form-header">
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/')}
            >
              Back
            </Button>
            <h2 className="form-title">
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h2>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="form-body">
            {errors.submit && (
              <div className="submit-error">
                {errors.submit}
              </div>
            )}

            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter student's full name"
              autoFocus
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="student@example.com"
            />

            <Input
              label="Age"
              name="age"
              type="text" // Use text to have better control over input
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
              placeholder="Enter age (1-120)"
              inputMode="numeric"
              pattern="\d*"
            />

            {formData.age && !errors.age && (
              <p className="age-hint">
                Age will be saved as: {parseInt(formData.age, 10)}
              </p>
            )}
          </CardBody>

          <CardFooter>
            <div className="form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                icon={Save}
                loading={submitting}
              >
                {isEditing ? 'Update Student' : 'Create Student'}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default StudentForm;