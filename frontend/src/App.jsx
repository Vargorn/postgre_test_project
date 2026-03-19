import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import StudentList from './components/students/StudentList';
import StudentForm from './components/students/StudentForm';
import StudentDetails from './components/students/StudentDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<StudentForm />} />
              <Route path="/edit/:id" element={<StudentForm />} />
              <Route path="/student/:id" element={<StudentDetails />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;