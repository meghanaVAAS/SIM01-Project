import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MainCard title={<span style={{ color: '#333',fontWeight:"bold" ,fontSize:"18px"}}>Add New Order <button onClick={handleCancel}   style={{marginLeft:"500px", fontSize:"23px",marginTop:"-60px",border:"none"}}>✖</button></span>  }   style={{ background: '#fff', color: '#333', width: '400px' }}> 

        <form onSubmit={handleSubmit}>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Purchase_Order</label>
              <input name="PurchaseOrder" value={form.PurchaseOrder} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Sales_Id</label>
              <input name="SalesId" value={form.SalesId} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Date</label>
              <input name="Date" value={form.Date} onChange={handleChange} type="number" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Delivery_Date</label>
              <input name="DeliveryDate" value={form.DeliveryDate} onChange={handleChange} type="date" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Status</label>
              <input name="Status" value={form.Status} onChange={handleChange} placeholder="Delivery Deadline" type="date" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Total_Amount</label>
              <input name="TotalAmount" value={form.TotalAmount} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#444', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Submit Order</button>
        </form>
      </MainCard>
    </div>
  );
}

