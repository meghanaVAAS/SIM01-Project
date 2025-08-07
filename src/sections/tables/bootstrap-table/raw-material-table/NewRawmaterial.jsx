import MainCard from 'components/MainCard';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRawMaterial() {
  const [form, setForm] = useState({
    RawMaterial_ID: '',
    Product_ID: '',
    RawMaterial_Name: '',
    unit_of_Measure: '',
    Stock_Quantity: '',
    Price_Unit: '',
    Supplier: ''
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
    const rawMaterialData = {
      RawMaterial_ID: form.RawMaterial_ID,
      Product_ID: form.Product_ID,
      RawMaterial_Name: form.RawMaterial_Name,
      unit_of_Measure: form.unit_of_Measure,
      Stock_Quantity: form.Stock_Quantity ? parseInt(form.Stock_Quantity, 10) : undefined,
      Price_Unit: form.Price_Unit ? parseFloat(form.Price_Unit) : undefined,
      Supplier: form.Supplier
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
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MainCard title={<span style={{ color: '#333',fontWeight:"bold" ,fontSize:"18px"}}>Add New RawMaterial <button  onClick={handleCancel} style={{marginLeft:"500px", fontSize:"23px",marginTop:"-60px",border:"none"}}>✖</button></span>  }   style={{ background: '#fff', color: '#333', width: '400px' }}> 

        <form onSubmit={handleSubmit}>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>RawMaterial_ID</label>
              <input name="RawMaterial_ID" value={form.RawMaterial_ID} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Product_ID</label>
              <input name="Product_ID" value={form.Product_ID} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>RawMaterial_Name</label>
              <input name="RawMaterial_Name" value={form.RawMaterial_Name} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>unit_of_Measure</label>
              <input name="unit_of_Measure" value={form.unit_of_Measure} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Stock_Quantity</label>
              <input name="Stock_Quantity" value={form.Stock_Quantity} onChange={handleChange} type="number" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Price_Unit</label>
              <input name="Price_Unit" value={form.Price_Unit} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          <div>
            <label>Supplier</label>
            <input name="Supplier" value={form.Supplier} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
          </div>
         
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#444', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Submit</button>
        </form>
      </MainCard>
    </div>
  );
}

