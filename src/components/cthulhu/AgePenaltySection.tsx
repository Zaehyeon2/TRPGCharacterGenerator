import { Container, Text, Grid, Stack, TextInput, UnstyledButton } from '@mantine/core';
import React, { useMemo } from 'react';
import dice20 from '../../assets/dice20.png';
import { penaltyText } from '../../consts/penaltyByAge';
import { IStats, IStatPenalty } from '../../interfaces/interfaces';
import { rollDice } from '../../services/dice.service';
import { isNumber } from '../../services/utils.service';

interface AgePenaltySectionProps {
  statValues: IStats;
  statPenaltyValues: IStatPenalty;
  setStatPenaltyValues: React.Dispatch<React.SetStateAction<IStatPenalty>>;
  educationBonusText: string;
  setEducationBonusText: React.Dispatch<React.SetStateAction<string>>;
  reloadStatBool: boolean;
  setReloadStatBool: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AgePenaltySection = React.memo(function AgePenaltySection({
  statValues,
  statPenaltyValues,
  setStatPenaltyValues,
  educationBonusText,
  setEducationBonusText,
  reloadStatBool,
  setReloadStatBool,
}: AgePenaltySectionProps) {
  const penaltyByAge = useMemo(() => {
    const getEducationBonus = (num: number) => {
      const { education: educatioN } = statValues;
      let education = educatioN.value;
      education += statPenaltyValues.education;
      education = Math.max(0, education);
      console.log('[교육 판정] start - base education', education);
      let totalBonus = 0;
      let result = '';
      for (let i = 0; i < num; i += 1) {
        const roll = rollDice(1, 100, '교육 판정');
        console.log('[교육 판정] current education', education, ', roll', roll);
        if (roll > education) {
          const bonus = rollDice(1, 10, '교육 판정 (보너스)');
          totalBonus += bonus;
          education += bonus;
          result += '🏆';
          console.log(
            '[교육 판정] success - current education',
            education,
            ', current bonus',
            bonus,
            ', total bonus',
            totalBonus,
          );
        } else {
          result += '❌';
          console.log(
            '[교육 판정] fail - current education',
            education,
            ', total bonus',
            totalBonus,
          );
        }
      }
      console.log(
        '[교육 판정] end - current education',
        education,
        ', total bonus',
        totalBonus,
        'result',
        result,
      );
      setEducationBonusText(result);
      setStatPenaltyValues({ ...statPenaltyValues, education: -totalBonus });
    };
    let text = '';
    let panelyAppearance = 0;
    let educationBonusNum = 0;
    if (statValues.age <= 19) {
      [text] = penaltyText;
    } else if (statValues.age <= 39) {
      [, text] = penaltyText;
      educationBonusNum = 1;
    } else if (statValues.age <= 49) {
      [, , text] = penaltyText;
      panelyAppearance = 5;
      educationBonusNum = 2;
    } else if (statValues.age <= 59) {
      [, , , text] = penaltyText;
      panelyAppearance = 10;
      educationBonusNum = 3;
    } else if (statValues.age <= 69) {
      [, , , , text] = penaltyText;
      panelyAppearance = 20;
      educationBonusNum = 4;
    } else if (statValues.age <= 79) {
      [, , , , , text] = penaltyText;
      panelyAppearance = 20;
      educationBonusNum = 4;
    } else {
      [, , , , , , text] = penaltyText;
      panelyAppearance = 25;
      educationBonusNum = 4;
    }
    return (
      <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
        <Text sx={{ backgroundColor: 'red', color: 'white' }}>나이에 따른 조정 사항</Text>
        <Text sx={{ backgroundColor: 'lightgray', color: 'black' }}>{text}</Text>
        <Grid justify="center" align="center" sx={{ marginTop: '5px' }}>
          <Grid.Col span={12}>
            <Text fz="sm">
              뺴야하는 스탯 -{' '}
              {statPenaltyValues.total -
                statPenaltyValues.str -
                statPenaltyValues.dex -
                statPenaltyValues.health -
                statPenaltyValues.size}
            </Text>
          </Grid.Col>
          {!(statValues.age >= 20 && statValues.age <= 39) && (
            <Grid.Col xs={6} sm={3}>
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
                  <Text fz="sm">근력</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.str}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        str: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age > 19) && (
            <Grid.Col xs={6} sm={3}>
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
                  <Text fz="sm">크기</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.size}
                    disabled={statValues.age > 19}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        size: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age < 40) && (
            <Grid.Col xs={6} sm={3}>
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
                  <Text fz="sm">건강</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.health}
                    disabled={statValues.age < 40}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        health: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age < 40) && (
            <Grid.Col xs={6} sm={3}>
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
                  <Text fz="sm">민첩성</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.dex}
                    disabled={statValues.age < 40}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        dex: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {educationBonusNum !== 0 && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                    height: '82.08px',
                    width: '171.5px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">교육 판정</Text>
                  <Text fz="sm">
                    {educationBonusText === '' ? (
                      <UnstyledButton
                        onClick={() => {
                          getEducationBonus(educationBonusNum);
                        }}
                      >
                        <img src={dice20} alt="roll" width="15px" />
                      </UnstyledButton>
                    ) : (
                      <Text>{educationBonusText}</Text>
                    )}
                  </Text>
                </Stack>
              </Container>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    );
  }, [
    statValues.age,
    statPenaltyValues,
    statValues.education,
    educationBonusText,
    reloadStatBool,
    setEducationBonusText,
    setReloadStatBool,
    setStatPenaltyValues,
  ]);

  return penaltyByAge;
});
