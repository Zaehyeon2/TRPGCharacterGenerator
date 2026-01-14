import { Group, Stack, Text, TextInput } from '@mantine/core';
import React from 'react';
import { IStats } from '../../interfaces/interfaces';
import { isNumber } from '../../services/utils.service';
import { explorerStyles } from '../../styles/styles';

interface ExplorerInfoProps {
  statValues: IStats;
  onJobChange: (job: string) => void;
  onAgeChange: (age: number) => void;
}

export const ExplorerInfo = React.memo(function ExplorerInfo({
  statValues,
  onJobChange,
  onAgeChange,
}: ExplorerInfoProps) {
  const { classes } = explorerStyles();

  const InfoField = ({
    label,
    value,
    onChange,
    readOnly = false,
  }: {
    label: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
  }) => (
    <Group sx={{ margin: 'auto' }} spacing="xs">
      <Text className={classes.label} fz="xs">
        {label}
      </Text>
      <TextInput
        size="xs"
        sx={{ width: '60%' }}
        value={value ?? ''}
        onChange={onChange ? (e) => onChange(e.currentTarget.value) : undefined}
        readOnly={readOnly}
      />
    </Group>
  );

  return (
    <Stack spacing="xs" sx={{ border: 'solid', paddingBottom: '10px', height: '330px' }}>
      <Text sx={{ backgroundColor: 'black', width: '100%' }}>현대 탐사자</Text>
      <InfoField label="이름" />
      <InfoField label="플레이어" />
      <InfoField label="직업" value={statValues.job} onChange={onJobChange} />
      <InfoField
        label="나이"
        value={statValues.age}
        onChange={(val) => {
          if (isNumber(val)) onAgeChange(+val);
        }}
      />
      <InfoField label="성별" />
      <InfoField label="거주지" />
      <InfoField label="출생지" />
    </Stack>
  );
});
