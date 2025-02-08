import { ForwardRefExoticComponent, RefAttributes } from "react";

import { CodeXml, LucideProps, MessageSquare, ScrollText, SearchCheck } from "lucide-react";

interface ExternalProps {
  key: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  path: string;
}

const externals: ExternalProps[] = [
  {
    key: "app-status",
    title: "App Status",
    icon: SearchCheck,
    path: `${process.env.NEXT_PUBLIC_SITE_URL}/status`,
  },
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
];

export default externals;
