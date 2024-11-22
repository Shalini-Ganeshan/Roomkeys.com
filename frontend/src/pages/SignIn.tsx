import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { showToast } = useAppContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
      showToast({ message: 'Sign in Successful!', type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
      <form 
        className="flex flex-col lg:max-w-md sm:max-w-xl mx-auto gap-6 p-4 sm:p-6 lg:p-8 shadow-xl" 
        onSubmit={onSubmit}
      >
        <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-center">
          Sign In
        </h2>

        <label className="text-gray-700 text-base sm:text-lg lg:text-lg flex flex-col">
          Email
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            className="border rounded w-full py-2 px-3 mt-2 text-base sm:text-lg lg:text-sm"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm sm:text-base lg:text-lg">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-base sm:text-lg lg:text-lg flex flex-col">
          Password
          <input
            type="password"
            placeholder="********"
            className="border rounded w-full py-2 px-3 mt-2 text-base sm:text-lg lg:text-sm"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 sm:text-base lg:text-sm">
              {errors.password.message}
            </span>
          )}
        </label>

        <div className="flex flex-col justify-between items-center text-center gap-4">
          <span className="text-base sm:text-lg lg:text-sm">
            Not Registered?{" "}
            <Link className="underline text-blue-500 text-base sm:text-lg lg:text-sm" to="/register">
              Create an account here
            </Link>
          </span>

          <button
            type="submit"
            className="bg-yellow-400 border-2 border-indigo-800 text-black shadow-xl rounded-lg w-full sm:w-auto px-6 py-1 text-base sm:text-lg lg:text-md hover:bg-yellow-300"
          >
            Login
          </button>
        </div>
      </form>
     
    </>
  );
};

export default SignIn;
