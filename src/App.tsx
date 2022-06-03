import { HashRouter, Routes, Route } from 'react-router-dom';

import SearchUsers from 'pages/SearchUsers';
import Layout from 'components/Layout/Layout';
import CardUser from 'pages/CardUser';

import './App.scss';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<SearchUsers />} />
          <Route path="/:name" element={<CardUser />} />
        </Route>
      </Routes>
    </HashRouter >
  );
}

export default App;
