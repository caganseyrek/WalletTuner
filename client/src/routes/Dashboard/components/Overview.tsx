import { useTranslation } from "react-i18next";

import useFormatter from "@/hooks/useFormatter";

const Overview = () => {
  const { t } = useTranslation();
  const formatter = useFormatter();

  return (
    <section id="overview">
      <section id="balance">
        <span>{t("dashboard.overview.balance")}</span>
        <span>{formatter("23674.35")}</span>
      </section>
      <section id="income">
        <span>{t("dashboard.overview.monthlyIncome")}</span>
        <span>+{formatter("7021.01")}</span>
      </section>
      <section id="expense">
        <span>{t("dashboard.overview.monthlyExpense")}</span>
        <span>-{formatter("1423.26")}</span>
      </section>
      <section id="graph">graphs</section>
    </section>
  );
};

export default Overview;
