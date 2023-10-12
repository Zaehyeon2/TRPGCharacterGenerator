import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';
import { CthulhuGenerator } from './pages/Cthulu-Generator';
import { Main } from './pages/Main';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell padding="md" navbar={<NavbarSimple />} header={<HeaderSimple />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coc/generator" element={<CthulhuGenerator />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
