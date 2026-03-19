import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/api';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [studentsRes, statsRes] = await Promise.all([
        studentService.getAll(),
        studentService.getStatistics()
      ]);
      setStudents(studentsRes.data || []);
      setStats(statsRes.data || null);
      setError(null);
    } catch (err) {
      setError(err.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      await studentService.delete(id);
      await fetchData();
    } catch (err) {
      setError(err.error || 'Failed to delete student');
      throw err;
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    students,
    stats,
    loading,
    error,
    deleteStudent,
    refresh: fetchData,
  };
};