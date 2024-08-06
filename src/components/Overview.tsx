import { format } from "../utils/formatter";

const Overview = () => {
  // const { balance, income, expense } = useData();

  return (
    <section id="overview">
      <section id="balance">
        <span>Balance</span>
        <span>{format("23674.35")}</span>
      </section>
      <section id="income">
        <span>Monthly Income</span>
        <span>+{format("7021.01")}</span>
      </section>
      <section id="expense">
        <span>Monthly Expense</span>
        <span>-{format("1423.26")}</span>
      </section>
      <section id="graph">graphs</section>
    </section>
  );
};

export default Overview;
