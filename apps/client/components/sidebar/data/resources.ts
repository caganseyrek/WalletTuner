import { ForwardRefExoticComponent, RefAttributes } from "react";

import { BadgeDollarSign, CalendarSync, ChartArea, Goal, LucideProps, UserCircle } from "lucide-react";

interface ResourceProps {
  key: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const resources: ResourceProps[] = [
  {
    key: "overview",
    title: "Overview",
    icon: ChartArea,
  },
  {
    key: "account",
    title: "Accounts",
    icon: UserCircle,
  },
  {
    key: "milestone",
    title: "Milestones",
    icon: Goal,
  },
  {
    key: "subscription",
    title: "Subcriptions",
    icon: CalendarSync,
  },
  {
    key: "transaction",
    title: "Transactions",
    icon: BadgeDollarSign,
  },
];

export default resources;
