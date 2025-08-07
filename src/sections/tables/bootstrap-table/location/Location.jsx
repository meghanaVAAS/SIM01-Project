{/* Warehouse Store location
 Column Name	Type	Description
location_id	INT	Primary key
location_name	VARCHAR	Name (e.g., "Main Warehouse")
address	TEXT	Physical address
created_at	DATETIME	Creation timestamp
    */}
// import MainCard from 'components/MainCard';
// import { useNavigate } from 'react-router-dom';

// // const locationData = [
// //     {
// //         location_id: 1,
// //         location_name: "Main Warehouse",
// //         address_Text: '789 Warehouse Rd',
// //         created_at: "2025-07-28 10:42:00",
// //     },
// //      {
// //         location_id: 2,
// //         location_name: "Second Warehouse",
// //         address_Text: '745 Warehouse Rd',
// //         created_at: "2025-09-03 11:30:00",
// //     },
// // ];

// export default function LocationTable() {
//   const location = [
//     { location_id: 1, location_name: 'Main Warehouse', address_Text: '745 Warehouse Rd',created_at: "2025-09-03 11:30:00"}, 
//     { location_id: 2, location_name:'Second Warehouse', address_Text: '745 Warehouse Rd', created_at: "2025-09-03 11:30:00"},
//     { location_id: 3, location_name: 'Main Warehouse', address_Text: '745 Warehouse Rd',created_at: "2025-09-03 11:30:00"},
//   ];
//   const navigate = useNavigate();

//   return (
//       <MainCard title="Categories">
//         <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0' }}>
//           {location.map(locations => (
//             <div
//               key={locations.id}
//               onClick={() => handleCategoryClick(category)}
//               style={{
//                 width: '140px',
//                 height: '140px',
//                 background: '#f5f5f5',
//                 borderRadius: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//                 cursor: 'pointer',
//                 transition: 'box-shadow 0.2s',
//               }}
//             >
//               <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1976d2' }}>
//                 {location.icon}
//               </div>
//               <div style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>{category.name}</div>
//             </div>
//           ))}
//         </div>
//       </MainCard>
//     );
//   }
  