import { Card, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconUser, IconSwords } from '@tabler/icons-react';
import React from 'react';
import { CthulhuGenerator } from './CthulhuGenerator';
import { CthulhuWeapons } from './CthulhuWeapons';

export function Cthulhu() {
  const isDesktop = useMediaQuery('(min-width: 769px)');

  return (
    <Card
      withBorder={isDesktop}
      radius={isDesktop ? 'md' : 0}
      p={isDesktop ? 'md' : 0}
      sx={isDesktop ? undefined : { margin: 0 }}
    >
      <Tabs defaultValue="generator">
        <Tabs.List>
          <Tabs.Tab value="generator" icon={<IconUser size={14} />}>
            Generator
          </Tabs.Tab>
          <Tabs.Tab value="weapons" icon={<IconSwords size={14} />}>
            Weapons
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="generator">
          <CthulhuGenerator />
        </Tabs.Panel>

        <Tabs.Panel value="weapons">
          <CthulhuWeapons />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
