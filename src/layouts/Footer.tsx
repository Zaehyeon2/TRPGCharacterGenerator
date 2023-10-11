import { Group, Button, Footer } from '@mantine/core';
import React from 'react';

// localstorage clear 버튼
function clearLocalStorage() {
  // eslint-disable-next-line no-alert
  if (window.confirm('삭제 하시겠습니까?')) {
    localStorage.clear();
    window.location.reload();
  }
}

export function FooterSimple() {
  return (
    <Footer height={{ base: 20, md: 40 }} p="md">
      <Group position="left">
        <Button
          compact
          variant="light"
          size="xs"
          color="gray"
          onClick={() => {
            clearLocalStorage();
          }}
        >
          Clear LocalStorage
        </Button>
      </Group>
    </Footer>
  );
}
