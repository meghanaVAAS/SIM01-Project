import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sales.css';

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
  const [productNameEditable, setProductNameEditable] = useState(false);
    const [productIDs, setProductIDs] = useState([]);
    const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  useEffect(() => {
    // Fetch product IDs and names from backend
    fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((products) => {
        setProductIDs(products.map((p) => ({ id: p.ProductID, name: p.ProductName })));
      })
      .catch((err) => {
        setProductIDs([]);
      });
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
    <div className="sales-container">
      <MainCard
        title={
          <span className="sales-maincard-title">
            Add New Sales
            <button className="sales-cancel-btn" onClick={handleCancel}>✖</button>
          </span>
        }
        style={{ background: '#fff', color: '#333', width: '400px' }}
      >
        <form className="sales-form" onSubmit={handleSubmit}>
          <div className="sales-form-row">
            <div className="sales-form-group">
              <label className="sales-label">Sales_ID</label>
              <input className="sales-input" name="Sales_ID" value={form.Sales_ID} onChange={handleChange} />
            </div>
            <div className="sales-form-group">
              <label className="sales-label">Product_ID</label>
                  <div className="sales-input-dropdown-container">
                    <input
                      className="sales-input sales-input-dropdown"
                      name="Product_ID"
                      value={form.Product_ID}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setProductDropdownOpen((open) => !open)}
                      className="sales-dropdown-btn"
                      tabIndex={-1}
                    >
                      ▼
                    </button>
                  </div>
                  {productDropdownOpen && productIDs.length > 0 && (
                    <div className="sales-dropdown-list">
                      {productIDs.map((prod) => (
                        <div
                          key={prod.id}
                          className="sales-dropdown-list-item"
                          onMouseDown={() => {
                            setForm((prev) => ({ ...prev, Product_ID: prod.id, Product_Name: prod.name }));
                            setProductDropdownOpen(false);
                          }}
                        >
                          {prod.id}
                        </div>
                      ))}
                    </div>
                  )}
            </div>
          </div>
          <div className="sales-form-row">
            <div className="sales-form-group sales-input-dropdown-container">
              <label className="sales-label">Product_Name</label>
              <input
                className="sales-input sales-input-dropdown"
                name="Product_Name"
                value={form.Product_Name}
                onChange={handleChange}
                readOnly={!productNameEditable}
              />
              <button
                type="button"
                onClick={() => setProductNameEditable((edit) => !edit)}
                className="sales-dropdown-btn sales-edit-btn"
                tabIndex={-1}
                title={productNameEditable ? 'Lock' : 'Edit'}
              >
                {productNameEditable ? '🔒' : '✎'}
              </button>
            </div>
            <div className="sales-form-group">
              <label className="sales-label">Quantity Sold</label>
              <input className="sales-input" name="Quantity_Sold" value={form.Quantity_Sold} onChange={handleChange} type="number" />
            </div>
          </div>
          <div className="sales-form-row">
            <div className="sales-form-group">
              <label className="sales-label">Unit_Price</label>
              <input className="sales-input" name="Unit_Price" value={form.Unit_Price} onChange={handleChange} />
            </div>
            <div className="sales-form-group">
              <label className="sales-label">Sale_Date</label>
              <input className="sales-input" name="Sale_Date" type="date" value={form.Sale_Date} onChange={handleChange} />
            </div>
          </div>
          {/* <div>
            <label className="sales-label">Total_Amount</label>
            <input className="sales-input" name="Total_Amount" value={form.Total_Amount} onChange={handleChange} type="number" />
          </div><br /><br /> */}
          <button type="submit" className="sales-submit-btn">Submit</button>
        </form>
      </MainCard>
    </div>
  );
}


