import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './app.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import HomeScreen from './screen/HomeScreen';
import AdminScreen from './screen/AdminScreen';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='grid-container'>
          <header>
            <Link to='/'>React Shopping card</Link>
            <Link to="/admin">Admin</Link>
          </header>
          <main>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/admin' component={AdminScreen} exact />
          </main>
          <footer>All right are preserved</footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
