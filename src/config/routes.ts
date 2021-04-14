import IRoute from "../interfaces/route";
import ServicesPage from "../pages/services";
import HomePage from "../pages/home";
import {
  FaLightbulb,
  FaHome,
  FaUsers,
  FaMoneyCheckAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import ClientsPage from "../pages/clients";
import BillingPage from "../pages/billing";
import PaymentHistoryPage from "../pages/payments_history";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    icon: FaHome,
    exact: true,
  },
  {
    path: "/clients",
    name: "Clients",
    component: ClientsPage,
    icon: FaUsers,
    exact: true,
  },
  {
    path: "/services",
    name: "Services",
    component: ServicesPage,
    icon: FaLightbulb,
    exact: true,
  },
  {
    path: "/billing",
    name: "Billing",
    component: BillingPage,
    icon: FaMoneyCheckAlt,
    exact: true,
  },
  {
    path: "/payment-history",
    name: "Payments history",
    component: PaymentHistoryPage,
    icon: FaRegCalendarAlt,
    exact: true,
  },
];

export default routes;
