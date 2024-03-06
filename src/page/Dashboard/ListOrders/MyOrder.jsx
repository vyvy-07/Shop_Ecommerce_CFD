import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import LabelOrder from "./LabelOrder";
import ListProduct from "./ListProduct";
import ModalReview from "../ModalReview";
import { useState } from "react";

const MyOrder = ({ listOrder, modal }) => {
  const listOrders = listOrder?.orders;
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  const getItems = (panelStyle) =>
    listOrders?.map((item, index) => {
      return {
        key: index,
        label: <LabelOrder id={item?.id} createdAt={item?.createdAt} />,
        children: <ListProduct {...item} {...modal} />,
        style: panelStyle,
      };
    });

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <>
      <h4>My list ordered:</h4>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
      <ModalReview {...modal} listOrder={listOrder} />
    </>
  );
};

export default MyOrder;
