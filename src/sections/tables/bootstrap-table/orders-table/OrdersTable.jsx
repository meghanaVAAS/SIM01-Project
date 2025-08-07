
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

// ==============================|| ORDERS TABLE PAGE ||============================== //

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/orders')
      .then(res => res.json())
      .then(data => {
        // Map backend fields to UI fields if needed
        const mapped = data.map(order => ({
          OrderId: order.OrderId,
          ProductId: order.ProductId,
          QuantityOrdered: order.QuantityOrdered || 0,
          OrderDate: order.OrderDate || '',
          DeliveryDeadline: order.DeliveryDeadline || '',
          CustomerName: order.CustomerName || '',
        }));
        setOrders(mapped);
      })
      .catch(() => setOrders([]));
  }, []);
  const [search, setSearch] = useState("");
  const filteredOrders = orders.filter(order =>
    (order.OrderId || '').toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();
  const handleNewOrderClick = () => {
    navigate('/tables/bootstrap-table/orders-table/new');
  };
  return (
    <MainCard title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{fontWeight:"bold",fontSize:"25px"}}>Orders</span>
          <input
            type="text"
            placeholder="Search...."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '5px 10px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '120px', marginLeft: '40px' }}
          />
          <button style={{border:"1px solid grey",backgroundColor:"grey",color:"white",width:"140px", textAlign:"center",borderRadius:"7px",fontSize:"17px"}} onClick={handleNewOrderClick}>New Orders</button>
        </div>
        
      }
    >
      <Table responsive>
        <thead>
          <tr>
            <th>OrderId</th>
            <th>ProductId</th>
            <th>QuantityOrdered</th>
            <th>OrderDate</th>
            <th>DeliveryDeadline</th>
            <th>CustomerName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.OrderId}>
              <td>{order.OrderId}</td>
              <td>{order.ProductId}</td>
              <td>{order.QuantityOrdered}</td>
              <td>{order.OrderDate}</td>
              <td>{order.DeliveryDeadline}</td>
              <td>{order.CustomerName}</td>
              <td>
                <button
                  style={{border:"1px solid #007bff", backgroundColor:"#007bff", color:"white", borderRadius:"5px", padding:"5px 12px", cursor:"pointer"}}
                  onClick={() => {
                    navigate(`/tables/bootstrap-table/orders-table/report/${order.OrderId}`);
                  }}
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







// import Table from 'react-bootstrap/Table';
// import React, { useState, useEffect } from 'react';
// import MainCard from 'components/MainCard';
// import { useNavigate } from 'react-router-dom';

// // ==============================|| ORDERS TABLE PAGE ||============================== //

// export default function OrdersTable() {
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:8000/orders')
//       .then(res => res.json())
//       .then(data => {
//         // Map backend fields to UI fields if needed
//         const mapped = data.map(order => ({
//           OrderId: order.OrderId,
//           ProductId: order.ProductId,
//           QuantityOrdered: order.QuantityOrdered || 0,
//           OrderDate: order.OrderDate || '',
//           DeliveryDeadline: order.DeliveryDeadline || '',
//           CustomerName: order.CustomerName || '',
//         }));
//         setOrders(mapped);
//       })
//       .catch(() => setOrders([]));
//   }, []);
//   const [search, setSearch] = useState("");
//   const filteredOrders = orders.filter(order =>
//     (order.OrderId || '').toLowerCase().includes(search.toLowerCase())
//   );

//   const navigate = useNavigate();
//   const handleNewOrderClick = () => {
//     navigate('/tables/bootstrap-table/orders-table/new');
//   };
//   return (
//     <MainCard title={
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{fontWeight:"bold",fontSize:"25px"}}>Orders</span>
//           <input
//             type="text"
//             placeholder="Search...."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             style={{ padding: '5px 10px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '120px', marginLeft: '40px' }}
//           />
//           <button style={{border:"1px solid grey",backgroundColor:"grey",color:"white",width:"140px", textAlign:"center",borderRadius:"7px",fontSize:"17px"}} onClick={handleNewOrderClick}>New Orders</button>
//         </div>
        
//       }
//     >
//       <Table responsive>
//         <thead>
//           <tr>
//             <th>OrderId</th>
//             <th>ProductId</th>
//             <th>QuantityOrdered</th>
//             <th>OrderDate</th>
//             <th>DeliveryDeadline</th>
//             <th>CustomerName</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map(order => (
//             <tr key={order.OrderId}>
//               <td>{order.OrderId}</td>
//               <td>{order.ProductId}</td>
//               <td>{order.QuantityOrdered}</td>
//               <td>{order.OrderDate}</td>
//               <td>{order.DeliveryDeadline}</td>
//               <td>{order.CustomerName}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </MainCard>
//   );
// }