import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import './Supplier.css';

export default function SupplierDetails() {
  const { id, supplierName } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url;
    if (supplierName) {
      url = `http://localhost:8000/suppliers/by-name/${encodeURIComponent(supplierName)}`;
    } else {
      url = `http://localhost:8000/suppliers/${id}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch supplier details');
        return res.json();
      })
      .then((data) => {
        setSupplier(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, supplierName]);

  if (loading) return <MainCard title="Supplier Details">Loading...</MainCard>;
  if (error) return <MainCard title="Supplier Details">Error: {error}</MainCard>;
  if (!supplier) return <MainCard title="Supplier Details">No details found.</MainCard>;

  return (
    <MainCard title={`Supplier Details - ${supplier.Supplier_Name || supplier.Supplier_ID}`}>
      <div style={{ position: 'relative', minHeight: '300px' }}>
        <table className="supplier-details-table">
          <tbody>
            <tr><td className="supplier-details-label">Supplier ID:</td><td>{supplier.Supplier_ID}</td></tr>
            <tr><td className="supplier-details-label">Supplier Name:</td><td>{supplier.Supplier_Name}</td></tr>
            <tr><td className="supplier-details-label">Contact Name:</td><td>{supplier.Contact_Name}</td></tr>
            <tr><td className="supplier-details-label">Phone:</td><td>{supplier.Phone}</td></tr>
            <tr><td className="supplier-details-label">Email:</td><td>{supplier.Email}</td></tr>
            <tr><td className="supplier-details-label">Address:</td><td>{supplier.Address}</td></tr>
          </tbody>
        </table>
        <button
          style={{ position: 'absolute', left: 0, bottom: 0, padding: '8px 16px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', margin: '16px' }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </MainCard>
  );
}
