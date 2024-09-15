import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import RouteApp from './Route/routeApp';
import './components/css/banner.css'


const App = () => { 
    return (
    <div className="App flex flex-col min-h-screen">
      <Header  />
      <main className="flex-1 ">
        <RouteApp />
      </main>
      <Footer />
    </div>
  );
};

export default App;
