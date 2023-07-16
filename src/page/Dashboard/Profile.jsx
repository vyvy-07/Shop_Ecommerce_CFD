import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/InputItem";
import ButtonItem from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hook/useQuery";
import { AuthService } from "../../services/authServices";
import { authActions } from "../../store/reducers/authReducer";
import { addressServices } from "../../services/addressServices";
import Select from "../../components/Select";

const Profile = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //const { email, firstName, id } = profile || {};
  useEffect(() => {
    if (profile) {
      for (const field in profile) {
        setValue(field, profile[field]);
      }
    }
  }, [profile]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const newProfile = {
      firstName: data?.firstName,
      lastName: "",
      email: data?.email,
      phone: data?.phone,
      facebookURL: "",
      website: "",
      introduce: "",
    };
    if (data) {
      const res = await AuthService.putProfile(newProfile);
      dispatch(authActions.setProfile(res?.data?.data));
    }
  };

  // const [province, setProvince] = useState([]);
  // useEffect(() => {
  //   const getProvince = async () => {
  //     try {
  //       const results = await addressServices.getProvince();
  //       const dataProvince = results?.data?.results;
  //       const _dataProvince = dataProvince.map((item) => {
  //         return {
  //           ...item,
  //           name: item.province_name,
  //           value: item.province_id,
  //         };
  //       });
  //       setProvince(_dataProvince);
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //     }
  //   };
  //   getProvince();
  // }, [JSON.stringify(province)]);

  // useEffect(() => {
  //   const getDistrict = async () => {
  //     try {
  //       const listDistrict = await addressServices.getDistrict("271");
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //     }
  //   };
  //   getDistrict();
  // }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Full Name"
              required
              {...register("firstName", {
                required: "Please fill in this field!",
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              label="Email address "
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
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Phone number"
              required
              {...register("phone", {
                required: "Please enter your phone!",
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})/,
                  message: "Please enter the correct phone format!",
                },
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              label="Birthday"
              required
              type="date"
              {...register("birthday", {
                required: "Please choose your birthday!",
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {/* <Select
              label="Province/City"
              required
              {...register("select", { required: "vui long chon" })}
              options={province}
            /> */}

            {/*<label>Province/City *</label>
            <div className="select-custom">
              <select
                className="form-control form-select"
                id="city"
                aria-label="Default select example"
              >
                <option selected />
              </select>
            </div>*/}
          </div>
          {/* <div className="col-sm-4">
            <label>District/Town *</label>
            <div className="select-custom">
              <select className="form-control form-select" id="district">
                <option selected />
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <div className="select-custom">
              <select className="form-control form-select" id="ward">
                <option selected />
              </select>
            </div>
          </div> */}
        </div>
        {/* <Input
          label="Street address"
          required
          {...register("street", { required: "Please fill in this field!" })}
          error={errors?.street?.message || ""}
        /> */}
        <Input
          label="Current password (leave blank to leave unchanged)"
          type="password"
          {...register("password")}
        />
        <Input
          label="New password (leave blank to leave unchanged)"
          type="password"
          {...register("newPass")}
        />
        <Input
          label="Confirm new password"
          type="password"
          {...register("Confirm")}
        />
        <ButtonItem type="submit" variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </ButtonItem>
      </form>
    </div>
  );
};

export default Profile;
