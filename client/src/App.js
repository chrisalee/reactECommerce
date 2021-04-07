import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";


const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <div className="grid-container">
          <header className="row">
            <Header />
          </header>
    
          <main>
            {/* <Route path='/register' component={RegisterScreen}/> */}
            <Route path='/signin' component={SigninScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path='/' component={HomeScreen} exact />
              
          </main>
    
          <footer>
            <Footer />
          </footer>
            
            
        </div>
      </div>

    </BrowserRouter>
  );
};

export default App;
