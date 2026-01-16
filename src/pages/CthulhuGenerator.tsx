import {
  ActionIcon,
  Box,
  Button,
  Card,
  FileButton,
  Grid,
  Group,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import logo from '../assets/coc-logo.png';
import { AgePenaltySection } from '../components/cthulhu/AgePenaltySection';
import { ExplorerCombat } from '../components/cthulhu/ExplorerCombat';
import { ExplorerCredit } from '../components/cthulhu/ExplorerCredit';
import { ExplorerInfo } from '../components/cthulhu/ExplorerInfo';
import { ExplorerSkills } from '../components/cthulhu/ExplorerSkills';
import { ExplorerTraits } from '../components/cthulhu/ExplorerTraits';
import { ExplorerTraits2 } from '../components/cthulhu/ExplorerTraits2';
import { Logo } from '../components/logo';
import { defaultSkills } from '../consts/defaultValues';
import {
  INITIAL_EXPECTED_SKILLS,
  INITIAL_RELOAD_STATE,
  INITIAL_SKILL_POINTS,
  INITIAL_STATS,
  INITIAL_STAT_PENALTY,
} from '../consts/initialStates';
import { skillsParamsFunction } from '../consts/skills';
import { getAgePenalty } from '../config/gameRules.config';
import { calculateMobility, calculateHP } from '../domain/character.service';
import { calculateCombatStats } from '../domain/combat.service';
import { calculateCredit } from '../domain/credit.service';
import {
  IExplorerData,
  IInnerSkills,
  ISelectedDetailedSkills,
  ISimplifiedExplorerData,
  ISkills,
} from '../interfaces/interfaces';
import { downloadAsJson, loadFromJsonFile } from '../services/utils.service';

export function CthulhuGenerator() {
  const isLoadingRef = useRef(false);
  const [statValues, setStatsValue] = useState(INITIAL_STATS);
  const [statPenaltyValues, setStatPenaltyValues] = useState(INITIAL_STAT_PENALTY);
  const [skillValues, setSkillValues] = useState(
    defaultSkills(statValues.dex.value2, statValues.education.value2) as ISkills,
  );
  const [educationBonusText, setEducationBonusText] = useState('');
  const [expectedSkills, setExpectedSkills] = useState(INITIAL_EXPECTED_SKILLS);
  const [skillPoints, setSkillPoints] = useState(INITIAL_SKILL_POINTS);
  const [reloadState, setReloadState] = useState(INITIAL_RELOAD_STATE);
  const [reloadStatBool, setReloadStatBool] = useState(false);
  const [selectedDetailedSkills, setSelectedDetailedSkills] = useState<ISelectedDetailedSkills>({
    science: '',
    science1: '',
    science2: '',
    science3: '',
    fighting: '',
    fighting1: '',
    fighting2: '',
    fighting3: '',
    firearms: '',
    firearms1: '',
    firearms2: '',
    firearms3: '',
    survival: '',
    survival1: '',
    artcraft: '',
    artcraft1: '',
    artcraft2: '',
    artcraft3: '',
    pilot: '',
    pilot1: '',
    rare: '',
    rare1: '',
    rare2: '',
    rare3: '',
    rare4: '',
  });
  const resetFileRef = useRef<() => void>(null);

  const handleExportJson = useCallback(() => {
    const explorerData: IExplorerData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      statValues,
      statPenaltyValues,
      skillValues,
      skillPoints,
      expectedSkills,
      selectedDetailedSkills,
      educationBonusText,
    };
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const filename = statValues.name
      ? `${statValues.name}_${timestamp}.json`
      : `탐사자_${timestamp}.json`;
    downloadAsJson(explorerData, filename);
  }, [
    statValues,
    statPenaltyValues,
    skillValues,
    skillPoints,
    expectedSkills,
    selectedDetailedSkills,
    educationBonusText,
  ]);

  const handleExportSimplifiedJson = useCallback(() => {
    const hp = calculateHP(statValues.size.value2, statValues.health.value2);
    const combatStats = calculateCombatStats(statValues.str.value2, statValues.size.value2);

    const creditValue = skillValues.credit.valueAddedByBaseValue;
    const creditResult = calculateCredit(creditValue);
    const creditInfo = {
      cash: creditResult.cash.toString(),
      assets: creditResult.assets,
      spendingLevel: creditResult.spendingLevel.toString(),
    };

    const skills: { [key: string]: number } = {};
    Object.keys(skillValues).forEach((key) => {
      if (key !== 'credit') {
        skills[key] = skillValues[key].valueAddedByBaseValue;
      }
    });

    const simplifiedData: ISimplifiedExplorerData = {
      info: {
        name: statValues.name,
        player: statValues.player,
        job: statValues.job,
        age: statValues.age,
        gender: statValues.gender,
        residence: statValues.residence,
        birthplace: statValues.birthplace,
      },
      stats: {
        str: statValues.str.value2,
        dex: statValues.dex.value2,
        int: statValues.int.value2,
        health: statValues.health.value2,
        appeareance: statValues.appeareance.value2,
        mentality: statValues.mentality.value2,
        size: statValues.size.value2,
        education: statValues.education.value2,
        mobility: statValues.mobility,
        luck:
          typeof statValues.luck === 'number'
            ? statValues.luck
            : (statValues.luck as { value: number; value2: number }).value2,
        hp,
        sanity: statValues.mentality.value2,
        magicPoints: Math.floor(statValues.mentality.value2 / 5),
      },
      combat: {
        damageBonus: combatStats.damageBonus,
        build: combatStats.build,
        dodge: skillValues.dodge.valueAddedByBaseValue,
      },
      credit: creditInfo,
      skills,
    };

    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const filename = statValues.name
      ? `${statValues.name}_simplified_${timestamp}.json`
      : `탐사자_simplified_${timestamp}.json`;
    downloadAsJson(simplifiedData, filename);
  }, [statValues, skillValues]);

  const handleImportJson = useCallback(async (file: File | null) => {
    if (!file) return;
    try {
      isLoadingRef.current = true;
      const data = await loadFromJsonFile<IExplorerData>(file);
      if (!data.version || !data.statValues || !data.skillValues) {
        alert('유효하지 않은 탐사자 데이터 파일입니다.');
        isLoadingRef.current = false;
        return;
      }
      setStatsValue(data.statValues);
      setStatPenaltyValues(data.statPenaltyValues);
      setSkillValues(data.skillValues);
      setSkillPoints(data.skillPoints);
      setExpectedSkills(data.expectedSkills);

      if (data.selectedDetailedSkills) {
        setSelectedDetailedSkills(data.selectedDetailedSkills);
      }

      if (data.educationBonusText) {
        setEducationBonusText(data.educationBonusText);
      }

      const dex = data.statValues.dex?.value2 ?? 0;
      const education = data.statValues.education?.value2 ?? 0;
      setSkillsParams(() => {
        const updated = skillsParamsFunction(dex, education);
        updated[3] = [...updated[3]];
        updated[3][10] = { ...updated[3][10], baseValue: Math.floor(dex / 2) };
        updated[1] = [...updated[1]];
        updated[1][9] = { ...updated[1][9], baseValue: education };
        return updated;
      });

      setReloadStatBool((prev) => !prev);
      alert('탐사자 데이터를 불러왔습니다.');
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 100);
    } catch (error) {
      isLoadingRef.current = false;
      alert(error instanceof Error ? error.message : '파일을 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  const defaultSkillParams = skillsParamsFunction(0, 0);

  const [skillsParams, setSkillsParams] = useState(defaultSkillParams);


  const getBonus = useCallback(
    (key: string, num: string) => {
      // Extract base skill type from keys like 'science1', 'fighting2', etc.
      const BONUS_SKILL_PREFIXES = ['science', 'fighting', 'firearms', 'survival', 'languageOther', 'artcraft'];
      let skillKey = key;
      for (const prefix of BONUS_SKILL_PREFIXES) {
        if (key.startsWith(prefix)) {
          skillKey = prefix;
          break;
        }
      }
      if (num === '50') {
        return expectedSkills[`${skillKey}50`] ?? false;
      }
      return expectedSkills[`${skillKey}90`] ?? false;
    },
    [expectedSkills],
  );

  const onChangeExpectedSkills = useCallback((key: string, value: boolean) => {
    setExpectedSkills((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getAndSetSkills = useCallback((key: string, value: IInnerSkills | undefined) => {
    if (!value) {
      setSkillValues((prev) => {
        const keys = Object.keys(prev);
        const updatedSkillValues: ISkills = { ...prev };
        keys.forEach((skillKey) => {
          if (skillKey.startsWith(key)) {
            updatedSkillValues[skillKey] = {
              value: 0,
              valueAddedByBaseValue: prev[skillKey].valueAddedByBaseValue,
              isJobSkill: false,
            };
          }
        });
        return updatedSkillValues;
      });
      setReloadState((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setSkillValues((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  const getAndSetStats = useCallback((key: string, value: { value: number; value2: number }) => {
    setStatsValue((prev) => ({ ...prev, [key]: value }));
    if (key === 'int') {
      setSkillPoints((prev) => ({ ...prev, baseInterest: value.value2 * 2 }));
    }
    if (key === 'dex') {
      setSkillValues((prev) => ({
        ...prev,
        dodge: {
          ...prev.dodge,
          valueAddedByBaseValue: prev.dodge.value + Math.floor(value.value2 / 2),
        },
      }));
      setSkillsParams((prev) => {
        const updated = [...prev];
        updated[3] = [...updated[3]];
        updated[3][10] = { ...updated[3][10], baseValue: Math.floor(value.value2 / 2) };
        return updated;
      });
    }
    if (key === 'education') {
      setSkillsParams((prev) => {
        const updated = [...prev];
        updated[1] = [...updated[1]];
        updated[1][9] = { ...updated[1][9], baseValue: value.value2 };
        return updated;
      });
    }
  }, []);

  const getMobility = useCallback(() => {
    setStatsValue((prev) => {
      const mobility = calculateMobility(
        prev.str.value2,
        prev.dex.value2,
        prev.size.value2,
        prev.age,
      );
      return { ...prev, mobility };
    });
  }, []);

  const combatStats = useMemo(
    () => calculateCombatStats(statValues.str.value2, statValues.size.value2),
    [statValues.str.value2, statValues.size.value2],
  );

  const creditInfo = useMemo(() => {
    const result = calculateCredit(skillValues.credit.valueAddedByBaseValue);
    return {
      cash: result.cash.toLocaleString(),
      assets: result.assets,
      spendingLevel: result.spendingLevel.toLocaleString(),
    };
  }, [skillValues.credit.valueAddedByBaseValue]);

  useEffect(() => {
    const skillValueKeys = Object.keys(skillValues);
    const updatedSkillPoints = { ...skillPoints, job: 0, interest: 0 };
    skillValueKeys.forEach((skillKey) => {
      const skillValue = skillValues[skillKey];
      if (skillValue.isJobSkill || skillKey === 'credit') {
        updatedSkillPoints.job += skillValue.value;
      } else {
        updatedSkillPoints.interest += skillValue.value;
      }
    });

    if (updatedSkillPoints.job > skillPoints.baseJob) {
      updatedSkillPoints.interest += updatedSkillPoints.job - skillPoints.baseJob;
      updatedSkillPoints.job = skillPoints.baseJob;
    }

    setSkillPoints(updatedSkillPoints);
  }, [skillValues, skillPoints.baseJob]);

  useEffect(() => {
    getMobility();
  }, [
    statValues.str,
    statValues.dex,
    statValues.size,
    statValues.age,
    statPenaltyValues.str,
    statPenaltyValues.dex,
    statPenaltyValues.size,
  ]);

  useEffect(() => {
    setSkillPoints({
      ...skillPoints,
      baseInterest: statValues.int.value2 * 2,
    });
  }, [statValues.int]);

  const handleDetailedKeyChange = useCallback((skillKey: string, detailedKey: string) => {
    setSelectedDetailedSkills((prev) => ({ ...prev, [skillKey]: detailedKey }));
  }, []);

  const handleJobChange = useCallback((job: string) => {
    setStatsValue((prev) => ({ ...prev, job }));
  }, []);

  const handleAgeChange = useCallback((age: number) => {
    setStatsValue((prev) => ({ ...prev, age }));
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setStatsValue((prev) => ({ ...prev, name }));
  }, []);

  const handlePlayerChange = useCallback((player: string) => {
    setStatsValue((prev) => ({ ...prev, player }));
  }, []);

  const handleGenderChange = useCallback((gender: string) => {
    setStatsValue((prev) => ({ ...prev, gender }));
  }, []);

  const handleResidenceChange = useCallback((residence: string) => {
    setStatsValue((prev) => ({ ...prev, residence }));
  }, []);

  const handleBirthplaceChange = useCallback((birthplace: string) => {
    setStatsValue((prev) => ({ ...prev, birthplace }));
  }, []);

  const handleSkillPointsChange = useCallback(
    (value: number) => {
      setSkillPoints({ ...skillPoints, baseJob: value });
    },
    [skillPoints],
  );

  useEffect(() => {
    if (isLoadingRef.current) return;
    const penalty = getAgePenalty(statValues.age);
    setStatPenaltyValues({
      str: 0,
      dex: 0,
      size: 0,
      health: 0,
      education: 0,
      appeareance: penalty.appearancePenalty,
      total: penalty.totalPenalty,
    });
    setEducationBonusText('');
  }, [statValues.age]);

  useEffect(() => {
    if (isLoadingRef.current) return;
    setStatPenaltyValues({
      ...statPenaltyValues,
      education: 0,
    });
    setEducationBonusText('');
  }, [statValues.education.value]);

  return (
    <Card>
      <Group position="right" mb="md" spacing="xs">
        <Button variant="outline" color="blue" size="xs" onClick={handleExportJson}>
          JSON 내보내기
        </Button>
        <Button variant="outline" color="cyan" size="xs" onClick={handleExportSimplifiedJson}>
          간략화 내보내기
        </Button>
        <FileButton resetRef={resetFileRef} onChange={handleImportJson} accept="application/json">
          {(props) => (
            <Button variant="outline" color="green" size="xs" {...props}>
              JSON 불러오기
            </Button>
          )}
        </FileButton>
      </Group>
      <Logo image={logo} />
      <Grid justify="center" align="center">
        <Grid.Col xs={12} md={3}>
          <ExplorerInfo
            statValues={statValues}
            onJobChange={handleJobChange}
            onAgeChange={handleAgeChange}
            onNameChange={handleNameChange}
            onPlayerChange={handlePlayerChange}
            onGenderChange={handleGenderChange}
            onResidenceChange={handleResidenceChange}
            onBirthplaceChange={handleBirthplaceChange}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={9}>
          <ExplorerTraits
            statPenaltyValues={statPenaltyValues}
            mobility={statValues.mobility}
            getAndSetStats={getAndSetStats}
            reloadStatBool={reloadStatBool}
            statValues={statValues}
          />
        </Grid.Col>
      </Grid>
      <AgePenaltySection
        statValues={statValues}
        statPenaltyValues={statPenaltyValues}
        setStatPenaltyValues={setStatPenaltyValues}
        educationBonusText={educationBonusText}
        setEducationBonusText={setEducationBonusText}
        reloadStatBool={reloadStatBool}
        setReloadStatBool={setReloadStatBool}
      />
      <ExplorerTraits2
        sizeValue2={statValues.size.value2}
        healthValue2={statValues.health.value2}
        mentalityValue2={statValues.mentality.value2}
        getAndSetStats={getAndSetStats}
      />
      <ExplorerSkills
        skillPoints={skillPoints}
        skillsParams={skillsParams}
        getAndSetSkills={getAndSetSkills}
        getBonus={getBonus}
        onChangeExpectedSkills={onChangeExpectedSkills}
        expectedSkills={expectedSkills}
        reloadState={reloadState}
        skillValues={skillValues}
        selectedDetailedSkills={selectedDetailedSkills}
        onDetailedKeyChange={handleDetailedKeyChange}
        onSkillPointsChange={handleSkillPointsChange}
      />
      <Grid justify="center" align="center">
        <Grid.Col xs={12} sm={6}>
          <ExplorerCombat
            combatStats={combatStats}
            dodgeValue={skillValues.dodge.valueAddedByBaseValue}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <ExplorerCredit creditInfo={creditInfo} />
        </Grid.Col>
      </Grid>

      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Popover position="top-end" shadow="xl" withArrow arrowSize={12}>
          <Popover.Target>
            <ActionIcon
              size={48}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              sx={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <Text fz={10} fw={700} sx={{ textAlign: 'center', lineHeight: 1.2 }}>
                기능
                <br />
                점수
              </Text>
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown
            sx={{
              background: 'linear-gradient(135deg, #1a1b1e 0%, #25262b 100%)',
              border: '1px solid #373A40',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <Stack spacing="sm">
              <Text
                fz="md"
                fw={600}
                sx={{ borderBottom: '1px solid #373A40', paddingBottom: '8px' }}
              >
                남은 기능 점수
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="sm" color="dimmed">
                    직업
                  </Text>
                  <Text fz="lg" fw={700} color="cyan">
                    {skillPoints.baseJob - skillPoints.job}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="sm" color="dimmed">
                    관심
                  </Text>
                  <Text fz="lg" fw={700} color="grape">
                    {skillPoints.baseInterest - skillPoints.interest}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Box>
    </Card>
  );
}
