import React from "react";
import MainCard from 'components/MainCard';
import Table from 'react-bootstrap/Table';

// Example inventory data
const inventoryData = [
  {
    inventory_id: 1,
    product_id: 101,
    location_id: 1,
    quantity: 50,
    updated_at: "2025-07-28 10:00:00",
  },
  {
    inventory_id: 2,
    product_id: 102,
    location_id: 2,
    quantity: 20,
    updated_at: "2025-07-28 11:00:00",
  },
  // Add more rows as needed
];

const InventoryTable = () => {
  return (
    <MainCard title="Inventory Table">
      <Table responsive>
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>Product ID</th>
            <th>Location ID</th>
            <th>Quantity</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((row) => (
            <tr key={row.inventory_id}>
              <td>{row.inventory_id}</td>
              <td>{row.product_id}</td>
              <td>{row.location_id}</td>
              <td>{row.quantity}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{row.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
};

export default InventoryTable;