/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, UnstyledButton, Checkbox, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import dice20 from '../assets/dice20.png';
import { rollDice } from '../services/dice.service';
import { formStat, isNumber } from '../services/utils.service';

interface StatsProps {
  value: number;
  valueSubByPanelty: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
  isClassTraits: boolean;
}

export interface StatsParams {
  statKey: string;
  label?: string;
  nDices?: number;
  nSides?: number;
  baseValue?: number;
  multiplyValue?: number;
  isClass?: boolean;
  paneltyByAge?: number;
  getAndSetFunction: (key: string, value: { value: number; value2: number }) => void;
  reloadStat: boolean;
}

export function Stats({
  statKey,
  label,
  nDices,
  nSides,
  baseValue = 0,
  isClass = false,
  multiplyValue = 1,
  paneltyByAge = 0,
  reloadStat = false,
  getAndSetFunction,
}: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>({
    value: 0,
    valueSubByPanelty: 0,
    valueDividedBy2: 0,
    valueDividedBy5: 0,
    isClassTraits: false,
  });

  const [rerender, setRerender] = useState(false);

  function setStats(stat: number) {
    const v = stat;
    const valueSubByPanelty = v - paneltyByAge;
    setStatValues({
      value: v,
      valueSubByPanelty,
      valueDividedBy2: Math.floor(valueSubByPanelty / 2),
      valueDividedBy5: Math.floor(valueSubByPanelty / 5),
      isClassTraits: statValues.isClassTraits,
    });
  }

  function rollStat() {
    if (!nDices || !nSides) return;
    const roll = rollDice(nDices, nSides);
    console.log((roll + baseValue) * multiplyValue);
    setStats((roll + baseValue) * multiplyValue);
  }

  useEffect(() => {
    setRerender(!rerender);
  }, [paneltyByAge, reloadStat]);

  useEffect(() => {
    console.log('rerender');
    setStats(statValues.value);

    getAndSetFunction(statKey, { value: statValues.value, value2: statValues.valueSubByPanelty });
  }, [statValues.valueSubByPanelty, rerender]);

  return (
    <Container>
      {/* <Button onClick={() => console.log(statValues)} /> */}
      <Stack align="center" spacing={0} sx={{ border: '1px solid', borderRadius: '0.5em' }}>
        <Text align="center" fz="sm">
          {label} {multiplyValue !== 1 && '('}
          {nDices && nSides && `${nDices}D${nSides}`}
          {baseValue !== 0 && `+${baseValue}`}
          {multiplyValue !== 1 && ')'}
          {multiplyValue !== 1 && `*${multiplyValue}`}
          {paneltyByAge !== 0 && (paneltyByAge < 0 ? ` +${-paneltyByAge}` : ` -${paneltyByAge}`)}
        </Text>
        <Grid justify="center" align="center" sx={{ padding: '5px' }} grow>
          {isClass && (
            <Grid.Col span="content">
              <Checkbox
                checked={statValues.isClassTraits}
                size="xs"
                onChange={() => {
                  setStatValues({ ...statValues, isClassTraits: !statValues.isClassTraits });
                }}
              />
            </Grid.Col>
          )}
          <Grid.Col span={5}>
            <TextInput
              autoComplete="off"
              value={statValues.value}
              onChange={(event) => {
                if (!isNumber(event.currentTarget.value)) return;
                setStats(+event.currentTarget.value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid justify="center" align="center">
              <Grid.Col span={6}>
                <Text fz="xl">{formStat(statValues.valueSubByPanelty, 1)}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing={0} align="center">
                  <Text fz="xs">{formStat(statValues.valueDividedBy2, 2)}</Text>
                  <Text fz="xs">{formStat(statValues.valueDividedBy5, 5)}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {nDices && nSides && (
            <Grid.Col span="content">
              <UnstyledButton onClick={() => rollStat()}>
                <img src={dice20} alt="roll" width="15px" />
              </UnstyledButton>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
