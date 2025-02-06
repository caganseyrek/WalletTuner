import { ForwardRefExoticComponent, RefAttributes } from "react";

import { BadgeDollarSign, CalendarSync, ChartArea, Goal, LucideProps, UserCircle } from "lucide-react";

interface ResourceProps {
  key: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  path: string;
}

const resources: ResourceProps[] = [
  {
    key: "account",
    title: "Accounts",
    icon: UserCircle,
    path: "/app/account",
  },
  {
    key: "milestone",
    title: "Milestones",
    icon: Goal,
    path: "/app/milestone",
  },
  {
    key: "overview",
    title: "Overview",
    icon: ChartArea,
    path: "/app/overview",
  },
  {
    key: "subscription",
    title: "Subcriptions",
    icon: CalendarSync,
    path: "/app/subscription",
  },
  {
    key: "transaction",
    title: "Transactions",
    icon: BadgeDollarSign,
    path: "/app/transaction",
  },
];

export default resources;
