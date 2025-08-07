
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import MainCard from "components/MainCard";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function SalesTable() {
  const [salesdata, setSalesdata] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // fetch sales data
  useEffect(() => {
    fetch("http://localhost:8000/sales-table")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map(sale => ({
          Sales_ID: sale.Sales_ID,
          Product_ID: sale.Product_ID,
          Product_Name: sale.Product_Name || '',
          Quantity_Sold: sale.Quantity_Sold || 0,
          Unit_Price: sale.Unit_Price || '',
          Sale_Date: sale.Sale_Date || '',
          Total_Amount: sale.Total_Amount || 0
        }));
        setSalesdata(mapped);
      })
      .catch(() => setSalesdata([]));
  }, []);

  // fetch purchase data
  useEffect(() => {
    fetch("http://localhost:8000/purchase-table")
      .then((res) => res.json())
      .then((data) => setPurchase(data))
      .catch(() => setPurchase([]));
  }, []);

  const filteredSales = salesdata.filter(sale =>
    (sale.Product_Name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleNewSalesClick = () => {
    navigate('/tables/bootstrap-table/sales-table/new');
  };

  const handleSalesClick = (row) => {
    setSelectedSales(row);
  };

  const handleBack = () => {
    setSelectedSales(null);
  };

  return (
    <MainCard title={selectedSales ? `Sales Details: ${selectedSales.Sales_ID}` : (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{fontWeight:"bold",fontSize:"25px"}}>Sales</span>
        <input
          type="text"
          placeholder="Search...."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '120px', marginLeft: '40px' }}
        />
        <button style={{border:"1px solid grey",backgroundColor:"grey",color:"white",width:"140px", textAlign:"center",borderRadius:"7px",fontSize:"17px"}} onClick={handleNewSalesClick}>New Sales</button>
      </div>
    )}>
      {selectedSales ? (
        <>
          <Button variant="secondary" onClick={handleBack} className="mb-3">
            ← Back to Sales List
          </Button>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Purchase Order</th>
                <th>Sales ID</th>
                <th>Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchase.filter(mat => mat.Sales_ID === selectedSales.Sales_ID).length > 0 ? (
                purchase.filter(mat => mat.Sales_ID === selectedSales.Sales_ID).map(mat => (
                  <tr key={mat.Purchase_Order}>
                    <td>{mat.Purchase_Order}</td>
                    <td>{mat.Sales_ID}</td>
                    <td>{mat.Date}</td>
                    <td>{mat.Delivery_Date}</td>
                    <td>{mat.Status}</td>
                    <td>{mat.Total_Amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No purchase records for this Sales ID</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>SalesID</th>
              <th>ProductID</th>
              <th>ProductName</th>
              <th>QuantitySold</th>
              <th>UnitPrice</th>
              <th>SaleDate</th>
              <th>TotalAmount</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((row) => (
                <tr key={row.Sales_ID} style={{ cursor: 'pointer' }} onClick={() => handleSalesClick(row)}>
                  <td>{row.Sales_ID}</td>
                  <td>{row.Product_ID}</td>
                  <td>{row.Product_Name}</td>
                  <td>{row.Quantity_Sold}</td>
                  <td>{row.Unit_Price}</td>
                  <td>{row.Sale_Date}</td>
                  <td>{row.Total_Amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No sales records available</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </MainCard>
  );
}



