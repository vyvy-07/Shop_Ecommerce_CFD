import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PAYMENTMETHOD } from '../../constant/globalConstant';
import { PATHS } from '../../constant/path';
import { orderServices } from '../../services/orderServices';
import { getCard, updateCouponCard } from '../../store/reducers/cartsReducer';
import { checkout, getOrder } from '../../store/reducers/orderReducer';
import THUNK_STATUS from '../../constant/thunkStatus';

const useCheckout = () => {
  const { cardInfo } = useSelector((state) => state.cart);
  const [currentPaymetMethod, setCurrentPaymetMethod] = useState(
    cardInfo?.paymentMethod || PAYMENTMETHOD.cash
  );
  const navigate = useNavigate();
  const { checkoutStatus } = useSelector((state) => state.order);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { quantity, totalProduct, shipping, subTotal, total, variant } =
    cardInfo || {};
  const [dataCoupon, setDataCoupon] = useState({});

  // Coupon
  const handleAddCoupon = async (coupon) => {
    try {
      const res = await orderServices.getDiscount(coupon);
      const dataCoupon = res?.data?.data;
      if (dataCoupon) {
        const totalDis =
          subTotal -
          (Number(dataCoupon?.value) || 0) +
          (Number(shipping?.price) || 0);
        setDataCoupon(dataCoupon);
        dispatch(
          updateCouponCard({
            ...cardInfo,
            discount: dataCoupon?.value,
            total: totalDis,
          })
        );
      }
    } catch (error) {
      message.error('Coupon is not valid');
      console.log('error', error);
    }
  };
  const handleRemoveCoupon = async (coupon) => {
    if (coupon) {
      dispatch(
        updateCouponCard({
          ...cardInfo,
          discount: 0,
          discountCode: '',
          total: subTotal + (Number(shipping?.price) || 0),
        })
      );
    }
  };

  // formCheckout

  const form = useForm();
  // fill form default is information from profile
  useEffect(() => {
    if (profile?.id) {
      // get profile form authReducer
      const { email, phone, firstName, street, district, province, ward } =
        profile || {};
      // fill in form with form.reset() of RHF
      const typeShip = cardInfo?.shipping?.typeShip;
      form.reset({
        fullName: firstName || '',
        email: email || '',
        phone: phone || '',
        street: street || '',
        district: district || '',
        ward: ward || '',
        province: province || '',
        shipping: {
          typeShip: typeShip || '',
        },
      });
    }
  }, [profile]);
  // useEffect(() => {
  //   if (Object.values(PAYMENTMETHOD).includes(cardInfo?.paymentMethod)) {
  //     setCurrentPaymetMethod(cardInfo?.paymentMethod);
  //   }
  // }, [cardInfo?.paymentMethod]);

  const listProduct = cardInfo?.product?.map((item, index) => {
    return {
      ...item,
      quantity: cardInfo?.quantity[index],
    };
  });

  const onPlaceOrder = () => {
    if (!!!cardInfo?.shipping?.typeShip) {
      message.error('Error: Shipping is not valid');
    } else if (!!!currentPaymetMethod) {
      message.error('Error: Payment is not valid');
    } else {
      // form from RHF
      const checkout = form.handleSubmit(handleCheckOut);
      checkout();
    }
  };

  const handleCheckOut = async (data) => {
    const idProduct = cardInfo?.product?.map((item) => item?.id);

    let payload = {};
    if (data) {
      payload = {
        address: {
          phone: data?.phone || '',
          email: data?.email || '',
          fullName: data?.fullName || '',
          street: data?.street || '',
        },
        shipping,
        variant,
        note: data?.note || '',
        product: idProduct,
        subTotal,
        total,
        quantity,
        totalProduct,
        paymentMethod: currentPaymetMethod || '',
        discount: dataCoupon?.value || 0,
        discountCode: dataCoupon?.code || '',
      };
    }
    try {
      if (idProduct?.length > 0 && checkoutStatus !== THUNK_STATUS.pending) {
        const dataCheckout = await dispatch(checkout(payload)).unwrap();
        if (dataCheckout) {
          message.success('Checkout success!');
          navigate(PATHS.CHECK_SUCCESS + `?id=${dataCheckout?.customer}`);
        }
      } else {
        message.error('You no have product!');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const discountDashboard = {
    ...cardInfo,
    handleAddCoupon,
    handleRemoveCoupon,
  };
  const summary = {
    ...cardInfo,
    listProduct,
    handleSubmit: form.handleSubmit,
    onChangePayment: setCurrentPaymetMethod,
    paymentMethod: currentPaymetMethod,
    currentPaymetMethod,
    onPlaceOrder,
  };
  const formCheckout = {
    ...cardInfo,
    form,
  };

  return {
    summary,
    formCheckout,
    form,
    cardInfo,
    discountDashboard,
  };
};

export default useCheckout;
