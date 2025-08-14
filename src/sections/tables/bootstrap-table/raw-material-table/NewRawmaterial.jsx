
import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import './RawMaterial.css';

export default function NewRawMaterial() {
  const [form, setForm] = useState({
    RawMaterial_ID: '',
    Product_ID: '',
    RawMaterial_Name: '',
    unit_of_Measure: '',
    Stock_Quantity: '',
    SupplierId: ''
  });
  const [products, setProducts] = useState([]);
  React.useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);
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
    const rawMaterialData = {
      RawMaterial_ID: form.RawMaterial_ID,
      Product_ID: form.Product_ID,
      RawMaterial_Name: form.RawMaterial_Name,
      unit_of_Measure: form.unit_of_Measure,
      Stock_Quantity: form.Stock_Quantity ? parseInt(form.Stock_Quantity, 10) : undefined,
      SupplierId: form.SupplierId
    };
    try {
      const res = await fetch('http://localhost:8000/raw-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rawMaterialData)
      });
      const text = await res.text();
      console.log('Raw response:', text);
      if (res.ok) {
        navigate('/tables/bootstrap-table/raw-material-table');
      } else {
        alert('Failed to submit raw material data');
        console.error('Backend error:', text);
      }
    } catch (err) {
      alert('Error submitting raw material data');
      console.error('Network or JS error:', err);
    }
    };
const  handleCancel =() => {
  navigate('/tables/bootstrap-table/raw-material-table');
}

  return (
    <div className="rawmaterial-bg">
      <MainCard
        title={
          <span className="rawmaterial-title">
            Add New RawMaterial
            <button onClick={handleCancel} className="rawmaterial-cancel">✖</button>
          </span>
        }
        className="rawmaterial-card"
      >
        <form onSubmit={handleSubmit}>
          <div className="rawmaterial-row">
            <div className="rawmaterial-col">
              <label>RawMaterial_ID</label>
              <input name="RawMaterial_ID" value={form.RawMaterial_ID} onChange={handleChange} className="rawmaterial-input" />
            </div>
            <div className="rawmaterial-col">
              <label>Product_ID</label>
              <select name="Product_ID" value={form.Product_ID} onChange={handleChange} className="rawmaterial-input">
                <option value=""></option>
                {products.map(product => (
                  <option key={product.ProductID} value={product.ProductID}>
                    {product.ProductID}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="rawmaterial-row">
            <div className="rawmaterial-col">
              <label>RawMaterial_Name</label>
              <input name="RawMaterial_Name" value={form.RawMaterial_Name} onChange={handleChange} className="rawmaterial-input" />
            </div>
            <div className="rawmaterial-col">
              <label>unit_of_Measure</label>
              <input name="unit_of_Measure" value={form.unit_of_Measure} onChange={handleChange} className="rawmaterial-input" />
            </div>
          </div>
          <div className="rawmaterial-row">
            <div className="rawmaterial-col">
              <label>Stock_Quantity</label>
              <input name="Stock_Quantity" value={form.Stock_Quantity} onChange={handleChange} type="number" className="rawmaterial-input" />
            </div>
            <div className="rawmaterial-col">
              <label>SupplierId</label>
              <input name="SupplierId" value={form.SupplierId} onChange={handleChange} className="rawmaterial-input" />
            </div>
          </div>
          <br /><br />
          <button type="submit" className="rawmaterial-submit">Submit</button>
        </form>
      </MainCard>
    </div>
  );
}

