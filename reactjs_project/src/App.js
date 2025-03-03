import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';


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
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:productId" element={<UpdateProduct />} />
        </Routes>
        
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
