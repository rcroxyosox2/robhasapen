import HomePage from './Pages/Home';
import DetailPage from './Pages/DetailPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:itemKey" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
