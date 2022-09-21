import "./App.css";

import Routes from "./routes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="routes">
        <Routes />
      </div>
    </div>
  );
}

export default App;
