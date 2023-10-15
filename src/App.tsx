import { AppShell, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';
import { Cthulhu } from './pages/Cthulu';
import { Main } from './pages/Main';
import { Mobile } from './pages/Mobile';

function App() {
  const isMobile = useMediaQuery('(max-width: 1280px)');
  if (isMobile) {
    return (
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <AppShell padding="md" header={<HeaderSimple />}>
          <Mobile />
        </AppShell>
      </MantineProvider>
    );
  }
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell padding="md" navbar={<NavbarSimple />} header={<HeaderSimple />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coc" element={<Cthulhu />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
