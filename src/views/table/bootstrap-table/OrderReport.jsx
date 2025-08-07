import Loadable from 'components/Loadable';
import { lazy } from 'react';

const OrderReport = Loadable(lazy(() => import('sections/tables/bootstrap-table/orders-table/OrderReport')));

export default OrderReport;
