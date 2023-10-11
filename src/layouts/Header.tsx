import { Header, UnstyledButton, Group, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import dice20 from '../assets/dice20.png';

export function HeaderSimple() {
  return (
    <Header height={80} p="md">
      <UnstyledButton component={Link} to="/">
        <Group position="center" mt="md">
          <img src={dice20} alt="dice20" width={26.6} />
          <Text size="lg">TRPG Character Generator</Text>
        </Group>
      </UnstyledButton>
    </Header>
  );
}
