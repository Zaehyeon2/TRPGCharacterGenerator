import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavbarSimple } from './layouts/Navbar';
import { CthulhuGenerator } from './pages/Cthulu-Generator';
import { Main } from './pages/Main';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell padding="md" navbar={<NavbarSimple />}>
        <Routes>
          <Route path="/TRPGCharacterGenerator" element={<Main />} />
          <Route path="/TRPGCharacterGenerator/coc/generator" element={<CthulhuGenerator />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
