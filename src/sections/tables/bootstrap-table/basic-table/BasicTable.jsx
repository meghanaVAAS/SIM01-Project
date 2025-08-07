// react-bootstrap
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| BASIC TABLE ||============================== //

export default function BasicTable() {
  return (
    <MainCard
      title="Basic Table"
      subheader={
        <p className="mb-0">
          use class <code>table</code> inside table element
        </p>
      }
    >
      <Table responsive className="mb-0">
        <thead>
          <tr>
            <th>id</th>
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




// import React, { useState } from 'react';
// import './Table.css'; 


// const TableRow = ({ data, isEditing, isDeleting, onEdit, onDelete, onSaveEdit, onCancelEdit, onSaveDelete, onCancelDelete }) => {
//   const [editForm, setEditForm] = useState({
//     Productname: data.Productname,
//     Price: data.Price,
//     Quantity: data.Quantity,
//     country: data.country
//   });

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <tr>
//       {isEditing ? (
//         <>
//           <td><input type="text" name="Productname" value={editForm.Productname} onChange={handleEditChange} /></td>
//           <td><input type="number" name="Price" value={editForm.Price} onChange={handleEditChange} /></td>
//           <td><input type="number" name="Quantity" value={editForm.Quantity} onChange={handleEditChange} /></td>
//           <td><input type="text" name="country" value={editForm.country} onChange={handleEditChange} /></td>
//           <td>
//             <button onClick={() => onSaveEdit(data.id, editForm)}>✔</button>
//             <button onClick={onCancelEdit}>✖</button>
//           </td>
//         </>
//       ) : (
//         <>
//           <td>{data.Productname}</td>
//           <td>{data.Price}</td>
//           <td>{data.Quantity}</td>
//           <td>{data.country}</td>
//           <td>
//             {isDeleting ? (
//               <>
//                 <button onClick={() => onSaveDelete(data.id)}>✔</button>
//                 <button onClick={onCancelDelete}>✖</button>
//               </>
//             ) : (
//               <>
//                 <button onClick={() => onEdit(data.id)}>✏</button>
//                 <button onClick={() => onDelete(data.id)}>🗑</button>
//               </>
//             )}
//           </td>
//         </>
//       )}
//     </tr>
//   );
// };


// const InsertRow = ({ onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     Productname: '',
//     Price: '',
//     Quantity: '',
//     country: '',
   
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(formData);
//     setFormData({ Productname: '', Price: '', Quantity: '', country: ''}); // Clear form
//   };

//   return (
//     <tr className="insert-row">
//       <td>
//         <input
//           type="text"
//           name="Productname"
//           value={formData.Productname}
//           onChange={handleChange}
//           placeholder="ProductName"
//         />
//       </td>
//       <td>
//         <input
//           type="number"
//           name="Price"
//           value={formData.Price}
//           onChange={handleChange}
//           placeholder="Price"
//         />
//       </td>
//       <td>
//         <input
//           type="number"
//           name="Quantity"
//           value={formData.Quantity}
//           onChange={handleChange}
//           placeholder="Quantity"
//         />
//       </td>
//       <td>
//         <input
//           type="text"
//           name="country"
//           value={formData.country}
//           onChange={handleChange}
//           placeholder="Country"
//         />
//       </td>





     
//       <td>
//         <button onClick={handleSave}>✔</button>
//         <button onClick={onCancel}>✖</button>
//       </td>
//     </tr>
//   );
// };

// // App Component - Main component managing the table data and state
// function Table() {
  
//   const [data, setData] = useState([
//     { id: 1, Productname: 'Mobile', Price: 20000, Quantity: 150, country: 'China' },
//     { id: 2, Productname: 'Laptop', Price: 73000, Quantity: 30, country: 'Russia'},
//     { id: 3, Productname: 'Mouse', Price: 290, Quantity: 50, country: 'Russia'},
//   ]);

//   const [showInsertRow, setShowInsertRow] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const handleAddClick = () => {
//     setShowInsertRow(true);
//   };

//   const handleSaveNewItem = (newItem) => {
//     // Basic validation and ID generation
//     if (newItem.Productname && newItem.Price && newItem.Quantity && newItem.country) {
//       const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
//       setData([...data, { id: newId, ...newItem }]);
//       setShowInsertRow(false); // Hide the insert row after saving
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   const handleCancelInsert = () => {
//     setShowInsertRow(false);
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//     setDeletingId(null);
//   };

//   const handleDelete = (id) => {
//     setDeletingId(id);
//     setEditingId(null);
//   };

//   const handleSaveEdit = (id, updatedRow) => {
//     setData(data.map(item => item.id === id ? { ...item, ...updatedRow } : item));
//     setEditingId(null);
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   const handleSaveDelete = (id) => {
//     setData(data.filter(item => item.id !== id));
//     setDeletingId(null);
//   };

//   const handleCancelDelete = () => {
//     setDeletingId(null);
//   };


//   return (
  
//     <div className="App">
//       <div className="table-controls">
//         {/* <button className="add-button" onClick={handleAddClick}>
//           +
//         </button> */}
//         <div className="search-filter">
//           <input type="text" placeholder="Search..." />
//          <button className="add-button" onClick={handleAddClick}>
//           +
//         </button>
//           {/* <button>➕</button> */}
//           <button>Filter</button>
//         </div>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ProductName</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Country</th>
           
//             <th className='thtable'></th> {/* For edit/delete buttons */}
//           </tr>
//         </thead>
//         <tbody>
//           {showInsertRow && (
//             <InsertRow onSave={handleSaveNewItem} onCancel={handleCancelInsert} />
//           )}
//           {data.map((item) => (
//             <TableRow
//               key={item.id}
//               data={item}
//               isEditing={editingId === item.id}
//               isDeleting={deletingId === item.id}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onSaveEdit={handleSaveEdit}
//               onCancelEdit={handleCancelEdit}
//               onSaveDelete={handleSaveDelete}
//               onCancelDelete={handleCancelDelete}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
  
// }

// export default Table;