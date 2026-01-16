import { Container, Text, Grid, Stack, TextInput, Checkbox } from '@mantine/core';
import React from 'react';
import {
  ISkillPoints,
  IExpectedSkills,
  ReloadStateParams,
  ISkills,
  ISelectedDetailedSkills,
  IInnerSkills,
  SkillParamsItem,
} from '../../interfaces/interfaces';
import { isNumber } from '../../services/utils.service';
import { SkillColumn } from '../SkillColumn';

interface ExplorerSkillsProps {
  skillPoints: ISkillPoints;
  skillsParams: SkillParamsItem[][];
  getAndSetSkills: (key: string, value: IInnerSkills | undefined) => void;
  getBonus: (key: string, num: string) => boolean;
  onChangeExpectedSkills: (key: string, value: boolean) => void;
  expectedSkills: IExpectedSkills;
  reloadState: ReloadStateParams;
  skillValues: ISkills;
  selectedDetailedSkills: ISelectedDetailedSkills;
  onDetailedKeyChange: (skillKey: string, detailedKey: string) => void;
  onSkillPointsChange: (value: number) => void;
}

export const ExplorerSkills = React.memo(function ExplorerSkills({
  skillPoints,
  skillsParams,
  getAndSetSkills,
  getBonus,
  onChangeExpectedSkills,
  expectedSkills,
  reloadState,
  skillValues,
  selectedDetailedSkills,
  onDetailedKeyChange,
  onSkillPointsChange,
}: ExplorerSkillsProps) {
  return (
    <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
      <Text sx={{ backgroundColor: 'purple' }}>기능</Text>
      <Text sx={{ backgroundColor: 'lightgray', color: 'black' }}>
        ✔ 직업 기능에 체크표시 하세요.
        <br />✔ 직업 기능 점수는 탐사자 핸드북 또는 수호자 룰북을 참고해주세요.
      </Text>
      <Text sx={{ backgroundColor: 'yellow', color: 'black' }}>
        ⚠ 전문 분야를 모두 고르고 스탯 배분을 시작해주세요.
        <br />⚠ 중간에 전문 분야를 바꿀시 다른 관련 전문 분야 스탯도 다시 적어주세요.
      </Text>
      <Grid justify="center" align="center" sx={{ marginTop: '5px' }} columns={12}>
        <Grid.Col xs={12} sm={5}>
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
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="sm">직업 기능 점수</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="sm">남은 점수</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    value={skillPoints.baseJob}
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      onSkillPointsChange(+event.currentTarget.value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                    {skillPoints.baseJob - skillPoints.job}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Grid.Col>
        <Grid.Col span={2} sx={{ '@media (max-width: 768px)': { display: 'none' } }} />
        <Grid.Col xs={12} sm={5}>
          <Container>
            <Stack
              sx={{
                border: '1px solid',
                borderRadius: '0.5em',
                paddingTop: '11.15px',
                paddingBottom: '11.25px',
                height: '98.08px',
              }}
              justify="center"
              spacing={0}
            >
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="sm">관심 기능 점수</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="sm">남은 점수</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                    {skillPoints.baseInterest}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                    {skillPoints.baseInterest - skillPoints.interest}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
      <Grid justify="center" align="center" sx={{ marginTop: '5px' }} columns={10}>
        <Grid.Col span={10}>
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
              <Text>보너스 기능 점수</Text>
              <Grid columns={12}>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">과학</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('science50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('science90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">근접전</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('fighting50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('fighting90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">사격</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('firearms50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('firearms90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">생존술</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('survival50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('survival90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">언어(외국어)</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('languageOther50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('languageOther90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} sm={2}>
                  <Stack spacing={0} align="center">
                    <Text fz="sm">예술/공예</Text>
                    <Checkbox
                      label="50%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('artcraft50', event.currentTarget.checked);
                      }}
                    />
                    <Checkbox
                      label="90%"
                      size="xs"
                      onChange={(event) => {
                        onChangeExpectedSkills('artcraft90', event.currentTarget.checked);
                      }}
                    />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
      <Grid
        justify="center"
        align="center"
        sx={{ marginTop: '5px' }}
        gutter="xs"
        gutterSm="md"
        px="xs"
      >
        {skillsParams.map((skillParams, idx) => (
          <SkillColumn
            key={idx}
            skillParams={skillParams}
            getAndSetSkills={getAndSetSkills}
            getBonus={getBonus}
            reloadState={reloadState}
            skillValues={skillValues}
            selectedDetailedSkills={selectedDetailedSkills}
            onDetailedKeyChange={onDetailedKeyChange}
          />
        ))}
      </Grid>
    </Container>
  );
});
