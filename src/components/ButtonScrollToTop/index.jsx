import React from "react";
import ButtonItem from "../Button";

const ButonScrollToTop = () => {
  const scrollTotop = (e) => {
    (e) => e.stopPropagation();

    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <ButtonItem id="scroll-top" title="Back to Top" onClick={scrollTotop}>
      <i class="icon-arrow-up"></i>
    </ButtonItem>
  );
};

export default ButonScrollToTop;
