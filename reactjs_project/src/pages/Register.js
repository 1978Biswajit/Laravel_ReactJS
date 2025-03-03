import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password is required", minLength: 6 })}
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
