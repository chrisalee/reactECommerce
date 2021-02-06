import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from "./components/Footer";
import Header from "./components/Header";


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="grid-container">
          <header className="row">
            <Header />
          </header>
    
          <main>
    
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path='/' component={HomeScreen} exact></Route>
              
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
