import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';

// Protect Dashboard Route
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <AuthProvider>
      <Router>
        {/* Navbar visible on all pages, gets dark-mode state */}
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <div className={isDark ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-50 text-gray-900 min-h-screen'}>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home isDark={isDark} />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login isDark={isDark} />} />
            <Route path="/signup" element={<Signup isDark={isDark} />} />

            {/* Dashboard (protected) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard isDark={isDark} />
                </PrivateRoute>
              }
            />

            {/* About, Profile */}
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile isDark={isDark} setIsDark={setIsDark} />
              </PrivateRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
