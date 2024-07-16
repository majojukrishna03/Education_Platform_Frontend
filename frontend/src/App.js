import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './components/Initialpage';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminHome from './components/AdminHomepage';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CreateCourse from './components/CreateCourse';
import Programs from './components/Programs';
import EnrollmentForm from './components/Enrollment';
import TrackApplication from './components/TrackApplication';
import ApplicationReview from './components/ApplicationReview';
import PaymentPage from './components/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path='/dashboard/track-application' element={<ProtectedRoute element={<TrackApplication />} />} />
        <Route path='/dashboard/track-application/make-payment/:applicationId' element={<ProtectedRoute element={<PaymentPage />} />} />
        <Route path="/programs" element={<ProtectedRoute element={<Programs />} />} />
        <Route path="/enroll/:courseId" element={<ProtectedRoute element={<EnrollmentForm />} />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/admin/dashboard/create-course" element={<ProtectedRoute element={<CreateCourse />} />} />
        <Route path="/admin/dashboard/application-review" element={<ProtectedRoute element={<ApplicationReview />} />} />
      </Routes>
    </Router>
  );
};

export default App;
