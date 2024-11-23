import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react"; 
import emailjs from '@emailjs/browser'; 

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const formRef = useRef<HTMLFormElement>(null); 

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {

      await queryClient.invalidateQueries("validateToken");
      
     
      if (formRef.current) {
        try {
          await emailjs.sendForm(
            'service_2lrdx0o',  
            'template_ggr3lhn',
            formRef.current,    
            'QOfvyOZnyYouJHNyn'
          );
          
      showToast({ message: "Thank you for registering, Confirmation email has been sent to your inbox.", type: "SUCCESS" });
      
        } catch (error) {
          // console.error('Email sending error:', error);
          showToast({ message: "Failed to Register, Please try again!", type: "ERROR" });
        }
      }

      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return  (
    <form
      ref={formRef}
      className="flex flex-col lg:max-w-md sm:max-w-xl mx-auto gap-6 p-4 sm:p-6 lg:p-8 shadow-xl"
      onSubmit={onSubmit}
    >
      <h2 className="lg:text-xl sm:text-2xl text-lg  font-semibold text-center">
        Create an Account
      </h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-lg flex-1 lg:text-lg sm:text-xl">
          First Name
          <input
            className="border rounded w-full py-2 px-3 mt-2 lg:text-sm sm:text-xl"
            placeholder="John"
            {...register("firstName", { required: "This field is required" })}
            autoCapitalize="none"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-lg flex-1 lg:text-lg sm:text-xl">
          Last Name
          <input
            className="border rounded w-full py-2 px-3 mt-2 lg:text-sm sm:text-xl"
            placeholder="Doe"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-lg flex-col lg:text-lg sm:text-xl">
        Email
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          className="border rounded w-full py-2 px-3 mt-2 lg:text-sm sm:text-xl"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <input type="hidden" name="user_email" value={watch("email")} />
      <input type="hidden" name="user_firstname" value={watch("firstName")} />
      <input type="hidden" name="user_lastname" value={watch("lastName")} />

      <label className="text-gray-700 text-lg flex-col lg:text-lg sm:text-xl">
        Password
        <input
          type="password"
          placeholder="********"
          className="border rounded w-full py-2 px-3 mt-2 lg:text-sm sm:text-xl"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-lg flex-col lg:text-lg sm:text-xl">
        Confirm Password
        <input
          type="password"
          placeholder="********"
          className="border rounded w-full py-2 px-3 mt-2 lg:text-sm sm:text-xl"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <div className="flex flex-col justify-between items-center text-center gap-4">
      <span className="text-base sm:text-lg lg:text-sm">
     Already a User?{" "}
      <Link className="underline text-blue-500 text-base sm:text-lg lg:text-sm" to="/sign-in">
        Sign in
      </Link>
    </span>
        <button
          type="submit"
          className="bg-yellow-400 border-2 border-indigo-800 text-black shadow-xl rounded-lg w-full sm:w-auto px-6 py-1 text-base sm:text-lg lg:text-md hover:bg-yellow-300"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};


export default Register;
