import NavBar from "./components/NavBar";
import { Home } from "./components/Home";
import "./style.css";
import { useState } from "react";
import { LoadMore } from "./components/LoadMore";
import CardDetails from "./components/CardDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const addInput = (s: string): void => {
    setInput(s);
  };

  return (
    <>
      <NavBar addInput={addInput} />
      <Router>
        <AppContent page={page} input={input} setPage={setPage} />
      </Router>
    </>
  );
};

// Separate component to use hooks inside Router
const AppContent = ({
  page,
  input,
  setPage,
}: {
  page: number;
  input: string;
  setPage: any;
}) => {
  const location = useLocation();

  // Check if the current route is the CardDetails route
  const isCardDetailsPage = location.pathname.startsWith("/card/");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home page={page} input={input} />} />
        <Route path="/card/:id" element={<CardDetails />} />
      </Routes>
      {!isCardDetailsPage && <LoadMore setPage={setPage} page={page} />}
    </>
  );
};

export default App;
