// react-bootstrap
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import './Supplier.css';
import { useNavigate } from 'react-router-dom';

// ==============================|| SUPPLIERS TABLE PAGE ||============================== //

export default function SuppliersTable() {
  const [suppliers, setSuppliers] = useState([]);
  // Fetch suppliers data
  useEffect(() => {
    fetch('http://localhost:8000/suppliers')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched suppliers data:', data);
        setSuppliers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch suppliers:', err));
  }, []);
  
  const navigate = useNavigate();
  const handleViewReport = (supplierId) => {
    navigate(`/tables/bootstrap-table/supplier-table/${supplierId}`);
  };

  return (
    <MainCard title={<span style={{ fontWeight: 'bold', fontSize: '25px'}}>Suppliers Table</span>} >
      <Table responsive>
        <thead>
          <tr>
              <th>SupplierID</th>
              <th>SupplierName</th>
              <th>ContactName</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.Supplier_ID}>
              <td>{supplier.Supplier_ID}</td>
              <td>{supplier.Supplier_Name}</td>
              <td>{supplier.Contact_Name}</td>
              <td>{supplier.Phone}</td>
              <td>{supplier.Email}</td>
              <td>{supplier.Address}</td>
              <td>
                <button
                  className="supplier-view-report-btn"
                  onClick={() => handleViewReport(supplier.Supplier_ID)}
                >
                  View Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
