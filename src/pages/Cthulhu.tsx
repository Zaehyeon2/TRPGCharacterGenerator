import { Card, Tabs } from '@mantine/core';
import { IconUser, IconSwords } from '@tabler/icons-react';
import React from 'react';
import { CthulhuGenerator } from './CthulhuGenerator';
import { CthulhuWeapons } from './CthulhuWeapons';

export function Cthulhu() {
  return (
    <Card withBorder radius="md">
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
