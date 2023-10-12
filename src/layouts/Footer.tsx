import { Group, Text, Footer } from '@mantine/core';
import React from 'react';

export function FooterSimple() {
  return (
    <Footer height={{ base: 20, md: 40 }} p="md">
      <Group position="left">
        <Text>
          <a href="https://www.freepik.com/free-vector/medieval-knight-with-weapon_30162714.htm#query=warrior%20svg&position=10&from_view=keyword&track=ais">
            Image by brgfx
          </a>{' '}
          on Freepik
        </Text>
      </Group>
    </Footer>
  );
}
