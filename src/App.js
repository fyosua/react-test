import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Components & Pages
import SiteHeader from "./components/SiteHeader"
import HomePage from "./pages/HomePage"
import Category from "./pages/Category"
import ReviewDetails from "./pages/ReviewDetails"

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/details/:id" element={<ReviewDetails/>}/>
          <Route exact path="/category/:id" element={<Category/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
