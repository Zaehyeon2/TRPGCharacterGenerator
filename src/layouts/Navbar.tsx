import { Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import { MainLinks } from './_NavLinks';
import { FooterSimple } from './Footer';

export function NavbarSimple() {
  return (
    <Navbar width={{ base: 250 }} p="xs">
      <Navbar.Section grow mt="md" component={ScrollArea}>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <FooterSimple />
      </Navbar.Section>
    </Navbar>
  );
}
