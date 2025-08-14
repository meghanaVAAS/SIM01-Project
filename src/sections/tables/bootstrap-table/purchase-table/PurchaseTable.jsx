import React from 'react';
import MainCard from 'components/MainCard';
import Table from "react-bootstrap/Table";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Purchase.css';

const PurchaseTable = () => {
  const [purchase, setPurchase] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/purchase-table')
      .then((res) => res.json())
      .then(data => {
        const mapped = data.map(pur => ({
          
          Purchase_Order:pur.Purchase_Order,
          Sales_ID: pur.Sales_ID,
          Date: pur.Date,
          Delivery_Date: pur.Delivery_Date,
          Status: pur.Status,
          Total_Amount: pur.Total_Amount
        }));
        setPurchase(mapped);
      })
      .catch(() => setPurchase([]));
  }, []);
  const [search, setSearch] = useState("");
  const filteredPurchases = purchase.filter(pur =>
    (pur.Sales_ID || '').toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();
  const handleNewPurchaseClick = () => {
    navigate('/tables/bootstrap-table/purchase-table/new');
  }
  return (
    <MainCard title={
      <div className="purchase-header">
        <span className="purchase-header-title">Purchases</span>
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="purchase-search"
        />
        <button className="purchase-add-btn" onClick={handleNewPurchaseClick}>Add Purchase</button>
      </div>
    }>
      <Table responsive>
        <thead>
          <tr>
            <th>Purchase Order</th>
            <th>Sales ID</th>
            <th>Date</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Total Amount</th>   
           
            {/* <th>Supplier</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((row) => (
            <tr key={row.Purchase_Order}>
              <td>{row.Purchase_Order}</td>
              <td>{row.Sales_ID}</td>
              <td>{row.Date}</td>
              <td>{row.Delivery_Date}</td>
              <td>{row.Status}</td>
              <td>{row.Total_Amount}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
};
export default PurchaseTable;



