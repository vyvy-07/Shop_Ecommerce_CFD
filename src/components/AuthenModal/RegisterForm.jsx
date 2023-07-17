import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/path";
import CheckedItem from "../Checked";
import { Input } from "../InputItem";
import { message } from "antd";

const RegisterForm = ({ onRegister }) => {
  const [check, setCheck] = useState(false);
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onRegister?.(data);
  };

  return (
    <div
      className="tab-pane fade show active"
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <Input
            label="Your email address"
            required
            {...register("email", {
              required: "Required field",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email address is not valid",
              },
            })}
            error={errors?.email?.message}
          />
        </div>
        <div className="form-group">
          <Input
            label="Your password "
            required
            {...register("password", {
              required: "Required field",
              validate: (value) =>
                value.length >= 6 || "Please at least 6 characters",
            })}
            error={errors?.password?.message}
          />
        </div>
        {/* End .form-group */}
        <div className="form-footer">
          <button
            disabled={!watch("check")}
            style={{ color: !watch("check") && "grey" }}
            type="submit"
            className="btn btn-outline-primary-2"
          >
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </button>

          <CheckedItem
            label="I agree to the "
            onClick={() => {
              return setValue("check", !watch("check"));
            }}
          >
            <Link to={PATHS.PRIVACY}>privacy policy</Link>{" "}
            <span style={{ color: !check && "red" }}>*</span>
          </CheckedItem>
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
            <a href="#" className="btn btn-login  btn-f">
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

export default RegisterForm;
