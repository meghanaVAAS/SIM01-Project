// react-bootstrap
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import MainCard from 'components/MainCard';

// ==============================|| SUPPLIERS TABLE PAGE ||============================== //

export default function SuppliersTable() {
  const [suppliers, setSuppliers] = useState([
    { SupplierId: 201, supplierName: 'Tech Supplies Inc.', ContactName: 'John Doe', Phone: 'Laptop, Mouse', email :'tech@supplies.com',
      Address:'123 Tech Lane', Country:'USA', Status: 'Active' },
    { SupplierId: 202, supplierName: 'Gadget World', ContactName: 'Jane Smith', Phone: 'iPhone, Product A', email :'tech@supplies.com ',
      Address:'456 Gadget Ave', Country:'USA', Status: 'Inactive' },
    { SupplierId: 203, supplierName: 'OfficeMart', ContactName: 'Bob Johnson', Phone: 'Product d', email :'tech@supplies.com',
      Address:'789 Office Blvd', Country:'USA', Status: 'Active' },
  ]);

  return (
    <MainCard title="Suppliers Table">
      <Table responsive>
        <thead>
          <tr>
            <th>SupplierId</th>
            <th>Supplier Name</th>
            <th>Contact Name</th>
            <th>Phone</th>
            <th>email</th>
            <th>Address</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.SupplierId}>
              <td>{supplier.SupplierId}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.ContactName}</td>
              <td>{supplier.Phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.Address}</td>
              <td>{supplier.Country}</td>
              <td style={{ color: supplier.Status === 'Active' ? 'green' : supplier.Status === 'Inactive' ? 'red' : 'inherit' }}>{supplier.Status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
