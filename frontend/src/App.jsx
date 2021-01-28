import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Home from "./sites/home";
import Login from "./sites/login";


export default function App() {
  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
};
