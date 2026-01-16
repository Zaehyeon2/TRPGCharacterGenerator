import { Header, UnstyledButton, Group, Text, Burger, Drawer, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLinks } from './_NavLinks';
import { FooterSimple } from './Footer';
import dice20 from '../assets/dice20.png';

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  return (
    <>
      <Header height={80} p="md">
        <Group position="apart" noWrap sx={{ height: '100%' }}>
          {!isDesktop && <Burger opened={opened} onClick={toggle} size="sm" />}
          <UnstyledButton component={Link} to="/" sx={{ flex: 1 }}>
            <Group position="center" noWrap>
              <img src={dice20} alt="dice20" width={26.6} />
              <Text size="lg" sx={{ whiteSpace: 'nowrap' }}>
                TRPG Character Generators
              </Text>
            </Group>
          </UnstyledButton>
          {!isDesktop && <div style={{ width: 34 }} />}
        </Group>
      </Header>

      <Drawer opened={opened} onClose={close} size="250px" padding="md" title="Menu" zIndex={1000}>
        <ScrollArea sx={{ height: 'calc(100vh - 140px)' }}>
          <div onClick={close}>
            <MainLinks />
          </div>
        </ScrollArea>
        <FooterSimple />
      </Drawer>
    </>
  );
}
