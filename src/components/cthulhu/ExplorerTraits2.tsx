import { Container, Grid, Stack, Text } from '@mantine/core';
import React from 'react';
import { formHp, formStat } from '../../services/utils.service';
import { Stats } from '../stats';

interface ExplorerTraits2Props {
  sizeValue2: number;
  healthValue2: number;
  mentalityValue2: number;
  getAndSetStats: (key: string, value: { value: number; value2: number }) => void;
}

export const ExplorerTraits2 = React.memo(function ExplorerTraits2({
  sizeValue2,
  healthValue2,
  mentalityValue2,
  getAndSetStats,
}: ExplorerTraits2Props) {
  return (
    <Stack
      justify="space-between"
      spacing="xs"
      sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
    >
      <Text sx={{ backgroundColor: 'brown' }}>특성치2</Text>
      <Grid justify="center" align="center">
        <Grid.Col span={3}>
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
              <Text fz="sm">체력</Text>
              <Text>{formHp(sizeValue2, healthValue2)}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={3}>
          <Stats
            statKey="luck"
            label="운"
            nDices={3}
            nSides={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={false}
          />
        </Grid.Col>
        <Grid.Col span={3}>
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
              <Text fz="sm">이성</Text>
              <Text>{formStat(mentalityValue2, 1)}</Text>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={3}>
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
              <Text fz="sm">마력</Text>
              <Text>{formStat(Math.floor(mentalityValue2 / 5), 5)}</Text>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Stack>
  );
});
