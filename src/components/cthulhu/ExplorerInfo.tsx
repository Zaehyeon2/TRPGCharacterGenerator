import { Group, Stack, Text, TextInput } from '@mantine/core';
import React from 'react';
import { IStats } from '../../interfaces/interfaces';
import { isNumber } from '../../services/utils.service';
import { explorerStyles } from '../../styles/styles';

interface InfoFieldProps {
  label: string;
  value?: string | number;
  onChange?: (value: string) => void;
  labelClassName: string;
}

const InfoField = React.memo(function InfoField({
  label,
  value,
  onChange,
  labelClassName,
}: InfoFieldProps) {
  return (
    <Group sx={{ margin: 'auto' }} spacing="xs">
      <Text className={labelClassName} fz="xs">
        {label}
      </Text>
      <TextInput
        size="xs"
        sx={{ width: '60%' }}
        value={value ?? ''}
        onChange={onChange ? (e) => onChange(e.currentTarget.value) : undefined}
      />
    </Group>
  );
});

interface ExplorerInfoProps {
  statValues: IStats;
  onJobChange: (job: string) => void;
  onAgeChange: (age: number) => void;
  onNameChange: (name: string) => void;
  onPlayerChange: (player: string) => void;
  onGenderChange: (gender: string) => void;
  onResidenceChange: (residence: string) => void;
  onBirthplaceChange: (birthplace: string) => void;
}

export const ExplorerInfo = React.memo(function ExplorerInfo({
  statValues,
  onJobChange,
  onAgeChange,
  onNameChange,
  onPlayerChange,
  onGenderChange,
  onResidenceChange,
  onBirthplaceChange,
}: ExplorerInfoProps) {
  const { classes } = explorerStyles();

  const handleAgeChange = React.useCallback(
    (val: string) => {
      if (val === '' || isNumber(val)) {
        onAgeChange(val === '' ? 0 : +val);
      }
    },
    [onAgeChange],
  );

  return (
    <Stack spacing="xs" sx={{ border: 'solid', paddingBottom: '10px', minHeight: '330px' }}>
      <Text sx={{ backgroundColor: 'black', width: '100%' }}>현대 탐사자</Text>
      <InfoField
        label="이름"
        value={statValues.name}
        onChange={onNameChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="플레이어"
        value={statValues.player}
        onChange={onPlayerChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="직업"
        value={statValues.job}
        onChange={onJobChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="나이"
        value={statValues.age || ''}
        onChange={handleAgeChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="성별"
        value={statValues.gender}
        onChange={onGenderChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="거주지"
        value={statValues.residence}
        onChange={onResidenceChange}
        labelClassName={classes.label}
      />
      <InfoField
        label="출생지"
        value={statValues.birthplace}
        onChange={onBirthplaceChange}
        labelClassName={classes.label}
      />
    </Stack>
  );
});
