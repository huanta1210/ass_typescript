import { useForm } from "react-hook-form";
import { Auth } from "../../interface/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import instance from "../../api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";

const authSchema = z
  .object({
    name: z.string().min(3).max(255).trim(),
    email: z.string().min(3).max(255).trim(),
    password: z.string().min(6).max(255).trim(),
    confirmPassword: z.string().min(6).max(255).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
  });
  const naviagte = useNavigate();
  const onSubmit = async (data: Auth) => {
    try {
      data.role = "member";
      const res = await instance.post("/register", data);
      if (!res) {
        throw new Error("Lấy dữ liêu không thành công");
      }
      toast.success("Đăng kí thành công");
      setTimeout(() => {
        naviagte("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header>
        {" "}
        <Header />
      </header>
      <main className="mx-96 main-login">
        <div className="login flex flex-col items-center justify-center mt-24 mr-12">
          <div className="login-title text-center">
            <h1 className="text-4xl text-black">Login to your account</h1>
            <div className="login-platform mt-6">
              <div className="login-facebook border p-2 bg-blue-800 inline-block mr-6">
                <button className="text-white flex items-center">
                  <i className="ti ti-facebook pr-3 text-lg border-r-2"></i>
                  <span className="mx-4 text-sm">Facebook</span>
                </button>
              </div>

              <div className="login-facebook border p-2 bg-orange-600 inline-block mr-6">
                <button className="text-white flex items-center">
                  <i className="ti ti-google pr-3 text-lg border-r-2"></i>
                  <span className="mx-7 text-sm">Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="login-form my-10">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-8">
                <label
                  className="font-medium text-black text-sm"
                  htmlFor="email"
                >
                  Name:<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full py-2 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                  type="text"
                  placeholder="example@example.com"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <small className="text-red-500">{errors.name.message}</small>
                )}
              </div>
              <div className="form-group mb-8">
                <label
                  className="font-medium text-black text-sm"
                  htmlFor="email"
                >
                  Email:<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full py-2 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                  type="text"
                  placeholder="example@example.com"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>

              <div className="form-group mb-8">
                <label
                  className="font-medium text-black text-sm"
                  htmlFor="password"
                >
                  Password:<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    className="w-full py-2 mt-2 pr-10 rounded-md border-gray-300 border text-base outline-none pl-3 focus:border-lime-600 input-placeholder-sm"
                    placeholder="************"
                    type="password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 mt-1 flex items-center text-base cursor-pointer"
                  >
                    <div className="relative inline-block">
                      <i className="fa-regular fa-eye"></i>
                    </div>
                  </button>
                </div>

                {errors.password && (
                  <small className="text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="form-group mb-8">
                <label
                  className="font-medium text-black text-sm"
                  htmlFor="password"
                >
                  Confirm Password:<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    className="w-full py-2 mt-2 pr-10 rounded-md border-gray-300 border text-base outline-none pl-3 focus:border-lime-600 input-placeholder-sm"
                    placeholder="************"
                    type="password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 mt-1 flex items-center text-base cursor-pointer"
                  >
                    <div className="relative inline-block">
                      <i className="fa-regular fa-eye"></i>
                    </div>
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small className="text-red-500">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </div>

              <div className="form-group text-center">
                <button
                  className="btn-submit border border-black py-3 px-28 text-lg text-white bg-black font-medium hover:bg-white hover:text-black"
                  type="submit"
                >
                  Register
                </button>
                <div className="mt-2">
                  <Link
                    className="text-red-500 font-semibold text-sm"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Register;
