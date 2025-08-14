import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Purchase.css';

export default function NewOrder() {
  const [form, setForm] = useState({
    PurchaseOrder: '',
    SalesId: '',
    Date: '',
    DeliveryDate: '',
    Status: '',
    TotalAmount:''
   
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data for backend
    // Convert empty strings to null for optional fields, and ensure TotalAmount is an integer
    // Only include fields that are not empty
    const orderData = {
      PurchaseOrder: form.OrderId,
      SalesId: form.ProductId,
      Date: form.Date,
      DeliveryDate: form.DeliveryDate,
      Status: form.Status,
      TotalAmount:form.TotalAmount
    };
    if (form.PurchaseOrder) orderData.PurchaseOrder = form.PurchaseOrder;
    if (form.SalesId) orderData.SalesId = form.SalesId; 
    if (form.Date) orderData.Date = form.Date;
    if (form.DeliveryDate) orderData.DeliveryDate = form.DeliveryDate;
    if (form.Status) orderData.Status = form.Status;
   
    try {
      const res = await fetch('http://localhost:8000/purchase-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        // Optionally, you can show a success message
        navigate('/tables/bootstrap-table/purchase-table');
      } else {
        alert('Failed to submit order');
      }
    } catch (err) {
      alert('Error submitting order');
    }
  };

 const handleCancel = () => {
  navigate('/tables/bootstrap-table/purchase-table')
 }

  return (
    <div className="purchase-bg">
      <MainCard
        title={
          <span className="purchase-title">
            Add New Order
            <button onClick={handleCancel} className="purchase-cancel">✖</button>
          </span>
        }
        className="purchase-card"
      >
        <form onSubmit={handleSubmit}>
          <div className="purchase-row">
            <div className="purchase-col">
              <label>Purchase_Order</label>
              <input name="PurchaseOrder" value={form.PurchaseOrder} onChange={handleChange} className="purchase-input" />
            </div>
            <div className="purchase-col">
              <label>Sales_Id</label>
              <input name="SalesId" value={form.SalesId} onChange={handleChange} className="purchase-input" />
            </div>
          </div>
          <div className="purchase-row">
            <div className="purchase-col">
              <label>Date</label>
              <input name="Date" value={form.Date} onChange={handleChange} type="number" className="purchase-input" />
            </div>
            <div className="purchase-col">
              <label>Delivery_Date</label>
              <input name="DeliveryDate" value={form.DeliveryDate} onChange={handleChange} type="date" className="purchase-input" />
            </div>
          </div>
          <div className="purchase-row">
            <div className="purchase-col">
              <label>Status</label>
              <input name="Status" value={form.Status} onChange={handleChange} placeholder="Delivery Deadline" type="date" className="purchase-input" />
            </div>
            <div className="purchase-col">
              <label>Total_Amount</label>
              <input name="TotalAmount" value={form.TotalAmount} onChange={handleChange} className="purchase-input" />
            </div>
          </div>
          <button type="submit" className="purchase-submit">Submit Order</button>
        </form>
      </MainCard>
    </div>
  );
}

