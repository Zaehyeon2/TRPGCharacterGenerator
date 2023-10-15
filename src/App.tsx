import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';
import { Cthulhu } from './pages/Cthulu';
import { Main } from './pages/Main';

function App() {
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
