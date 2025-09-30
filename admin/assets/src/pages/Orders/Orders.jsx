import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
          // Sort orders by date descending (latest first)
          const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(sortedOrders);
          console.log(sortedOrders);
        } else {
          toast.error("Error fetching orders");
        }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          const dateObj = new Date(order.date); // Create dateObj inside map for each order

          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel icon" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, idx) => 
                    idx === order.items.length - 1 
                      ? `${item.name} x ${item.quantity}` 
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <div className='order-item-date'>
                <p>Items : {order.items.length}</p>
                <p>Date: {dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString()}</p>
                {/* Or if you want time only: */}
                {/* <p>Date: {dateObj.toLocaleDateString()} {dateObj.toTimeString().split(' ')[0]}</p> */}
              </div>
              <p>Rs. {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
