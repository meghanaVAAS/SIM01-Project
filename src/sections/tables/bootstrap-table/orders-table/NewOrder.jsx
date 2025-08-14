//==============================|| NEW ORDER PAGE ||============================== //

import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import './Order.css';

export default function NewOrder() {
  const [productIds, setProductIds] = useState([]);
  const [showProductList, setShowProductList] = useState(false);
  const [orderIdGenerated, setOrderIdGenerated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [addingMore, setAddingMore] = useState(false);
  const [readyToSave, setReadyToSave] = useState(false);
  // Fetch product IDs on mount
  React.useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        setProductIds(data.map(p => p.ProductID));
      });
  }, []);
  // Get today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    OrderId: '',
    OrderDate: todayStr,
    CustomerName: '',
    ProductID: '',
    QuantityOrdered: '',
  });
  // generate a unique order ID with a mix of uppercase letters and digits after 'ORD-'
  
  // const generateOrderId = () => {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let id = '';
  //   for (let i = 0; i < 6; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return 'ORD-' + id;
  // };


  // const generateOrderId = () =>{
  //   return 'ORD-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  // };

  const generateOrderId = () => {
    const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
    return 'ORD-' + digits;
  };

  // Handler for OrderId input click
  const handleOrderIdClick = () => {
    if (!orderIdGenerated && !form.OrderId) {
      const newId = generateOrderId();
      setForm(prev => ({ ...prev, OrderId: newId }));
      setOrderIdGenerated(true);
    }
  };

  const [orderIdError, setOrderIdError] = useState('');
  const [checkingOrderId, setCheckingOrderId] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    // Prevent manual change of OrderId
    if (name === 'OrderId') return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'OrderId') {
      setOrderIdError('');
      setCheckingOrderId(true);
      if (value) {
        try {
          const res = await fetch(`http://localhost:8000/orders/${value}`);
          if (res.ok) {
            setOrderIdError('This ID already exists, please enter another');
          } else {
            setOrderIdError('');
          }
        } catch {
          setOrderIdError('Error checking Order ID');
        }
      }
      setCheckingOrderId(false);
    }
  };
   
  // On submit: if readyToSave, save and navigate; else show confirm dialog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.OrderId || !form.ProductID || !form.CustomerName) {
      alert('OrderId, ProductID, and CustomerName are required.');
      return;
    }
    if (readyToSave) {
      // Send order in backend format
      const orderData = {
        OrderId: form.OrderId,
        OrderDate: form.OrderDate || '',
        CustomerName: form.CustomerName || '',
        Products: [
          {
            ProductID: form.ProductID,
            QuantityOrdered: form.QuantityOrdered ? parseInt(form.QuantityOrdered, 10) : 0
          }
        ]
      };
      try {
        const res = await fetch('http://localhost:8000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        const text = await res.text();
        if (res.ok) {
          setShowConfirm(false);
          setAddingMore(false);
          setReadyToSave(false);
          navigate('/tables/bootstrap-table/orders-table');
        } else {
          alert('Failed to submit order: ' + text);
        }
      } catch (err) {
        alert('Error submitting order: ' + err.message);
      }
    } else {
      setShowConfirm(true);
    }
  };

 const handleCancel = () => {
  navigate('/tables/bootstrap-table/orders-table')
 }

  // Handler for confirmation dialog
  const handleConfirmNo = async () => {
    setShowConfirm(false);
    setAddingMore(false);
    setReadyToSave(true);
    // Submit order immediately
    const orderData = {
      OrderId: form.OrderId,
      OrderDate: form.OrderDate || '',
      CustomerName: form.CustomerName || '',
      Products: [
        {
          ProductID: form.ProductID,
          QuantityOrdered: form.QuantityOrdered ? parseInt(form.QuantityOrdered, 10) : 0
        }
      ]
    };
    try {
      const res = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        navigate('/tables/bootstrap-table/orders-table');
      } else {
        const text = await res.text();
        alert('Failed to submit order: ' + text);
      }
    } catch (err) {
      alert('Error submitting order: ' + err.message);
    }
  };

  const handleConfirmYes = () => {
    // Save the current product before resetting the form
    const orderData = {
      OrderId: form.OrderId,
      OrderDate: form.OrderDate || '',
      // DeliveryDate: form.DeliveryDate || '',
      CustomerName: form.CustomerName || '',
      Products: [
        {
          ProductID: form.ProductID,
          QuantityOrdered: form.QuantityOrdered ? parseInt(form.QuantityOrdered, 10) : 0
        }
      ]
    };
    fetch('http://localhost:8000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text); });
        }
      })
      .catch(err => {
        alert('Failed to submit order: ' + err.message);
      });
    setShowConfirm(false);
    setAddingMore(true);
    setForm(prev => ({
      ...prev,
      ProductID: '',
      QuantityOrdered: '',
      OrderDate: '',
      // DeliveryDate: ''
      // Keep OrderId and CustomerName
    }));
  };

  return (
    <div className="order-container">
      <MainCard
        title={
          <span className="order-maincard-title">
            Add New Order
            <button className="order-cancel-btn" onClick={handleCancel}>✖</button>
          </span>
        }
      >
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-form-row">
            <div className="order-form-group">
              <label className="order-label">Order_Id</label>
              <input
                className="order-input"
                name="OrderId"
                value={form.OrderId}
                readOnly
                onClick={handleOrderIdClick}
                placeholder=""
              />
              {orderIdError && (
                <div style={{ color: 'red', fontSize: '0.9em', marginTop: '4px' }}>{orderIdError}</div>
              )}
            </div>
            <div className="order-form-group" style={{ position: 'relative' }}>
              <label className="order-label">Product_Id</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <select
                  className="order-input"
                  name="ProductID"
                  value={form.ProductID}
                  onChange={e => {
                    handleChange(e);
                    setShowProductList(false);
                  }}
                  disabled={!!orderIdError || !form.OrderId || checkingOrderId}
                  style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '2em' }}
                >
                  <option value=""></option>
                  {productIds.map(pid => (
                    <option key={pid} value={pid}>{pid}</option>
                  ))}
                </select>
                <button
                  type="button"
                  style={{ position: 'absolute', right: '0.3em', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2em', padding: '2px 6px' }}
                  onClick={() => setShowProductList(v => !v)}
                  aria-label="Show all Product IDs"
                >&#9660;</button>
                {showProductList && (
                  <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', border: '1px solid #ccc', zIndex: 10, maxHeight: '150px', overflowY: 'auto', width: '100%' }}>
                    <ul style={{ margin: 0, padding: '8px', listStyle: 'none' }}>
                      {productIds.map(pid => (
                        <li
                          key={pid}
                          style={{ padding: '4px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                          onClick={() => {
                            setForm(prev => ({ ...prev, ProductID: pid }));
                            setShowProductList(false);
                          }}
                        >{pid}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="order-form-row">
            <div className="order-form-group">
              <label className="order-label">Quantity_Ordered</label>
              <input className="order-input" name="QuantityOrdered" value={form.QuantityOrdered} onChange={handleChange} type="number" />
            </div>
            <div className="order-form-group">
              <label className="order-label">Order_Date</label>
              <input className="order-input" name="OrderDate" value={form.OrderDate} onChange={handleChange} type="date" />
            </div>
          </div>
          <div className="order-form-row">
            {/* <div className="order-form-group">
              <label className="order-label">Delivery_Date</label>
              <input className="order-input" name="DeliveryDate" value={form.DeliveryDate} onChange={handleChange} placeholder="Delivery Date" type="date" />
            </div> */}
            <div className="order-form-group">
              <label className="order-label">Customer_Name</label>
              <input className="order-input" name="CustomerName" value={form.CustomerName} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="order-submit-btn">Submit Order</button>
        </form>
        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="order-confirm-dialog" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
            <div style={{ background: '#fff', padding: '2em', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', minWidth: '300px', textAlign: 'center' }}>
              <div style={{ marginBottom: '1em', fontSize: '1.1em' }}>Do you want to add another product to this order?</div>
              <button style={{ marginRight: '1em', padding: '0.5em 1.5em' }} onClick={handleConfirmYes}>Yes</button>
              <button style={{ padding: '0.5em 1.5em' }} onClick={handleConfirmNo}>No</button>
            </div>
          </div>
        )}
      </MainCard>
    </div>
  );
}



