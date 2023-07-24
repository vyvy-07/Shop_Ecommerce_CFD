import React, { useEffect, useState } from "react";
import { Input } from "../../components/InputItem";
import { addressServices } from "../../services/addressServices";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { Select } from "antd";

const FormCheckout = ({
  discount,
  register,
  setValue,
  handleSubmit,
  control,
  formState: { errors },
}) => {
  const { profile } = useSelector((state) => state.auth);

  const [district, setDistrict] = useState([]);
  const [idDistrict, setIdDistrict] = useState("");
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState("");
  const [ward, setward] = useState("");
  const [idWard, setIdWard] = useState("");

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

  const handleGetWard = (id) => {
    getDataWard(id);
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

  return (
    <div className="col-lg-9">
      <h2 className="checkout-title">Billing Details</h2>
      <div className="row">
        <div className="col-sm-4">
          <Input
            label="Full Name"
            required
            {...register("firstName", {
              required: "Please fill in this field!",
            })}
            error={errors?.firstName?.message || ""}
          />
        </div>
        <div className="col-sm-4">
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
        <div className="col-sm-4">
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
                  setIdWard(null);
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
                  setIdWard(null);
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
        label="Street address *"
        required
        {...register("street", {
          required: "Please fill in this field!",
        })}
        error={errors?.street?.message || ""}
      />
      <label>Order notes (optional)</label>
      <textarea
        className="form-control"
        cols={30}
        rows={4}
        placeholder="Notes about your order, e.g. special notes for delivery"
        defaultValue={""}
      />
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="checkout-create-acc"
        />
        <label className="custom-control-label" htmlFor="checkout-create-acc">
          Create an account?
        </label>
      </div>
    </div>
  );
};

export default FormCheckout;
