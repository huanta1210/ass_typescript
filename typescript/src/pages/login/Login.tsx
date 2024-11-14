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
import { useEffect, useState } from "react";
import LogOut from "./LogOut";
import { CheckUserLogin } from "../../interface/Auth";

const authSchema = z.object({
  email: z.string().email().min(3).max(255).trim(),
  password: z.string().min(6).max(255).trim(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
  });
  const naviagte = useNavigate();
  const [checkLogin, setCheckLogin] = useState<CheckUserLogin | null>(null);
  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      setCheckLogin(user);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data: Auth) => {
    try {
      const res = await instance.post("/login", data);

      if (!res) {
        toast.error("Đăng nhập không thành công");
      } else {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Đăng nhập thành công", {
          autoClose: 500,
        });
      }

      if (res.data.user.role !== "admin") {
        setTimeout(() => {
          naviagte("/");
        }, 500);
      } else {
        setTimeout(() => {
          naviagte("/admin/products");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Tài khoản mật khẩu không chính xác", {
        autoClose: 200,
      });
    }
  };
  return (
    <>
      <header>
        {" "}
        <Header />
      </header>
      <main className="mx-96 main-login">
        {checkLogin ? (
          <div className="flex mb-20">
            <section>
              <h2 className="text-xl font-bold mt-5">Account Page</h2>
              <p className="text-sm font-semibold py-3 mb-3">
                Hello! {checkLogin.name}
              </p>
              <div>
                <Link
                  className="text-sm text-gray-600 hover:text-red-400"
                  to=""
                >
                  Account Infomation
                </Link>
              </div>
              <div className="py-2">
                <Link
                  className="text-sm text-gray-600 hover:text-red-400"
                  to="/your-order"
                >
                  Your Order
                </Link>
              </div>
              <div>
                <Link
                  className="text-sm text-gray-600 hover:text-red-400"
                  to=""
                >
                  Forgot Password
                </Link>
              </div>
              <div className="mt-2">
                <LogOut />
              </div>
            </section>
            <section className="ml-32">
              <h2 className="text-xl text-gray-600 mt-5">Account Infomation</h2>
              <p className="text-sm font-semibold py-3">
                Name:{" "}
                <span className="text-gray-600 text-sm">{checkLogin.name}</span>{" "}
              </p>
              <p className="text-sm font-semibold py-3">
                Email:{" "}
                <span className="text-gray-600 text-sm">
                  {checkLogin.email}
                </span>{" "}
              </p>
            </section>
          </div>
        ) : (
          <>
            {" "}
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
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
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

                  <div className="form-group text-center">
                    <button
                      className="btn-submit border border-black py-3 px-28 text-lg text-white bg-black font-medium hover:bg-white hover:text-black"
                      type="submit"
                    >
                      Login
                    </button>
                    <p className="text-sm text-red-500 my-6">
                      <Link to="/login_recover">Forgot password ?</Link>
                    </p>
                    <p className="text-sm">
                      Do you already have an account? Register{" "}
                      <Link className="text-red-500" to="/register">
                        Here.
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Login;
