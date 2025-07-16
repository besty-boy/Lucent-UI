import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DocsLayout } from './pages/DocsLayout';
import { Installation } from './pages/docs/Installation';
import { Components } from './pages/docs/Components';
import { Premium } from './pages/docs/Premium';
import { Animations } from './pages/docs/Animations';
import { Performance } from './pages/docs/Performance';
import { Responsive } from './pages/docs/Responsive';
import { MicroInteractions } from './pages/docs/MicroInteractions';
import { StateManagement } from './pages/docs/StateManagement';
import { Themes } from './pages/docs/Themes';
import { Examples } from './pages/docs/Examples';
import { Advanced } from './pages/docs/Advanced';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Installation />} />
          <Route path="installation" element={<Installation />} />
          <Route path="components" element={<Components />} />
          <Route path="premium" element={<Premium />} />
          <Route path="animations" element={<Animations />} />
          <Route path="performance" element={<Performance />} />
          <Route path="responsive" element={<Responsive />} />
          <Route path="microinteractions" element={<MicroInteractions />} />
          <Route path="state" element={<StateManagement />} />
          <Route path="themes" element={<Themes />} />
          <Route path="examples" element={<Examples />} />
          <Route path="advanced" element={<Advanced />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;