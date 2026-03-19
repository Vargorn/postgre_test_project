import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { studentService } from '../services/api';

export const useStudent = (id) => {
  const params = useParams();
  const studentId = id || params?.id;
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(!!studentId);
  const [error, setError] = useState(null);

  const fetchStudent = useCallback(async () => {
    if (!studentId) {
      setError('No student ID provided');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getById(studentId);
      setStudent(response.data);
    } catch (err) {
      setError(err.error || 'Failed to fetch student');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const createStudent = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      await studentService.create(data);
    } catch (err) {
      throw new Error(err.error || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStudent = useCallback(async (data) => {
    if (!studentId) return;
    
    try {
      setLoading(true);
      setError(null);
      await studentService.update(studentId, data);
    } catch (err) {
      throw new Error(err.error || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const deleteStudent = useCallback(async () => {
    if (!studentId) return;
    
    try {
      setLoading(true);
      setError(null);
      await studentService.delete(studentId);
    } catch (err) {
      throw new Error(err.error || 'Failed to delete student');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId, fetchStudent]);

  return {
    student,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refresh: fetchStudent,
  };
};