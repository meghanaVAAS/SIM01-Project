import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewSales() {
  const [form, setForm] = useState({
    Sales_ID: '',
    Product_ID: '',
    Product_Name: '',
    Quantity_Sold: '',
    Unit_Price: '',
    Sale_Date: '',
    Total_Amount: '' 
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
    const salesdata = {
      Sales_ID: form.Sales_ID,
      Product_ID: form.Product_ID,
      Product_Name: form.Product_Name,
      Quantity_Sold: form.Quantity_Sold ? parseInt(form.Quantity_Sold, 10) : undefined,
      Unit_Price: form.Unit_Price || '',
      Sale_Date: form.Sale_Date || undefined,
      Total_Amount: form.Total_Amount ? parseInt(form.Total_Amount, 10) : undefined
      
    };
    if (form.Sales_ID) salesdata.Sales_ID = form.Sales_ID;
    if (form.Product_ID) salesdata.Product_ID = form.Product_ID;
    if (form.Product_Name) salesdata.Product_Name = form.Product_Name;
    if (form.Quantity_Sold) salesdata.Quantity_Sold = form.Quantity_Sold;
    if (form.Unit_Price) salesdata.Unit_Price = form.Unit_Price;
    if (form.Sale_Date) salesdata.Sale_Date = form.Sale_Date;
    if (form.Total_Amount) salesdata.Total_Amount = form.Total_Amount;
    try {
      const res = await fetch('http://localhost:8000/sales-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salesdata)
      });
      if (res.ok) {
        // Optionally, you can show a success message
        navigate('/tables/bootstrap-table/sales-table');
      } else {
        alert('Failed to submit sales data');
      }
    } catch (err) {
      alert('Error submitting sales data');
    }
    };
    const  handleCancel = ()=>{
      navigate('/tables/bootstrap-table/sales-table')
    }


  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MainCard title={<span style={{ color: '#333',fontWeight:"bold" ,fontSize:"18px"}}>Add New Sales <button onClick={handleCancel} style={{marginLeft:"500px", fontSize:"23px",marginTop:"-60px",border:"none"}}>✖</button></span>  }   style={{ background: '#fff', color: '#333', width: '400px' }}> 

        <form onSubmit={handleSubmit}>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Sales_ID</label>
              <input name="Sales_ID" value={form.Sales_ID} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Product_ID</label>
              <input name="Product_ID" value={form.Product_ID} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Product_Name</label>
              <input name="Product_Name" value={form.Product_Name} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Quantity Sold</label>
              <input name="Quantity_Sold" value={form.Quantity_Sold} onChange={handleChange} type="number" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Unit_Price</label>
              <input name="Unit_Price" value={form.Unit_Price} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Sale_Date</label>
              <input name="Sale_Date" type="date" value={form.Sale_Date} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} />
            </div>
          </div>
          {/* <div>
            <label>Total_Amount</label>
            <input name="Total_Amount" value={form.Total_Amount} onChange={handleChange} type="number" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: 'white', color: 'black' }} /> 
          </div><br /><br /> */}
         
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#444', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Submit</button>
        </form>
      </MainCard>
    </div>
  );
}

