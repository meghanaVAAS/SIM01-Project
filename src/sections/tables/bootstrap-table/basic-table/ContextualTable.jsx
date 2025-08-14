
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';

// ==============================||  PRODUCTS TABLE ||============================== //

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
  const [rawMaterials, setRawMaterials] = useState([]);
    const [formData, setFormData] = useState({
      ProductID:'',
      ProductName: '',
      Category: '',
      StockQuantity: '',
      UnitPrice: '',
    });
  const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
      ProductID: '',
      ProductName: '',
      Category: '',
      StockQuantity:'',
      UnitPrice: '',
    });
  const [search, setSearch] = useState('');

  const handleAddClick = () => {
    setShowInsertRow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert ProductID to uppercase
    if (name === 'ProductID') {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding a new product
    const handleSave = () => {
    const { ProductID, ProductName, Category, StockQuantity, UnitPrice } = formData;
    if (ProductID && ProductName && Category && StockQuantity && UnitPrice) {
      fetch('http://localhost:8000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ProductID,
          ProductName,
          Category,
          StockQuantity: parseInt(StockQuantity, 10),
          UnitPrice: parseFloat(UnitPrice),
        }),
      })
        .then(async res => {
          if (!res.ok) {
            const errorText = await res.text();
            console.error('Backend error:', errorText);
            throw new Error(errorText);
          }
          return res.json();
        })
        .then(newProduct => {
          setData(prev => [...prev, newProduct]);
          setFormData({ ProductID: '', ProductName: '', Category: '', StockQuantity: '', UnitPrice: '' });
          setShowInsertRow(false);
        })
        .catch(err => {
          alert('Failed to save product!');
          console.error('Failed to save product:', err);
        });
    } else {
      alert('Please fill in all fields.');
    }
  };
  const handleCancel = () => {
  setFormData({ ProductID:'', ProductName: '', Category: '', StockQuantity: '', UnitPrice: '' });
  setShowInsertRow(false);
  };


  const handleEdit = (id) => {
    const row = data.find((item) => item.ProductID === id);
    setEditForm({
      ProductID: row.ProductID,
      ProductName: row.ProductName,
      Category: row.Category,
      StockQuantity: row.StockQuantity,
      UnitPrice: row.UnitPrice,
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
        Category: editForm.Category,
        StockQuantity: parseInt(editForm.StockQuantity, 10),
        UnitPrice: parseFloat(editForm.UnitPrice),
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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRawMaterials, setShowRawMaterials] = useState(false);

  const handleProductClick = (row) => {
    setSelectedProduct(row);
    setShowRawMaterials(false);
  };

  const handleBack = () => {
    if (showRawMaterials) {
      setShowRawMaterials(false);
    } else {
      setSelectedProduct(null);
    }
  };

  // Fetch raw materials once
  useEffect(() => {
    fetch('http://localhost:8000/raw-materials')
      .then(res => res.json())
      .then(setRawMaterials)
      .catch(() => setRawMaterials([]));
  }, []);

  return (
    <MainCard>
      {/* Search and Add Row UI always above the table */}
      {!selectedProduct && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{fontWeight:"bold",fontSize:"25px"}}>Products Table</span>
          <input
            type="text"
            placeholder="Search Product Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '220px', marginLeft: '16px' }}
          />
        </div>
      )}
      {selectedProduct ? (
        showRawMaterials ? (
          <>
            <button onClick={handleBack} style={{ marginBottom: '16px', border: '1px solid #ccc', borderRadius: '5px', padding: '6px 16px', background: '#f5f5f5', cursor: 'pointer' }}>← Back to Product</button>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>RawMaterialID</th>
                  <th>RawMaterialName</th>
                  <th>Unit_of_Measure</th>
                  <th>StockQuantity</th>
                  <th>PriceUnit</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.filter(mat => mat.Product_ID === selectedProduct.ProductID).length > 0 ? (
                  rawMaterials.filter(mat => mat.Product_ID === selectedProduct.ProductID).map(mat => (
                    <tr key={mat.RawMaterial_ID}>
                      <td>{mat.RawMaterial_ID}</td>
                      <td>{mat.RawMaterial_Name}</td>
                      <td>{mat.Unit_of_Measure || mat.unit_of_Measure}</td>
                      <td>{mat.Stock_Quantity}</td>
                      <td>{mat.Price_Unit}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{ textAlign: 'center' }}>No raw materials for this product.</td></tr>
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <button onClick={handleBack} style={{ marginBottom: '16px', border: '1px solid #ccc', borderRadius: '5px', padding: '6px 16px', background: '#f5f5f5', cursor: 'pointer' }}>← Back to Product List</button>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>ProductID</th>
                  <th>ProductName</th>
                  <th>Category</th>
                  <th>StockQuantity</th>
                  <th>UnitPrice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ cursor: 'pointer'}} onClick={() => setShowRawMaterials(true)}>{selectedProduct.ProductID}</td>
                  <td>{selectedProduct.ProductName}</td>
                  <td>{selectedProduct.Category}</td>
                  <td>{selectedProduct.StockQuantity}</td>
                  <td>{selectedProduct.UnitPrice}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>ProductID</th>
              <th>ProductName</th>
              <th>Category</th>
              <th>StockQuantity</th>
              <th>UnitPrice</th>
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
                <td><input type="text" name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" /></td>
                <td><input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange} placeholder="Stock Quantity" /></td>
                <td><input type="number" name="UnitPrice" value={formData.UnitPrice} onChange={handleChange} placeholder="Unit Price" /></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={handleSave} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✔</button>
                  <button onClick={handleCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign: 'middle', border: 'none', background: 'none',  padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✖</button>
                </td>
              </tr>
            )}
            {filteredData.map((row) => (
              <tr key={row.ProductID}>
                {editingId === row.ProductID ? (
                  <>
                    <td><input type="text" name="ProductID" value={editForm.ProductID} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} disabled /></td>
                    <td><input type="text" name="ProductName" value={editForm.ProductName} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} disabled /></td>
                    <td><input type="text" name="Category" value={editForm.Category} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} /></td>
                    <td><input type="number" name="StockQuantity" value={editForm.StockQuantity} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
                    <td><input type="number" name="UnitPrice" value={editForm.UnitPrice} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => handleEditSave(row.ProductID)} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✔</button>
                      <button onClick={handleEditCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign:'middle'  ,border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✖</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleProductClick(row)}>{row.ProductID}</td>
                    <td>{row.ProductName}</td>
                    <td>{row.Category}</td>
                    <td>{row.StockQuantity}</td>
                    <td>{row.UnitPrice}</td>
                    <td>
                      <button onClick={e => { e.stopPropagation(); handleEdit(row.ProductID); }} title="Edit" style={{ border: 'none', background: 'none', padding: '2px 6px', marginRight: '2px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>✏</button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(row.ProductID); }} title="Delete" style={{ border: 'none', background: 'none', padding: '2px 6px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>🗑</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MainCard>
  );
}





// import Table from 'react-bootstrap/Table';
// import React, { useState, useEffect } from 'react';
// import MainCard from 'components/MainCard';

// // ==============================||  PRODUCTS TABLE ||============================== //

// export default function ProductTable() {
//   const [data, setData] = useState([]);
//   // Fetch products from backend API
//   useEffect(() => {
//     fetch('http://localhost:8000/products')
//       .then((res) => res.json())
//       .then((products) => {
//         setData(products);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch products:', err);
//       });
//   }, []);
//   const [showInsertRow, setShowInsertRow] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductID:'',
//     ProductName: '',
//     StockQuantity: '',
//     Price: '',
    
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     ProductID: '',
//     ProductName: '',
//     StockQuantity:'',
//     Price: '',
   
//   });
//   const [search, setSearch] = useState('');

//   const handleAddClick = () => {
//     setShowInsertRow(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission for adding a new product
//     const handleSave = () => {
//     const { ProductID, ProductName, StockQuantity, Price } = formData;
//     // Correct validation: checking for non-empty fields
//     if (ProductID && ProductName && StockQuantity && Price) {
//       fetch('http://localhost:8000/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ProductID,
//           ProductName,
//           StockQuantity: parseInt(StockQuantity, 10),
//           Price: parseFloat(Price),
//         }),
//       })
//         .then(async res => {
//           if (!res.ok) {
//             const errorText = await res.text();
//             console.error('Backend error:', errorText);
//             throw new Error(errorText);
//           }
//           return res.json();
//         })
//         .then(newProduct => {
//           setData(prev => [...prev, newProduct]);
//           setFormData({ ProductID: '', ProductName: '', StockQuantity: '', Price: '' });
//           setShowInsertRow(false);
//         })
//         .catch(err => {
//           alert('Failed to save product!');
//           console.error('Failed to save product:', err);
//         });
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };
//   const handleCancel = () => {
//     setFormData({ ProductID:'', ProductName: '', StockQuantity: '', Price: '' });
//     setShowInsertRow(false);
//   };


//   const handleEdit = (id) => {
//     const row = data.find((item) => item.ProductID === id);
//     setEditForm({
//       ProductID: row.ProductID,
//       ProductName: row.ProductName,
//       StockQuantity: row.StockQuantity,
//       Price: row.Price,
//     });
//     setEditingId(id);
//   };

//   const handleEditSave = (id) => {
//     // Send PUT request to backend
//     fetch(`http://localhost:8000/products/${id}`, {
//       method: 'PUT',
//       headers: {
//        'Content-Type': 'application/json',
//        },
//       body: JSON.stringify({
//         ProductID: editForm.ProductID,
//         ProductName: editForm.ProductName,
//         StockQuantity: parseInt(editForm.StockQuantity, 10),
//         Price: parseFloat(editForm.Price),
//       }),
//     })
//       .then((res) => res.json())
//       .then((updatedProduct) => {
//         setData(data.map(item => item.ProductID === id ? updatedProduct : item));
//         setEditingId(null);
//       })
//       .catch((err) => {
//         alert('Failed to update product!');
//         console.error('Failed to update product:', err);
//       });
//   };

//   const handleEditCancel = () => {
//     setEditingId(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       // Send DELETE request to backend
//       fetch(`http://localhost:8000/products/${id}`, {
//         method: 'DELETE',
//       })
//         .then((res) => {
//           if (res.ok) {
//             setData(data.filter(item => item.ProductID !== id));
//           } else {
//             alert('Failed to delete product!');
//           }
//         })
//         .catch((err) => {
//           alert('Failed to delete product!');
//           console.error('Failed to delete product:', err);
//         });
//     }
//   };

//   // Filtered data by ProductName
//   const filteredData = data.filter(row =>
//     (row.ProductName || '').toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <MainCard 
//       title={
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{fontWeight:"bold",color:"#344952",fontSize:"18px"}}>Products Table</span>
//           <input
//             type="text"
//             placeholder="Search Product Name..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             style={{ padding: '6px 12px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '220px', marginLeft: '16px' }}
//           />
//         </div>
//       }
//     >
//       <Table responsive>
//         <thead>
//           <tr>
//             <th>ProductID</th>
//             <th>ProductName</th>
//             <th>StockQuantity</th>
//             <th>Price</th>
//             <th><button style={{ border: '1px solid #e7e7f7ff', background: '#e7e7f7ff', fontSize: '1.2em', cursor: 'pointer',borderRadius:'5px' }} onClick={handleAddClick} title="Add Row">New➕</button></th>
//           </tr>
//         </thead>
//         <tbody>
//           {showInsertRow && (
//             <tr style={{ background: '#f5f5f5' }}>
//               <td>
//                 <input type="text" name="ProductID" value={formData.ProductID} onChange={handleChange} placeholder="Product ID" />
//               </td>
//                <td><input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} placeholder="Product Name" /></td>
//                 <td><input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange} placeholder="Stock Quantity" /></td>
//                 <td><input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" /></td>
//                 <td style={{ textAlign: 'right' }}>
//                   <button onClick={handleSave} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✔</button>
//                   <button onClick={handleCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign: 'middle', border: 'none', background: 'none',  padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none' }}>✖</button>
//                 </td>
//             </tr>
//           )}
//           {filteredData.map((row) => (
//             <tr key={row.ProductID}>
//               {/* <td>{row.ProductID}</td> */}
//               {editingId === row.ProductID ? (
//                 <>
//                   <td><input type="text" name="ProductID" value={editForm.ProductID} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} /></td>
//                   <td><input type="text" name="ProductName" value={editForm.ProductName} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '22px', width:"80px" }} /></td>
//                   <td><input type="number" name="StockQuantity" value={editForm.StockQuantity} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
//                   <td><input type="number" name="Price" value={editForm.Price} onChange={handleEditChange} style={{ padding: '2px 6px', fontSize: '1em', height: '32px', width:"80px" }} /></td>
                  
//                   <td style={{ textAlign: 'right' }}>
//                     <button onClick={() => handleEditSave(row.ProductID)} title="Save" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✔</button>
//                     <button onClick={handleEditCancel} title="Cancel" style={{ display: 'inline-block', verticalAlign:'middle'  ,border: 'none', background: 'none', padding: '2px 8px', fontSize: '1em', cursor: 'pointer', outline: 'none'}}>✖</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{row.ProductID}</td>
//                   <td>{row.ProductName}</td>
//                   <td>{row.StockQuantity}</td>
//                   <td>{row.Price}</td>
//                   <td>
//                     <button onClick={() => handleEdit(row.ProductID)} title="Edit" style={{ border: 'none', background: 'none', padding: '2px 6px', marginRight: '2px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>✏</button>
//                     <button onClick={() => handleDelete(row.ProductID)} title="Delete" style={{ border: 'none', background: 'none', padding: '2px 6px', fontSize: '1.5em', cursor: 'pointer', outline: 'none', }}>🗑</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </MainCard>
//   );
// }
