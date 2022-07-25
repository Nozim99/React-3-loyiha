import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Shop from "./layout/Shop";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Shop />
      <Footer />
    </div>
  );
}

export default App;
