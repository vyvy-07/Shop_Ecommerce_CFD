import { useForm } from "react-hook-form";
import { Input } from "../InputItem";
import ButtonItem from "../Button";
import CheckedItem from "../Checked";
import { useState } from "react";
import { SESSION_STOGARE } from "../../constant/localStogare";

const LoginForm = ({ onLogin }) => {
  const [click, setClick] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      const payload = {
        email: data?.email,
        password: data?.password,
      };
      onLogin?.(data);
      if (click) {
        const { email, password } = data;
        console.log("data :>> ", email);
        sessionStorage.setItem(SESSION_STOGARE.email, email);
        sessionStorage.setItem(SESSION_STOGARE.password, password);
      }
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="signin"
      role="tabpanel"
      aria-labelledby="signin-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <Input
            label="Username or email address "
            required
            {...register("email", {
              required: "Please enter your email!",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter the correct email format!",
              },
            })}
            error={errors?.email?.message || ""}
          />
        </div>
        <div className="form-group">
          <Input
            label="Password "
            required
            type="password"
            {...register("password", {
              required: "Please enter your password!",
            })}
            error={errors?.password?.message || ""}
          />
        </div>

        <div className="form-footer">
          <ButtonItem variant="outline">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </ButtonItem>
          <CheckedItem label="Remember Me" onClick={() => setClick(!click)} />

          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .form-choice */}
    </div>
  );
};

export default LoginForm;
