import { AppShell, Box, LoadingOverlay, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';

const Cthulhu = React.lazy(() => import('./pages/Cthulhu').then((m) => ({ default: m.Cthulhu })));
const Main = React.lazy(() => import('./pages/Main').then((m) => ({ default: m.Main })));

function App() {
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const loadingFallback = <LoadingOverlay visible overlayBlur={2} />;

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbar={isDesktop ? <NavbarSimple /> : undefined}
        header={<HeaderSimple />}
      >
        <Suspense fallback={loadingFallback}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/coc" element={<Cthulhu />} />
          </Routes>
        </Suspense>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
