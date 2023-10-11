import { Card, Group } from '@mantine/core';
import React from 'react';

export function HelloGenerator() {
  return (
    <Card withBorder radius="md">
      <Group position="left">
        <h3> Hello, Generator </h3>
      </Group>
    </Card>
  );
}
