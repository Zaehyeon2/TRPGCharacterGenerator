import { AppShell, Card, Skeleton, Stack, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HeaderSimple } from './layouts/Header';
import { NavbarSimple } from './layouts/Navbar';

const Cthulhu = React.lazy(() => import('./pages/Cthulhu').then((m) => ({ default: m.Cthulhu })));
const Main = React.lazy(() => import('./pages/Main').then((m) => ({ default: m.Main })));

function LoadingSkeleton() {
  return (
    <Card>
      <Stack spacing="md">
        <Skeleton height={50} width="60%" />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} width="80%" />
        <Skeleton height={200} mt="md" />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </Stack>
    </Card>
  );
}

function App() {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const loadingFallback = <LoadingSkeleton />;

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding={isDesktop ? 'md' : 0}
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
