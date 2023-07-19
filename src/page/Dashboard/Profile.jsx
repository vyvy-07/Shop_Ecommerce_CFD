import { Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ButtonItem from "../../components/Button";
import { Input } from "../../components/InputItem";
import useQuery from "../../hook/useQuery";
import { addressServices } from "../../services/addressServices";
import { AuthService } from "../../services/authServices";
import { authActions } from "../../store/reducers/authReducer";
import { removeAccents } from "../../utils/format";
import { LOCAL_STOGARE } from "../../constant/localStogare";

const Profile = () => {
  const { profile } = useSelector((state) => state.auth);
  console.log("profile", profile);
  const dispatch = useDispatch();

  const [district, setDistrict] = useState([]);
  const [idDistrict, setIdDistrict] = useState("");
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState("");
  const [ward, setward] = useState("");
  const [idWard, setIdWard] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("data", data);
    console.log(" data?.district", data?.district);
    const newProfile = {
      firstName: data?.firstName,
      lastName: "",
      email: data?.email,
      phone: data?.phone,
      province: data?.province,
      district: data?.district,
      ward: data?.ward,
      birthday: data?.birthday,
      website: "",
      introduce: "",
    };
    if (data) {
      const res = await AuthService.putProfile(newProfile);
      dispatch(authActions.setProfile(res?.data?.data));
    }
  };
  const getDistrict = async (id) => {
    try {
      const res = await addressServices.getDistrict(`?province=${id}`);
      const listDistrict = res?.data?.data?.districts;

      if (listDistrict) {
        const _listDistrict =
          listDistrict?.length > 0 &&
          listDistrict?.map((item) => {
            return {
              ...item,
              label: item?.name,
              value: item?.id,
            };
          });
        setDistrict(_listDistrict);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDataWard = async (id) => {
    try {
      const res = await addressServices.getWard(`?district=${id}`);
      const listWard = res?.data?.data?.wards;
      if (listWard) {
        const _listWard =
          listWard?.length > 0 &&
          listWard?.map((item) => {
            return {
              ...item,
              label: item?.name,
              value: item?.id,
            };
          });
        setward(_listWard);
      }
    } catch (error) {}
  };

  const getProvince = async () => {
    try {
      const results = await addressServices.getProvince();
      const dataProvince = results?.data?.data?.provinces;
      const _dataProvince = dataProvince.map((item) => {
        return {
          ...item,
          label: item.name,
          value: item.id,
        };
      });
      setProvince(_dataProvince);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // const handleGetWard = (id) => {};

  useEffect(() => {
    if (profile) {
      for (const field in profile) {
        setValue(field, profile[field]);
      }
    }
  }, [profile]);

  useEffect(() => {
    getProvince();
    if (profile?.province) {
      setIdProvince(profile?.province);
      getDistrict(profile?.province);
    }
    if (profile?.district) {
      getDataWard(profile.district);
      setIdDistrict(profile.district);
    }
    if (profile?.ward) {
      setIdWard(profile.ward);
    }
  }, [profile]);

  // console.log("profile?.birthday", formatDay(24 / 12 / 2002));
  // // const useEffect =
  // //   (() => {
  // //     const token = localStorage.getItem(LOCAL_STOGARE.token);
  // //     if (token) {
  // //       if (idProvince) {
  // //         getDistrict();
  // //         getDataWard();
  // //       }
  // //     }
  // //   },
  // //   []);
  // useEffect(() => {

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
            <label>Province/city *</label>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                // sending integer instead of string.
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setIdProvince(e);
                    setIdDistrict(null);
                    getDistrict(e);
                  }}
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={province}
                />
              )}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                // sending integer instead of string.
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setIdDistrict(e);
                    handleGetWard(e);
                    getDataWard(e);
                  }}
                  value={idDistrict || null}
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                  options={district}
                  disabled={idProvince ? false : true}
                />
              )}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              render={({ field }) => (
                // sending integer instead of string.
                <Select
                  {...field}
                  onChange={(id) => {
                    field.onChange(id);
                    setIdWard(id);
                  }}
                  value={idWard || null}
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                  options={ward}
                  disabled={idDistrict ? false : true}
                />
              )}
            />
          </div>
        </div>

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
