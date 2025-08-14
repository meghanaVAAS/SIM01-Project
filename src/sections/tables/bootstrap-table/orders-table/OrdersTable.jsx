import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import './Order.css';

// ==============================|| ORDERS TABLE PAGE ||============================== //

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/orders')
      .then(res => res.json())
      .then(data => {
        // Flatten each order's products into separate rows
        const mapped = [];
        data.forEach(order => {
          if (Array.isArray(order.Products) && order.Products.length > 0) {
            order.Products.forEach(product => {
              mapped.push({
                OrderId: order.OrderId,
                ProductID: product.ProductID, // <-- match backend
                QuantityOrdered: product.QuantityOrdered,
                OrderDate: order.OrderDate || '',
                // ...existing code...
                CustomerName: order.CustomerName || '',
              });
            });
          } else {
            // If no products, show order row with empty product fields
            mapped.push({
              OrderId: order.OrderId,
              ProductID: '',
              QuantityOrdered: '',
              OrderDate: order.OrderDate || '',
              // ...existing code...
              CustomerName: order.CustomerName || '',
            });
          }
        });
        setOrders(mapped);
      })
      .catch(() => setOrders([]));
  }, []);
  const [search, setSearch] = useState("");
  const filteredOrders = orders.filter(order =>
    (order.OrderId || '').toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();
  const handleNewOrderClick = () => {
    navigate('/tables/bootstrap-table/orders-table/new');
  };
  return (
    <MainCard title={
      <div className="order-header-row">
        <span className="order-header-title">Orders</span>
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="order-header-search"
        />
        <button className="order-header-new-btn" onClick={handleNewOrderClick}>New Orders</button>
      </div>
        
      }
    >
      <Table responsive>
        <thead>
          <tr>
            <th>SerialNo</th>
            <th>OrderId</th>
            <th>OrderDate</th>
            <th>CustomerName</th>
            <th>ProductID</th>
            <th>QuantityOrdered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, idx) => (
            <tr key={order.OrderId + '-' + order.ProductID}>
              <td>{idx + 1}</td>
              <td>{order.OrderId}</td>
              <td>{order.OrderDate}</td>
              <td>{order.CustomerName}</td>
              <td>{order.ProductID}</td>
              <td>{order.QuantityOrdered}</td>
              <td>
                <button
                  className="order-table-btn"
                  onClick={() => {
                    navigate(`/tables/bootstrap-table/orders-table/report/${order.OrderId}`);
                  }}
                >
                  View Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}






