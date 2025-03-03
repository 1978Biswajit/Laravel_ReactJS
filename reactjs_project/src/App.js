import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Protected Admin Panel (Only Admins) */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          </ProtectedRoute>
        } />

        {/* Default Redirect to Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
