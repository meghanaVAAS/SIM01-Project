// ==============================|| NEW ORDER PAGE ||============================== //

import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewOrder() {
  const [form, setForm] = useState({
    OrderId: '',
    ProductId: '',
    QuantityOrdered: '',
    OrderDate: '',
    DeliveryDeadline: '',
    CustomerName: ''
   
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
      OrderId: form.OrderId,
      ProductId: form.ProductId,
      QuantityOrdered: form.QuantityOrdered ? parseInt(form.QuantityOrdered, 10) : undefined,
      OrderDate: form.OrderDate || undefined,
      DeliveryDeadline: form.DeliveryDeadline || undefined,
      CustomerName: form.CustomerName || undefined,
    };
    if (form.OrderId) orderData.OrderId = form.OrderId;
    if (form.ProductId) orderData.ProductId = form.ProductId; 
    if (form.QuantityOrdered) orderData.QuantityOrdered = form.QuantityOrdered;
    if (form.OrderDate) orderData.OrderDate = form.OrderDate;
    if (form.DeliveryDeadline) orderData.DeliveryDeadline = form.DeliveryDeadline;
    if (form.CustomerName) orderData.CustomerName = form.CustomerName;
   
    try {
      const res = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        // Optionally, you can show a success message
        navigate('/tables/bootstrap-table/orders-table');
      } else {
        alert('Failed to submit order');
      }
    } catch (err) {
      alert('Error submitting order');
    }
  };

 const handleCancel = () => {
  navigate('/tables/bootstrap-table/orders-table')
 }

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MainCard title={<span style={{ color: '#333',fontWeight:"bold" ,fontSize:"18px"}}>Add New Order <button onClick={handleCancel}   style={{marginLeft:"500px", fontSize:"23px",marginTop:"-60px",border:"none"}}>✖</button></span>  }   style={{ background: '#fff', color: '#333', width: '400px' }}> 

        <form onSubmit={handleSubmit}>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Order_Id</label>
              <input name="OrderId" value={form.OrderId} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Product_Id</label>
              <input name="ProductId" value={form.ProductId} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Quantity_Ordered</label>
              <input name="QuantityOrdered" value={form.QuantityOrdered} onChange={handleChange} type="number" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>OrderDate</label>
              <input name="OrderDate" value={form.OrderDate} onChange={handleChange} type="date" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Delivery_Deadline</label>
              <input name="DeliveryDeadline" value={form.DeliveryDeadline} onChange={handleChange} placeholder="Delivery Deadline" type="date" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Customer_Name</label>
              <input name="CustomerName" value={form.CustomerName} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#444', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Submit Order</button>
        </form>
      </MainCard>
    </div>
  );
}

