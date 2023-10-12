import { Card, Grid } from '@mantine/core';
import React from 'react';
import { Stats } from '../components/stats';

export function HelloGenerator() {
  return (
    <Card withBorder radius="md">
      <Grid justify="center" align="center">
        <Grid.Col span={3}>
          <Stats value={10} nDices={1} nSides={100} maxValue={90} />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stats value={10} label="건강" baseValue={10} maxValue={90} />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stats value={10} label="건강" nDices={1} nSides={100} maxValue={90} />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stats value={10} label="건강" nDices={1} nSides={100} maxValue={90} />
        </Grid.Col>
      </Grid>
    </Card>
  );
}
