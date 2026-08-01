import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Achievements from "./Achievements/Achievements";
import Team from "./Team/Team";

function App() {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "team" ? <Team /> : <Achievements />}
    </>
  );
}

export default App;