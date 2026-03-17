import Sidebar from "../src/components/layout/sidebar";
import Canvas from "../src/components/layout/canvas";
import Topbar from "../src/components/layout/topbar";

function App() {
  return (
    <div>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
