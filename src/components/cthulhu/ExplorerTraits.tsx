import { Container, Grid, Stack, Text } from '@mantine/core';
import React from 'react';
import { Stats } from '../stats';

interface StatPenaltyValues {
  str: number;
  dex: number;
  health: number;
  appeareance: number;
  size: number;
  education: number;
}

interface ExplorerTraitsProps {
  statPenaltyValues: StatPenaltyValues;
  mobility: number;
  getAndSetStats: (key: string, value: { value: number; value2: number }) => void;
  reloadStatBool: boolean;
}

export const ExplorerTraits = React.memo(function ExplorerTraits({
  statPenaltyValues,
  mobility,
  getAndSetStats,
  reloadStatBool,
}: ExplorerTraitsProps) {
  return (
    <Stack
      justify="space-between"
      spacing="xs"
      sx={{ paddingBottom: '10px', border: 'solid', height: '330px' }}
    >
      <Text sx={{ backgroundColor: 'brown' }}>특성치</Text>
      <Grid justify="center" align="center">
        <Grid.Col span={4}>
          <Stats
            statKey="str"
            label="근력"
            nDices={3}
            nSides={6}
            penaltyByAge={statPenaltyValues.str}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="dex"
            label="민첩성"
            nDices={3}
            nSides={6}
            penaltyByAge={statPenaltyValues.dex}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="int"
            label="지능"
            nDices={2}
            nSides={6}
            baseValue={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
      </Grid>
      <Grid justify="center" align="center">
        <Grid.Col span={4}>
          <Stats
            statKey="health"
            label="건강"
            nDices={3}
            nSides={6}
            penaltyByAge={statPenaltyValues.health}
            baseValue={0}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="appeareance"
            label="외모"
            nDices={3}
            nSides={6}
            penaltyByAge={statPenaltyValues.appeareance}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="mentality"
            label="정신력"
            nDices={3}
            nSides={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
      </Grid>
      <Grid justify="center" align="center">
        <Grid.Col span={4}>
          <Stats
            statKey="size"
            label="크기"
            nDices={2}
            nSides={6}
            penaltyByAge={statPenaltyValues.size}
            baseValue={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="education"
            label="교육"
            nDices={2}
            nSides={6}
            penaltyByAge={statPenaltyValues.education}
            baseValue={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetStats}
            reloadStat={reloadStatBool}
          />
        </Grid.Col>
        <Grid.Col span={4}>
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
              <Text fz="sm">이동력</Text>
              <Text>{mobility}</Text>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Stack>
  );
});
