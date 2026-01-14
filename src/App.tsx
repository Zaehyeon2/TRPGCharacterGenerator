import { AppShell, Box, LoadingOverlay, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';

const Cthulhu = React.lazy(() => import('./pages/Cthulu').then((m) => ({ default: m.Cthulhu })));
const Main = React.lazy(() => import('./pages/Main').then((m) => ({ default: m.Main })));
const Mobile = React.lazy(() => import('./pages/Mobile').then((m) => ({ default: m.Mobile })));

function App() {
  const isMobile = useMediaQuery('(max-width: 1280px)');
  const loadingFallback = <LoadingOverlay visible overlayBlur={2} />;

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbar={isMobile ? undefined : <NavbarSimple />}
        header={<HeaderSimple />}
      >
        <Suspense fallback={loadingFallback}>
          {isMobile && <Mobile />}
          <Box sx={{ display: isMobile ? 'none' : 'block' }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/coc" element={<Cthulhu />} />
            </Routes>
          </Box>
        </Suspense>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
