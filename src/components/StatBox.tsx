import { Container, Stack, Text } from '@mantine/core';
import React from 'react';
import { componentStyles } from '../styles/styles';

interface StatBoxProps {
  label: string;
  value: string | number;
  height?: string;
}

export const StatBox = React.memo(function StatBox({ label, value, height }: StatBoxProps) {
  const { classes } = componentStyles();

  return (
    <Container>
      <Stack
        className={classes.statContainer}
        sx={
          height
            ? { paddingTop: '11.15px', paddingBottom: '11.25px', height }
            : { paddingTop: '11.15px', paddingBottom: '11.25px' }
        }
        justify="center"
        spacing={0}
      >
        <Text fz="sm">{label}</Text>
        <Text>{value}</Text>
      </Stack>
    </Container>
  );
});
