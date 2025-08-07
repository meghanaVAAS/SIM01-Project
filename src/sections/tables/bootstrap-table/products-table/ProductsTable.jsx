import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| BASIC TABLE - PRODUCT TABLE ||============================== //

export default function ProductTable() {
  const [data, setData] = useState([]);
  // Fetch products from backend API
  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((products) => {
        setData(products);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      });
  }, []);
  const [showInsertRow, setShowInsertRow] = useState(false);
  const [formData, setFormData] = useState({
    ProductID:'',
    ProductName: '',
    StockQuantity: '',
    Price: '',
    
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    ProductId: '',
    ProductName: '',
    StockQuantity:'',
    Price: '',
   
  });
  const [search, setSearch] = useState('');

  const handleAddClick = () => {
    setShowInsertRow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if ( formData.ProductID  && formData.ProductName  && formData.Price &&  formData.Quantity && formData.Stock) {
      // Send POST request to backend
      fetch('http://localhost:8000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   ProductName: formData.ProductName,
        //   Price: parseFloat(formData.Price),
        //   Quantity: parseInt(formData.Quantity),
        //   Stock: formData.Stock,
        // }),

        body: JSON.stringify({
        ProductID: formData.ProductID,
        ProductName: formData.ProductName,
        StockQuantity: formData.StockQuantity,
        Price: parseFloat(formData.Price),
       
})

      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            console.error('Backend error:', errorText);
            throw new Error(errorText);
          }
          return res.json();
        })
        .then((newProduct) => {
          setData([...data, newProduct]);
          setFormData({ ProductID:'', ProductName: '', Price: '', StockQuantity: '' });
          setShowInsertRow(false);
        })
        .catch((err) => {
          alert('Failed to save product!');
          console.error('Failed to save product:', err);
        });
    } else {
      alert('Please fill in all fields except Stock.');
    }
  };

  const handleCancel = () => {
    setFormData({ ProductID:'', ProductName: '', Price: '', StockQuantity: '' });
    setShowInsertRow(false);
  };


  const handleEdit = (id) => {
    const row = data.find((item) => item.ProductID === id);
    setEditForm({
      ProductID: row.ProductID,
      ProductName: row.ProductName,
      StockQuantity: row.StockQuantity,
      Price: row.Price,
    });
    setEditingId(id);
  };

  const handleEditSave = (id) => {
    // Send PUT request to backend
    fetch(`http://localhost:8000/products/${id}`, {
      method: 'PUT',
      headers: {
       'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        ProductID: editForm.ProductID,
        ProductName: editForm.ProductName,
        StockQuantity: parseInt(editForm.StockQuantity, 10),
        Price: parseFloat(editForm.Price),
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setData(data.map(item => item.ProductID === id ? updatedProduct : item));
        setEditingId(null);
      })
      .catch((err) => {
        alert('Failed to update product!');
        console.error('Failed to update product:', err);
      });
  };




  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      // Send DELETE request to backend
      fetch(`http://localhost:8000/products/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setData(data.filter(item => item.ProductID !== id));
          } else {
            alert('Failed to delete product!');
          }
        })
        .catch((err) => {
          alert('Failed to delete product!');
          console.error('Failed to delete product:', err);
        });
    }
  };

  // Filtered data by ProductName
  const filteredData = data.filter(row =>
    (row.ProductName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainCard 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{fontWeight:"bold",color:"#344952",fontSize:"18px"}}>Product Tabel</span>
          <input
            type="text"
            placeholder="Search Product Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '220px', marginLeft: '16px' }}
          />
        </div>
      }
    >
      <Table responsive>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>ProductName</th>
            <th>StockQuantity</th>
            <th>Price</th>
            <th><button style={{ border: '1px solid #e7e7f7ff', background: '#e7e7f7ff', fontSize: '1.2em', cursor: 'pointer',borderRadius:'5px' }} onClick={handleAddClick} title="Add Row">New➕</button></th>
          </tr>
        </thead>
        <tbody>
          {showInsertRow && (
            <tr style={{ background: '#f5f5f5' }}>
              <td>
                <input type="text" name="ProductID" value={formData.ProductID} onChange={handleChange} placeholder="Product ID" />
              </td>
               <td><input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} placeholder="Product Name" /></td>
                <td><input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange} placeholder="Stock Quantity" /></td>
                <td><input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" /></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={handleSave} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✔</button>
                  <button onClick={handleCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign: 'middle', border: 'none', background: 'none',  padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✖</button>
                </td>
            </tr>
          )}
          {filteredData.map((row) => (
            <tr key={row.ProductID}>
              <td>{row.ProductID}</td>
              {editingId === row.ProductID ? (
                <>
                  <td><input type="text" name="ProductID" value={editForm.ProductID} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} /></td>
                  <td><input type="text" name="ProductName" value={editForm.ProductName} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} /></td>
                  <td><input type="number" name="StockQuantity" value={editForm.StockQuantity} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
                  <td><input type="number" name="Price" value={editForm.Price} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
                  
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => handleEditSave(row.ProductID)} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✔</button>
                    <button onClick={handleEditCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign:'middle'  ,border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✖</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.ProductID}</td>
                  <td>{row.ProductName}</td>
                  <td>{row.StockQuantity}</td>
                  <td>{row.Price}</td>
                  <td>
                    <button onClick={() => handleEdit(row.ProductID)} title="Edit" style={{ border: 'none', background: 'none', padding: '2px 6px', marginRight: '2px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>✏</button>
                    <button onClick={() => handleDelete(row.ProductID)} title="Delete" style={{ border: 'none', background: 'none', padding: '2px 6px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>🗑</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}