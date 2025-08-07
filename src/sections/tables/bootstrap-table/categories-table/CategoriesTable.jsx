// ==============================|| CATEGORIES TABLE PAGE ||============================== //

import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

export default function CategoriesTable() {
  const categories = [
    { id: 1, name: 'Electronics', description: 'Devices and gadgets', icon: <i className="ph ph-device-mobile" /> },
    { id: 2, name: 'Clothing', description: 'Apparel and accessories', icon: <i className="ph ph-tshirt" /> },
    { id: 3, name: 'Home', description: 'Home and kitchen products', icon: <i className="ph ph-house" /> },
  ];

  // For navigation, use react-router-dom
//   import { useNavigate } from 'react-router-dom';
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/tables/bootstrap-table/categories-table/${category.id}`, { state: { category } });
  };

  // Add route for category detail
  // In your routes file, add:
  // {
  //   path: '/tables/bootstrap-table/categories-table/:id',
  //   element: <CategoryDetail />
  // }

  return (
    <MainCard title="Categories">
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0' }}>
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            style={{
              width: '140px',
              height: '140px',
              background: '#f5f5f5',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1976d2' }}>
              {category.icon}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>{category.name}</div>
          </div>
        ))}
      </div>
    </MainCard>
  );
}
