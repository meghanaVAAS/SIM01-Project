import React from 'react';
import MainCard from 'components/MainCard';
import Table from "react-bootstrap/Table";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RawMaterialTable = () => {
  const [rawmaterial, setRawmaterial] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/raw-materials')
      .then((res) => res.json())
      .then(data => {
        const mapped = data.map(raw => ({
          RawMaterial_ID: raw.RawMaterial_ID,
          Product_ID: raw.Product_ID,
          RawMaterial_Name: raw.RawMaterial_Name,
          unit_of_Measure: raw.unit_of_Measure,
          Stock_Quantity: raw.Stock_Quantity,
          Price_Unit: raw.Price_Unit,
          Supplier: raw.Supplier
        }));
        setRawmaterial(mapped);
      })
      .catch(() => setRawmaterial([]));
  }, []);
  const [search, setSearch] = useState("");
  const filteredRawMaterials = rawmaterial.filter(raw =>
    (raw.RawMaterial_Name || '').toLowerCase().includes(search.toLowerCase())
    );
  const navigate = useNavigate();
  const handleNewRawMaterialClick = () => {
    navigate('/tables/bootstrap-table/raw-material-table/new');
  }
  return (
       <MainCard title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{fontWeight:"bold",fontSize:"25px"}}>RawMaterials</span>
          <input
            type="text"
            placeholder="Search...."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '5px 10px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '120px', marginLeft: '40px' }}
          />
          <button style={{border:"1px solid grey",backgroundColor:"grey",color:"white",width:"140px", textAlign:"center",borderRadius:"7px",fontSize:"17px"}} onClick={handleNewRawMaterialClick}>Add RawMaterials</button>
        </div>
        
      }
    >
      <Table responsive>
        <thead>
          <tr>
            <th>RawMaterialID</th>
            <th>ProductID</th>
            <th>RawMaterialName</th>
            <th>UnitofMeasure</th>
            <th>StockQuantity</th>
            <th>PriceUnit</th>
            <th>Supplier</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRawMaterials.map((row) => (
            <tr key={row.RawMaterial_ID}>
              <td>{row.RawMaterial_ID}</td>
              <td>{row.Product_ID}</td>
              <td>{row.RawMaterial_Name}</td>
              <td>{row.unit_of_Measure}</td>
              <td>{row.Stock_Quantity}</td>
              <td>{row.Price_Unit}</td>
              <td>{row.Supplier}</td>
              <td>
                <button
                  disabled={Number(row.Stock_Quantity) <= 50}
                  style={{
                    backgroundColor: Number(row.Stock_Quantity) > 50 ? 'green' : 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '3px 8px',
                    minWidth: '90px',
                    cursor: Number(row.Stock_Quantity) > 50 ? 'pointer' : 'not-allowed',
                    opacity: Number(row.Stock_Quantity) > 50 ? 1 : 0.7
                  }}
                >
                  {Number(row.Stock_Quantity) > 50 ? 'Available' : 'Low Stock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
};

export default RawMaterialTable;



// import React, { useState, useEffect } from 'react';
// import MainCard from 'components/MainCard';
// import Table from "react-bootstrap/Table";
// import { useParams } from 'react-router-dom'; // Import from react-router-dom

// const RawMaterialTable = () => {
//   const { productId } = useParams(); // get productId from route params
//   const [rawmaterial, setRawmaterial] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:8000/raw-materials/${productId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRawmaterial(data);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch raw materials:', err);
//       });
//   }, [productId]);

//   return (
//     <MainCard title={`Raw Materials for Product ID: ${productId}`}>
//       <Table responsive>
//         <thead>
//           <tr>
//             <th>RawMaterial ID</th>
//             <th>Product ID</th>
//             <th>RawMaterial Name</th>
//             <th>Unit of Measure</th>
//             <th>Stock Quantity</th>
//             <th>Price Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rawmaterial.length > 0 ? (
//             rawmaterial.map((row) => (
//               <tr key={row.RawMaterial_ID}>
//                 <td>{row.RawMaterial_ID}</td>
//                 <td>{row.Product_ID}</td>
//                 <td>{row.RawMaterial_Name}</td>
//                 <td>{row.unit_of_Measure}</td>
//                 <td>{row.Stock_Quantity}</td>
//                 <td>{row.Price_Unit}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center text-muted">
//                 No raw materials found for this product.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </MainCard>
//   );
// };

// export default RawMaterialTable;
