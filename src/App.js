import React from 'react';

import RouteApp from './routes';
import AppProvider from './services/context';
import reducer from './reducers';

import Header from './components/Header';
import Footer from './components/Footer';
import useThunkReducer from './services/thunk';

const initialState = {
  movies: [],
  movie: {},
  genres: [],
};

function App() {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  return (
    <>
      <AppProvider.Provider value={{ state, dispatch }}>
        <Header />
        <main>
          <div className="container">
            <RouteApp />
          </div>
        </main>
        <Footer />
      </AppProvider.Provider>
    </>
  );
}

export default App;
