import { Text, Stack, Grid, TextInput, Button } from '@mantine/core';
import React, { useState } from 'react';
import { rollDice } from '../services/dice.service';

interface StatsProps {
  value: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
}

interface StatsParams {
  label: string;
  value: number;
  nDices: number;
  nSides: number;
}

export function Stats({ label, value, nDices, nSides }: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>({
    value,
    valueDividedBy2: value / 2,
    valueDividedBy5: value / 5,
  });

  function setStats(stat: number) {
    setStatValues({
      value: stat,
      valueDividedBy2: Math.floor(stat / 2),
      valueDividedBy5: Math.floor(stat / 5),
    });
  }

  function rollStat() {
    const roll = rollDice(nDices, nSides);
    setStats(roll);
  }

  return (
    <Grid
      justify="center"
      align="center"
      sx={{ border: '2px solid', borderRadius: '1em', margin: '5px' }}
    >
      <Grid.Col span={5}>
        <TextInput
          value={statValues.value}
          label={label}
          onChange={(event) => {
            setStats(+event.currentTarget.value);
          }}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack spacing="xs">
          <Text>{statValues.valueDividedBy2}</Text>
          <Text>{statValues.valueDividedBy5}</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack spacing="xs">
          <Button variant="outline" onClick={() => rollStat()} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
