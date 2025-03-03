import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
      localStorage.setItem("authToken", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
