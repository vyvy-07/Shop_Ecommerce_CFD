import { Button, Modal, Rate, message } from "antd";
import { useState } from "react";
import ButtonItem from "../../components/Button";
import { Input } from "../../components/InputItem";
import { useForm } from "react-hook-form";
import { ListReview } from "../../services/reviewServices";
import { useDispatch } from "react-redux";
import { setOrder } from "../../store/reducers/authReducer";

const ModalReview = ({ idProdcut, idOrder, isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [value, setValue] = useState(0);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (data) => {
    try {
      if (value > 0 && data) {
        const payload = {
          title: data?.title,
          description: data?.description,
          rate: value,
          product: idProdcut,
          order: idOrder,
        };
        const res = await ListReview.postReview(payload);
        const idReview = res?.data?.data?.id;
        const dataReview = res?.data?.data?.id;
        if (idReview) {
          setIsModalOpen(false);
          message.success("Success!");
          dispatch(setOrder(dataReview));
        }
      }
    } catch (error) {
      console.log("error", error);
      message.error("Something went wrong");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        title="Review"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>
            <Rate
              onChange={setValue}
              value={value}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            />
            {/* {value ? <span className="ant-rate-text"></span> : ""} */}
          </span>
          <Input
            label="Title"
            required
            {...register("title", { required: "Please fill in field!" })}
            error={errors?.title?.message || ""}
          />
          <Input
            label="Desc"
            required
            {...register("description", { required: "Please fill in field!" })}
            error={errors?.description?.message || ""}
          />
          <ButtonItem
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
            variant="primary"
          >
            Send
          </ButtonItem>
        </form>
      </Modal>
    </div>
  );
};

export default ModalReview;
