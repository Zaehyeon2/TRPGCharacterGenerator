import { Box, Center, ScrollArea, Table, TextInput, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Weapons } from '../interfaces/interfaces';

interface WeaponsTableProps {
  weapons: Weapons[];
}

const stickyColumnStyle = {
  position: 'sticky' as const,
  left: 0,
  backgroundColor: '#1a1b1e',
  zIndex: 1,
  borderRight: '1px solid #373A40',
};

export function WeaponsTable({ weapons }: WeaponsTableProps) {
  const [searchedWeapons, setSearchedWeapons] = useState<Weapons[]>(weapons);

  function filterData(data: Weapons[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) => item.name.toLowerCase().includes(query));
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchedWeapons(filterData(weapons, value));
  };

  const rows = searchedWeapons.map((weapon: Weapons) => {
    const price = {
      price1920: `💲${weapon.price1920.toLocaleString()}`,
      priceModern: `💲${weapon.priceModern.toLocaleString()}`,
    };

    if (weapon.price1920 === 0) {
      price.price1920 = '-';
    }
    if (weapon.priceModern === 0) {
      price.priceModern = '-';
    }
    return (
      <tr key={weapon.name}>
        <td style={stickyColumnStyle}>{weapon.name}</td>
        <td>{weapon.function}</td>
        <td>{weapon.damage}</td>
        <td>{weapon.range}</td>
        <td>{weapon.usePerRound}</td>
        <td>{weapon.ammo}</td>
        <td>
          {price.price1920} / {price.priceModern}
        </td>
        <td>{weapon.breakDown}</td>
        <td>{weapon.age}</td>
      </tr>
    );
  });

  return (
    <>
      <TextInput
        placeholder="이름으로 검색"
        mb="md"
        icon={<IconSearch style={{ width: 16, height: 16 }} stroke={1.5} />}
        onChange={handleSearchChange}
        sx={{ marginTop: '1rem' }}
      />
      <ScrollArea type="auto">
        <Box sx={{ minWidth: 800 }}>
          <Table verticalSpacing="xs" fontSize="xs" striped>
            <thead>
              <tr>
                <th style={stickyColumnStyle}>
                  <Center>이름</Center>
                </th>
                <th>
                  <Center>기능</Center>
                </th>
                <th>
                  <Center>피해</Center>
                </th>
                <th>
                  <Center>기본 거리</Center>
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  <Center>라운드당</Center>
                  <Center>사용횟수</Center>
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  <Center>장탄수</Center>
                  <Center>(탄창)</Center>
                </th>
                <th>
                  <Center>가격</Center>
                  <Center>(20년대/현대)</Center>
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  <Center>고장</Center>
                </th>
                <th>
                  <Center>사용 시대</Center>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </ScrollArea>
      <Text fz="xs" color="slategray" sx={{ wordBreak: 'keep-all' }}>
        ❗은 치명타 가능 무기 (극단적 성공시 최대 피해 + 피해 보너스를 제외한 피해 주사위, 반격시
        제외)
      </Text>
      <Text fz="xs" color="slategray">
        ⚠은 수호자 룰북 설명 참고
      </Text>
    </>
  );
}
