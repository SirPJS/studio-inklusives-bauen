import Layout from "./components/Layout/Layout";
import Projekte from "./sections/Projekte";
import Studio from "./sections/Studio";
import UeberMich from "./sections/UeberMich";

const App = () => (
  <Layout>
    <Projekte />
    <Studio />
    <UeberMich />
  </Layout>
);

export default App;
