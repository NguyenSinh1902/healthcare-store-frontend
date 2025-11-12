import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import routes from './routes/routes';

function App() {
  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                <Layout>
                  {route.element}
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
