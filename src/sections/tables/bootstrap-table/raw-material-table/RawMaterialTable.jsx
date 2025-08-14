import React from 'react';
import MainCard from 'components/MainCard';
import Table from "react-bootstrap/Table";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RawMaterial.css';

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
          SupplierId: raw.SupplierId
        }));
        setRawmaterial(mapped);
      })
      .catch(() => setRawmaterial([]));
  }, []);
  const [search, setSearch] = useState("");
  const filteredRawMaterials = rawmaterial.filter(raw =>
    (raw.RawMaterial_Name || '').toLowerCase().includes(search.toLowerCase()) ||
    (raw.RawMaterial_ID ? raw.RawMaterial_ID.toString().toLowerCase().includes(search.toLowerCase()) : false)
  );
  const navigate = useNavigate();
  const handleNewRawMaterialClick = () => {
    navigate('/tables/bootstrap-table/raw-material-table/new');
  }
  return (
    <MainCard title={
      <div className="rawmaterial-header">
        <span className="rawmaterial-header-title">RawMaterials</span>
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rawmaterial-search"
        />
        <button className="rawmaterial-add-btn" onClick={handleNewRawMaterialClick}>Add RawMaterials</button>
      </div>
    }>
      <Table responsive>
        <thead>
          <tr>
            <th>RawMaterialID</th>
            <th>ProductID</th>
            <th>RawMaterialName</th>
            <th>UnitofMeasure</th>
            <th>StockQuantity</th>
            <th>SupplierId</th>
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
              <td>
                <button
                  className="rawmaterial-supplier-btn"
                  onClick={() => navigate(`/tables/bootstrap-table/supplier-table/${encodeURIComponent(row.SupplierId)}`)}
                >
                  {row.SupplierId}
                </button>
              </td>
              <td>
                <button
                  className={`rawmaterial-status-btn ${Number(row.Stock_Quantity) > 50 ? 'available' : 'low-stock'}`}
                  disabled={Number(row.Stock_Quantity) <= 50}
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
