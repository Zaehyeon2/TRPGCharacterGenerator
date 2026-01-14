import { Container, Grid, Stack, Text } from '@mantine/core';
import React from 'react';
import { formStat } from '../../services/utils.service';

interface CombatStats {
  damageBonus: string;
  build: number;
}

interface ExplorerCombatProps {
  combatStats: CombatStats;
  dodgeValue: number;
}

export const ExplorerCombat = React.memo(function ExplorerCombat({
  combatStats,
  dodgeValue,
}: ExplorerCombatProps) {
  return (
    <Stack
      justify="space-between"
      spacing="xs"
      sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
    >
      <Text sx={{ backgroundColor: 'teal' }}>전투</Text>
      <Grid justify="center" align="center" columns={1}>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">피해 보너스</Text>
              <Text>{combatStats.damageBonus}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">체구</Text>
              <Text>{combatStats.build}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={1}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
                height: '70.88px',
              }}
              justify="center"
              spacing={0}
            >
              <Text fz="sm">회피</Text>
              <Grid justify="center" align="center">
                <Grid.Col span={1}>
                  <Text fz="xl">{formStat(dodgeValue, 1)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Stack spacing={0} align="center">
                    <Text fz="xs">{formStat(Math.floor(dodgeValue / 2), 2)}</Text>
                    <Text fz="xs">{formStat(Math.floor(dodgeValue / 5), 5)}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Stack>
  );
});
