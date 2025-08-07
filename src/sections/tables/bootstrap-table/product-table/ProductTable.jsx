import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ProductTable = () => {
  const [productdata, setProductdata] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch product data
  useEffect(() => {
    fetch('http://localhost:8000/product-table')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched product data:', data);
        setProductdata(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  // Fetch raw material data
  useEffect(() => {
    fetch('http://localhost:8000/raw-materials')
      .then((res) => res.json())
      .then((data) => setRawMaterials(data))
      .catch((err) => console.error('Failed to fetch raw materials:', err));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <MainCard title={selectedProduct ? ` ${selectedProduct.Product_Name}` : 'Product Table'}>
      {selectedProduct ? (
        <>
          <Button variant="secondary" onClick={handleBack} className="mb-3">
            ← Back to Product List
          </Button>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>RawMaterialID</th>
                <th>RawMaterialName</th>
                <th>UnitofMeasure</th>
                <th>StockQuantity</th>
                <th>PriceUnit</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials
                .filter((mat) => mat.Product_ID === selectedProduct.Product_ID)
                .map((mat) => (
                  <tr key={mat.RawMaterial_ID}>
                    <td>{mat.RawMaterial_ID}</td>
                    <td>{mat.RawMaterial_Name}</td>
                    <td>{mat.unit_of_Measure}</td>
                    <td>{mat.Stock_Quantity}</td>
                    <td>{mat.Price_Unit}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Table responsive bordered>
          <thead>
            <tr>
              <th>ProductID</th>
              <th>ProductName</th>
              <th>StockQuantity</th>
              <th>PriceUnit</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productdata) && productdata.length > 0 ? (
              productdata.map((product) => (
                <tr key={product.Product_ID} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                  <td>{product.Product_ID}</td>
                  <td>{product.Product_Name}</td>
                  <td>{product.Stock_Quantity}</td>
                  <td>{product.Price_Unit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No products found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </MainCard>
  );
};

export default ProductTable;
