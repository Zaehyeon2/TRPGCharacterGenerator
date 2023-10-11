import { Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import { MainLinks } from './_NavLinks';
import { FooterSimple } from './Footer';
import { HeaderSimple } from './Header';

export function NavbarSimple() {
  return (
    <Navbar width={{ base: 400, maximum: 1100 }} p="xs">
      <Navbar.Section>
        <HeaderSimple />
      </Navbar.Section>
      <Navbar.Section grow mt="md" component={ScrollArea}>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <FooterSimple />
      </Navbar.Section>
    </Navbar>
  );
}
