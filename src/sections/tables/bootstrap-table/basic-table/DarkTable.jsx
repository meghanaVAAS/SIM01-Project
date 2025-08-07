
import Table from 'react-bootstrap/Table';
import MainCard from 'components/MainCard';

// ==============================|| BASIC TABLE - DARK TABLE ||============================== //

export default function DarkTable() {
  return (
    <MainCard
      title="Dark Table"
      subheader={
        <p className="mb-0">
          use class <code>table-dark</code> inside table element
        </p>
      }
    >
      <Table variant="dark" responsive className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
    
        </tbody>
      </Table>
    </MainCard>
  );
}




// import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import MainCard from 'components/MainCard';
// import Button from 'react-bootstrap/Button';

// export default function ProductTable() {
//   const [data, setData] = useState([]);
//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:8000/products')
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//     fetch('http://localhost:8000/raw-materials')
//       .then(res => res.json())
//       .then(setRawMaterials)
//       .catch(console.error);
//   }, []);

//   // Handles clicking the ProductID cell — passes the row object
//   const handleProductClick = (row) => {
//     setSelectedProduct(row);
//   };

//   const handleBack = () => setSelectedProduct(null);

//   const filteredProducts = data.filter(p =>
//     p.ProductName?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <MainCard title="Products Table">
//       {selectedProduct ? (
//         <>
//           <Button variant="secondary" onClick={handleBack} className="mb-3">
//             ← Back to Product List
//           </Button>
//           <Table responsive bordered>
//             <thead>
//               <tr>
//                 <th>RawMaterialID</th>
//                 <th>RawMaterialName</th>
//                 <th>Unit_of_Measure</th>
//                 <th>StockQuantity</th>
//                 <th>PriceUnit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rawMaterials
//                 .filter(mat => mat.Product_ID === selectedProduct.ProductID)
//                 .map(mat => (
//                   <tr key={mat.RawMaterial_ID}>
//                     <td>{mat.RawMaterial_ID}</td>
//                     <td>{mat.RawMaterial_Name}</td>
//                     <td>{mat.Unit_of_Measure || mat.unit_of_Measure}</td>
//                     <td>{mat.Stock_Quantity}</td>
//                     <td>{mat.Price_Unit}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//         </>
//       ) : (
//         <>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Products Table</span>
//             <input
//               type="text"
//               placeholder="Search Product Name..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               style={{
//                 padding: '6px 12px',
//                 borderRadius: '15px',
//                 border: '1px solid #ccc',
//                 minWidth: '220px'
//               }}
//             />
//           </div>
//           <Table responsive hover>
//             <thead>
//               <tr>
//                 <th>ProductID</th>
//                 <th>ProductName</th>
//                 <th>StockQuantity</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map(row => (
//                 <tr key={row.ProductID} className="clickable-row" style={{ cursor: 'pointer' }}>
//                   <td
//                     style={{ color: 'blue' }}
//                     onClick={() => handleProductClick(row)}
//                   >
//                     {row.ProductID}
//                   </td>
//                     {showInsertRow && (
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
          
                  
                  
                  
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </>
//       )}
//     </MainCard>
//   );
// }