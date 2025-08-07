{/* Warehouse Store location
 Column Name	Type	Description
location_id	INT	Primary key
location_name	VARCHAR	Name (e.g., "Main Warehouse")
address	TEXT	Physical address
created_at	DATETIME	Creation timestamp
    */}
import MainCard from 'components/MainCard';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

export default function LocationTable() {
  const location = [
    { location_id: 1, location_name: 'Main Warehouse', address_Text: '745 Warehouse Rd',created_at: "2025-09-03 11:30:00"}, 
    { location_id: 2, location_name:'Second Warehouse', address_Text: '745 Warehouse Rd', created_at: "2025-09-03 11:30:00"},
    { location_id: 3, location_name: 'Main Warehouse', address_Text: '745 Warehouse Rd',created_at: "2025-09-03 11:30:00"},
  ];
  const navigate = useNavigate();

  return (
    <MainCard title="Location Table">
      <Table responsive>
        <thead>
          <tr>
            <th>Location Id</th>
            <th>Location Name</th>
            <th>Address</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {location.map(loc => (
            <tr key={loc.location_id}>
              <td>{loc.location_id}</td>
              <td>{loc.location_name}</td>
              <td>{loc.address_Text}</td>
              <td>{loc.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}
