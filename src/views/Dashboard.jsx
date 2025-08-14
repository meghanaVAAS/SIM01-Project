import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  // Example state for metrics (replace with real API calls)
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalRawMaterials: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalIdeas: 0,
    totalLocations: 0,
    lowStock: 0,
    topProducts: [],
    salesTrend: [],
    purchasesTrend: [],
    stockDistribution: [],
    recentSales: [],
    recentPurchases: [],
    lowStockItems: []
  });

  useEffect(() => {
    // TODO: Fetch dashboard data from backend and update state
  }, []);

  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontWeight: 'bold', color: '#333' }}>SIM Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/images/user/avatar-1.png" alt="User" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }} />
          <span style={{ color: '#333', fontWeight: 500 }}>Welcome, User</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
    <MainCard title="Total Products" style={{ flex: 1, textAlign: 'center' }}>{metrics.totalProducts}</MainCard>
    <MainCard title="Total Raw Materials" style={{ flex: 1, textAlign: 'center' }}>{metrics.totalRawMaterials}</MainCard>
    <MainCard title="Total Sales" style={{ flex: 1, textAlign: 'center' }}>{metrics.totalSales}</MainCard>
    <MainCard title="Low Stock Alerts" style={{ flex: 1, textAlign: 'center', color: 'red' }}>{metrics.lowStock}</MainCard>
      </div>

      {/* Charts & Visualizations (placeholders) */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <MainCard title="Sales Trend" style={{ flex: 2, minHeight: 200 }}>
          {/* TODO: Insert sales trend chart */}
          <div style={{ height: 150, background: '#eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            Sales Trend Chart
          </div>
        </MainCard>
        <MainCard title="Purchases Trend" style={{ flex: 2, minHeight: 200 }}>
          {/* TODO: Insert purchases trend chart */}
          <div style={{ height: 150, background: '#eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            Purchases Trend Chart
          </div>
        </MainCard>
        <MainCard title="Stock Distribution" style={{ flex: 1, minHeight: 200 }}>
          {/* TODO: Insert stock distribution pie chart */}
          <div style={{ height: 150, background: '#eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            Stock Pie Chart
          </div>
        </MainCard>
      </div>

      {/* Tables/Summaries */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <MainCard title="Recent Sales" style={{ flex: 1 }}>
          {/* TODO: Replace with real data */}
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {metrics.recentSales.length === 0 ? <li>No recent sales</li> : metrics.recentSales.map((sale, i) => <li key={i}>{sale}</li>)}
          </ul>
        </MainCard>
        <MainCard title="Recent Purchases" style={{ flex: 1 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {metrics.recentPurchases.length === 0 ? <li>No recent purchases</li> : metrics.recentPurchases.map((purchase, i) => <li key={i}>{purchase}</li>)}
          </ul>
        </MainCard>
        <MainCard title="Low Stock Items" style={{ flex: 1 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: 'red' }}>
            {metrics.lowStockItems.length === 0 ? <li>All stocks sufficient</li> : metrics.lowStockItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </MainCard>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <button style={{ flex: 1, padding: 16, borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Add New Product</button>
        <button style={{ flex: 1, padding: 16, borderRadius: 8, background: '#388e3c', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Add New Raw Material</button>
        <button style={{ flex: 1, padding: 16, borderRadius: 8, background: '#fbc02d', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Add New Sale</button>
        <button style={{ flex: 1, padding: 16, borderRadius: 8, background: '#d32f2f', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Add New Purchase</button>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: 24 }}>
        <a href="/tables/bootstrap-table/basic-table" style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 8, background: '#fff', color: '#1976d2', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #1976d2' }}>Products Table</a>
        <a href="/tables/bootstrap-table/raw-material-table" style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 8, background: '#fff', color: '#388e3c', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #388e3c' }}>Raw Materials Table</a>
        <a href="/tables/bootstrap-table/sales-table" style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 8, background: '#fff', color: '#fbc02d', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #fbc02d' }}>Sales Table</a>
        <a href="/tables/bootstrap-table/purchase-table" style={{ flex: 1, textAlign: 'center', padding: 16, borderRadius: 8, background: '#fff', color: '#d32f2f', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #d32f2f' }}>Purchases Table</a>
      </div>
    </div>
  );
}
