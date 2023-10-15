import { Container, Text } from '@mantine/core';
import React from 'react';

export function Mobile() {
  return (
    <Container size="xs">
      <Text>⛔더 큰 화면에서 이용해주세요.⛔</Text>
      <Text>(min 1280px)</Text>
    </Container>
  );
}
