import moment from 'moment';
import React from 'react';

const TapProductDetail = ({ dataReview, description, shippingReturn }) => {
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="product-desc-link"
            data-toggle="tab"
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="true"
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="product-shipping-link"
            data-toggle="tab"
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected="false"
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="product-review-link"
            data-toggle="tab"
            href="#product-review-tab"
            role="tab"
            aria-controls="product-review-tab"
            aria-selected="false"
          >
            Reviews ({dataReview?.length})
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="product-desc-tab"
          role="tabpanel"
          aria-labelledby="product-desc-link"
        >
          <div className="product-desc-content">
            <h3>Product Information</h3>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="product-shipping-tab"
          role="tabpanel"
          aria-labelledby="product-shipping-link"
        >
          <div className="product-desc-content">
            <div dangerouslySetInnerHTML={{ __html: shippingReturn }}></div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="product-review-tab"
          role="tabpanel"
          aria-labelledby="product-review-link"
        >
          <div className="reviews">
            <h3>Reviews ({dataReview?.length})</h3>

            {dataReview?.length > 0 &&
              dataReview?.map((item, index) => {
                return (
                  <div className="review" key={item?.id || index}>
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <p>{item?.title}</p>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: `${(item?.rate || 0) * 20}%` }}
                            />
                          </div>
                        </div>
                        <span className="review-date">
                          {moment(item?.createdAt).endOf('day').fromNow()}
                        </span>
                      </div>
                      <div className="col">
                        <h4>
                          {item?.rate <= 2
                            ? 'tệ'
                            : item?.rate <= 4
                            ? 'Bình thường'
                            : 'tốt'}
                        </h4>
                        <div className="review-content">
                          <p>{item?.description}</p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (0){' '}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){' '}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapProductDetail;
