// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import SalesPerformanceCard from 'components/cards/SalesPerformanceCard';
import SocialStatsCard from 'components/cards/SocialStatsCard';
import StatIndicatorCard from 'components/cards/StatIndicatorCard';
import { RatingCard, RecentUsersCard } from 'sections/dashboard/default';

// ===============================|| SALES PERFORMANCE CARD - DATA ||============================== //

const salesPerformanceData = [
  { title: 'Total Product', icon: 'ph ph-package text-primary', amount: '6', progress: { now: 100, className: 'bg-primary' } },
  { title: 'Orders', icon: 'ph ph-list text-info', amount: '12', progress: { now: 60, className: 'bg-info' } },
  { title: 'Total Stock', icon: 'ph ph-database text-success', amount: '70', progress: { now: 80, className: 'bg-success' } }
];

// ===============================|| STAT INDICATOR CARD - DATA ||============================== //

const statIndicatorData = [];

// ===============================|| SOCIAL STATS CARD - DATA ||============================== //

const socialStatsData = [];

// ================================|| DASHBOARD - DEFAULT ||============================== //

export default function DefaultPage() {
  return (
    <Row>
      {/* row - 1 */}
      {salesPerformanceData.map((item, index) => (
        <Col key={index} md={index === 2 ? 12 : 6} xl={4}>
          <SalesPerformanceCard {...item} />
        </Col>
      ))}

      {/* row - 2 */}
      <Col md={12} xl={12}>
        <StatIndicatorCard data={statIndicatorData} />
      </Col>

      {/* row - 3 */}
      {socialStatsData.map((item, index) => (
        <Col key={index} md={index === 0 ? 12 : 6} xl={4}>
          <SocialStatsCard {...item} />
        </Col>
      ))}

      {/* row - 4 */}
    </Row>
  );
}
