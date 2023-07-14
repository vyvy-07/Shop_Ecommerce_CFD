import React, { useMemo } from "react";
import { styled } from "styled-components";

const Pagination = ({ page, limit = 0, total = 0, onChangePagi }) => {
  const STEP_PAGE = 1;
  // tinh so page can co
  const totalPage = useMemo(() => {
    if (!total || !limit) {
      return 1;
    } //lam tron len de du chua sp
    return Math.ceil(Number(total) / Number(limit) || 1);
  }, [total, limit]);

  const pageList = useMemo(() => {
    let start = page - STEP_PAGE;
    let end = page + STEP_PAGE;

    if (start <= 0) {
      start = 1;
      end = start + STEP_PAGE * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }

    if (end > totalPage) {
      end = totalPage;
      start = end - STEP_PAGE * 2;
      if (start < 1) {
        start = 1;
      }
    }
    const list = [];
    for (let i = start; i < end + 1; i++) {
      list.push(i);
    }
    return list;
  }, [totalPage, page]);

  const onPrev = () => {
    const prePage = page - 1;
    if (prePage > 0) {
      onChangePagi(prePage);
    }
  };
  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage < total) {
      onChangePagi(nextPage);
    }
  };
  const onStart = () => {
    onChangePagi(1);
  };
  const onEnd = () => {
    onChangePagi(totalPage);
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <PagiItem isDisable={page === 1} onClick={onPrev}>
          <span aria-hidden="true">
            <i className="icon-long-arrow-left" />
          </span>
          Pre{" "}
        </PagiItem>
        <PagiItem isDisable={pageList[0] === 1} onClick={onStart}>
          First
        </PagiItem>
        {pageList?.length > 0 &&
          pageList?.map((pageN, index) => {
            return (
              <PagiItem
                key={index}
                onClick={() => {
                  onChangePagi(pageN);
                }}
                isActive={pageN === page}
              >
                {pageN}
              </PagiItem>
            );
          })}

        <li className="page-item-total">of {totalPage}</li>
        <PagiItem
          isDisable={pageList?.[pageList?.length - 1] === totalPage}
          onClick={onEnd}
        >
          Last
        </PagiItem>
        <PagiItem
          isDisable={pageList?.[pageList?.length - 1] === totalPage}
          onClick={onNext}
        >
          Next
          <span aria-hidden="true">
            <i className="icon-long-arrow-right" />
          </span>
        </PagiItem>
      </ul>
    </nav>
  );
};

const PagiItem = ({
  className = "",
  children,
  isActive = false,
  isDisable = false,
  onClick,
  ...props
}) => {
  return (
    <PagiItemWrap
      className={`page-item ${className} ${isActive ? "active" : ""}
    ${isDisable ? "disabled" : ""}
    `}
      onClick={() => (isDisable ? {} : onClick())}
      {...props}
    >
      <a className="page-link" aria-label="Next">
        {children}
      </a>
    </PagiItemWrap>
  );
};
const PagiItemWrap = styled.div`
  margin: 0 10px;
  .page-link {
    &:hover {
      color: #fcb941 !important;
    }
    display: flex;
    gap: 10;
  }
`;
export default Pagination;
