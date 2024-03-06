import queryString from 'query-string';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../constant/path';

const CheckoutSuccess = () => {
  const idOrder = queryString.parse(location.search);
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order <strong>{idOrder?.id}</strong> has been completed. Your
            order details are shown for your personal accont.{' '}
          </p>
          <Link
            to={PATHS.DASHBOARD_ORDERS}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
