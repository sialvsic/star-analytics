import { useEffect } from "react";
import FullPage from "./fullpage";

function App() {
  useEffect(() => {
    const mount = document.getElementById("fullpage");

    const app = new FullPage(mount, {});
  }, []);

  return (
    <div id="fullpage">
      <div className="section 1 active">Some section1</div>
      <div className="section 2">Some section2</div>
      <div className="section 3">Some section3</div>
      <div className="section 4">Some section4</div>
    </div>
  );
}

export default App;
