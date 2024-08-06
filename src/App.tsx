import Header from "./components/Header";
import Modal from "./components/Modal";
import Overview from "./components/Overview";
import { format } from "./utils/formatter";
import { getGreeting } from "./utils/greeting";

const TEST_NAME = "testname";

const App = () => {
  const greeting = getGreeting(TEST_NAME);
  return (
    <>
      <Header />
      <h2 id="greeting">{greeting}</h2>
      <Overview />
      {format("123456.12")}
      <Modal />
    </>
  );
};

export default App;
