import { ForwardRefExoticComponent, RefAttributes } from "react";

import {
  BadgeDollarSign,
  CalendarSync,
  ChartArea,
  CodeXml,
  Goal,
  LucideProps,
  MessageSquare,
  ScrollText,
  UserCircle,
} from "lucide-react";

interface NavigationProps {
  key: string;
  label: string;
  items: {
    key: string;
    title: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    path: string;
  }[];
}

const navigation: NavigationProps[] = [
  {
    key: "general",
    label: "General",
    items: [
      {
        key: "overview",
        title: "Overview",
        icon: ChartArea,
        path: "/app/overview",
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    items: [
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
    ],
  },
  {
    key: "externals",
    label: "Externals",
    items: [
      {
        key: "documentation",
        title: "Documentation",
        icon: ScrollText,
        path: `${process.env.NEXT_PUBLIC_SITE_URL}/docs`,
      },
      {
        key: "repository",
        title: "Repository",
        icon: CodeXml,
        path: "https://github.com/caganseyrek/WalletTuner",
      },
      {
        key: "feedback",
        title: "Feedback",
        icon: MessageSquare,
        path: "https://github.com/caganseyrek/WalletTuner/issues",
      },
    ],
  },
];

export default navigation;
