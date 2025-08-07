import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import Table from 'react-bootstrap/Table';

export default function OrderReport() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(() => setOrder(null));
  }, [orderId]);

  if (!order) {
    return (
      <MainCard title="Order Report">
        <div>Loading or order not found.</div>
        <button onClick={() => navigate(-1)} style={{marginTop: '20px'}}>Back</button>
      </MainCard>
    );
  }

  return (
    <MainCard title={`Order Report - ${order.OrderId}`}>
      <Table bordered>
        <tbody>
          <tr><th>OrderId</th><td>{order.OrderId}</td></tr>
          <tr><th>ProductId</th><td>{order.ProductId}</td></tr>
          <tr><th>QuantityOrdered</th><td>{order.QuantityOrdered}</td></tr>
          <tr><th>OrderDate</th><td>{order.OrderDate}</td></tr>
          <tr><th>DeliveryDeadline</th><td>{order.DeliveryDeadline}</td></tr>
          <tr><th>CustomerName</th><td>{order.CustomerName}</td></tr>
        </tbody>
      </Table>
      <button onClick={() => navigate(-1)} style={{marginTop: '20px'}}>Back</button>
    </MainCard>
  );
}
