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
    path: "#",
  },
  {
    key: "documentation",
    title: "Documentation",
    icon: ScrollText,
    path: "#",
  },
  {
    key: "repository",
    title: "Repository",
    icon: CodeXml,
    path: "#",
  },
  {
    key: "feedback",
    title: "Feedback",
    icon: MessageSquare,
    path: "#",
  },
];

export default externals;
