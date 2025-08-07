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

const statIndicatorData = [
  { icon: 'ph ph-lightbulb-filament', value: '235', label: 'TOTAL IDEAS', iconColor: 'text-success' },
  { icon: 'ph ph-map-pin-line', value: '26', label: 'TOTAL LOCATION', iconColor: 'text-primary' }
];

// ===============================|| SOCIAL STATS CARD - DATA ||============================== //

const socialStatsData = [
  {
    icon: 'ti ti-brand-facebook-filled text-primary',
    count: '12,281',
    percentage: '+7.2%',
    color: 'text-success',
    stats: [
      {
        label: 'Target',
        value: '35,098',
        progress: {
          now: 60,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '3,539',
        progress: {
          now: 45,
          className: 'bg-brand-color-2'
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-twitter-filled text-info',
    count: '11,200',
    percentage: '+6.2%',
    color: 'text-primary',
    stats: [
      {
        label: 'Target',
        value: '34,185',
        progress: {
          now: 40,
          className: 'bg-success'
        }
      },
      {
        label: 'Duration',
        value: '4,567',
        progress: {
          now: 70
        }
      }
    ]
  },
  {
    icon: 'ti ti-brand-google-filled text-danger',
    count: '10,500',
    percentage: '+5.9%',
    color: 'text-primary',
    stats: [
      {
        label: 'Target',
        value: '25,998',
        progress: {
          now: 80,
          className: 'bg-brand-color-1'
        }
      },
      {
        label: 'Duration',
        value: '7,753',
        progress: {
          now: 50,
          className: 'bg-brand-color-2'
        }
      }
    ]
  }
];

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
      <Col md={6} xl={4}>
        <RatingCard />
      </Col>
      <Col md={6} xl={8}>
        <RecentUsersCard />
      </Col>
    </Row>
  );
}
