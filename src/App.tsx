import { BrowserRouter } from 'react-router-dom';
import Header from './layout/Header';
import ProductListing from './components/ProductListing';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <ProductListing />
      </div>
    </BrowserRouter>
  );
}

export default App;
