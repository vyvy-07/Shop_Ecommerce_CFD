import { Spin } from "antd";
import React from "react";
import { styled } from "styled-components";
let Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingPage = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default LoadingPage;
