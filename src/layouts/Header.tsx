import { Header, UnstyledButton, Group, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

export function HeaderSimple() {
  return (
    <Header height={{ base: 60, md: 80 }} p="md">
      <UnstyledButton component={Link} to="/">
        <Group position="center" mt="md">
          <Text size="lg">Generator</Text>
        </Group>
      </UnstyledButton>
    </Header>
  );
}
