// ==============================|| CATEGORY DETAIL PAGE ||============================== //

import MainCard from 'components/MainCard';
import { useLocation, useParams } from 'react-router-dom';

export default function CategoryDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const category = state?.category;

  if (!category) {
    return <MainCard title="Category Not Found">Category details not available.</MainCard>;
  }

  return (
    <MainCard title={category.name}>
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <div style={{ fontSize: '4rem', color: '#1976d2', marginBottom: '1rem' }}>{category.icon}</div>
        <h3>Description</h3>
        <p>{category.description}</p>
      </div>
    </MainCard>
  );
}
