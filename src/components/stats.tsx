/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, UnstyledButton, Checkbox, Container } from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dice20 from '../assets/dice20.png';
import { rollDice } from '../services/dice.service';
import { formStat, isNumber } from '../services/utils.service';
import { componentStyles } from '../styles/styles';

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
  penaltyByAge?: number;
  getAndSetFunction: (key: string, value: { value: number; value2: number }) => void;
  reloadStat: boolean;
  initialValue?: number;
}

export const Stats = React.memo(function Stats({
  statKey,
  label,
  nDices,
  nSides,
  baseValue = 0,
  isClass = false,
  multiplyValue = 1,
  penaltyByAge = 0,
  reloadStat = false,
  getAndSetFunction,
  initialValue,
}: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>(() => {
    const value = initialValue ?? 0;
    const valueSubByPanelty = value - penaltyByAge;
    return {
      value,
      valueSubByPanelty,
      valueDividedBy2: Math.floor(valueSubByPanelty / 2),
      valueDividedBy5: Math.floor(valueSubByPanelty / 5),
      isClassTraits: false,
    };
  });

  const prevInitialValueRef = useRef(initialValue);
  const prevInitialPenaltyRef = useRef(penaltyByAge);

  const prevPaneltyRef = useRef(penaltyByAge);
  const prevReloadStatRef = useRef(reloadStat);

  const calculateStats = useCallback((stat: number, penalty: number) => {
    const valueSubByPanelty = stat - penalty;
    return {
      valueSubByPanelty,
      valueDividedBy2: Math.floor(valueSubByPanelty / 2),
      valueDividedBy5: Math.floor(valueSubByPanelty / 5),
    };
  }, []);

  const setStats = useCallback(
    (stat: number, shouldNotify = true) => {
      const calculated = calculateStats(stat, penaltyByAge);
      setStatValues((prev) => ({
        ...prev,
        value: stat,
        ...calculated,
      }));
      if (shouldNotify) {
        getAndSetFunction(statKey, { value: stat, value2: calculated.valueSubByPanelty });
      }
    },
    [calculateStats, penaltyByAge, getAndSetFunction, statKey],
  );

  const rollStat = useCallback(() => {
    if (!nDices || !nSides) return;
    const result = rollDice(nDices, nSides, label);
    console.log(
      `[${label}] (${result} + ${baseValue}) -> ${result + baseValue} * ${multiplyValue} = ${
        (result + baseValue) * multiplyValue
      }`,
    );
    setStats((result + baseValue) * multiplyValue);
  }, [nDices, nSides, label, baseValue, multiplyValue, setStats]);

  useEffect(() => {
    if (prevPaneltyRef.current !== penaltyByAge) {
      prevPaneltyRef.current = penaltyByAge;
      const calculated = calculateStats(statValues.value, penaltyByAge);
      setStatValues((prev) => ({
        ...prev,
        ...calculated,
      }));
      getAndSetFunction(statKey, { value: statValues.value, value2: calculated.valueSubByPanelty });
    }
  }, [penaltyByAge, statValues.value, calculateStats, getAndSetFunction, statKey]);

  useEffect(() => {
    console.log(
      `[Stats ${statKey}] useEffect - initialValue: ${initialValue}, penaltyByAge: ${penaltyByAge}, prevInitial: ${prevInitialValueRef.current}, prevPenalty: ${prevInitialPenaltyRef.current}`,
    );
    const initialValueChanged =
      initialValue !== undefined &&
      initialValue !== 0 &&
      prevInitialValueRef.current !== initialValue;
    const initialPenaltyChanged =
      initialValue !== undefined &&
      initialValue !== 0 &&
      prevInitialPenaltyRef.current !== penaltyByAge;

    console.log(
      `[Stats ${statKey}] initialValueChanged: ${initialValueChanged}, initialPenaltyChanged: ${initialPenaltyChanged}`,
    );

    if (initialValueChanged || initialPenaltyChanged) {
      prevInitialValueRef.current = initialValue;
      prevInitialPenaltyRef.current = penaltyByAge;
      const calculated = calculateStats(initialValue, penaltyByAge);
      console.log(`[Stats ${statKey}] calculated:`, calculated);
      setStatValues((prev) => ({
        ...prev,
        value: initialValue,
        ...calculated,
      }));
      getAndSetFunction(statKey, { value: initialValue, value2: calculated.valueSubByPanelty });
    }
  }, [initialValue, penaltyByAge, calculateStats, getAndSetFunction, statKey]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNumber(event.currentTarget.value)) return;
      setStats(+event.currentTarget.value);
    },
    [setStats],
  );

  const handleCheckboxChange = useCallback(() => {
    setStatValues((prev) => ({ ...prev, isClassTraits: !prev.isClassTraits }));
  }, []);

  const { classes } = componentStyles();

  return (
    <Container>
      <Stack align="center" spacing={0} className={classes.statContainer}>
        <Text align="center" fz="sm">
          {label} {multiplyValue !== 1 && '('}
          {nDices && nSides && `${nDices}D${nSides}`}
          {baseValue !== 0 && `+${baseValue}`}
          {multiplyValue !== 1 && ')'}
          {multiplyValue !== 1 && `*${multiplyValue}`}
          {penaltyByAge !== 0 && (penaltyByAge < 0 ? ` +${-penaltyByAge}` : ` -${penaltyByAge}`)}
        </Text>
        <Grid justify="center" align="center" p={5} grow>
          {isClass && (
            <Grid.Col span="content">
              <Checkbox
                checked={statValues.isClassTraits}
                size="xs"
                onChange={handleCheckboxChange}
              />
            </Grid.Col>
          )}
          <Grid.Col span={5}>
            <TextInput autoComplete="off" value={statValues.value} onChange={handleInputChange} />
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
              <UnstyledButton onClick={rollStat}>
                <img src={dice20} alt="roll" width="15px" />
              </UnstyledButton>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
});
