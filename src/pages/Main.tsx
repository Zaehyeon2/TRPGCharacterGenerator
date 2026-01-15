import {
  Card,
  Text,
  Title,
  List,
  Space,
  Anchor,
  Image,
  Group,
  Center,
  Grid,
  Divider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import gitIcon from '../assets/github-mark-white.svg';
import mail from '../assets/mail.svg';

export function Main() {
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  return (
    <Card
      withBorder={isDesktop}
      radius={isDesktop ? 'md' : 0}
      sx={isDesktop ? {} : { border: 'none', backgroundColor: 'transparent' }}
    >
      <Title size="h1">TRPG Charactor Generator</Title>
      <Space h="xs" />
      <Text>개인적으로 사용하기 위해 개발한 TRPG 캐릭터 생성 도구 입니다.</Text>
      <Text>언제든 사용하셔도 좋습니다.</Text>
      <Text>다만, 룰북이 없는 게임 진행은 지양해주세요.</Text>
      <Space h="md" />
      <Divider />
      <Space h="md" />
      <Title size="h2">업데이트 내역</Title>
      <Space h="xs" />
      <Title size="h4">2026년 1월 15일</Title>
      <List size="sm">
        <List.Item>JSON 내보내기/불러오기 기능 추가</List.Item>
        <List.Item>간략화 내보내기 기능 추가 (AI 롤플레잉용)</List.Item>
      </List>
      <Space h="xs" />
      <Title size="h4">2026년 1월 14일</Title>
      <List size="sm">
        <List.Item>모바일/태블릿 반응형 레이아웃 지원</List.Item>
      </List>
      <Space h="md" />
      <Divider />
      <Space h="md" />
      <Grid justify="center" columns={12}>
        <Grid.Col span={6}>
          <Title size="h2">구현된 TRPG</Title>
          <Space h="xs" />
          <List>
            <List.Item>
              <Text>Call of Cthulhu</Text>
            </List.Item>
          </List>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title size="h2">구현할 TRPG</Title>
          <Space h="xs" />
          <List>
            <List.Item>
              <Text>Dungeon World</Text>
            </List.Item>
          </List>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Center>
        <Group>
          <Anchor
            href="https://github.com/Zaehyeon2/TRPGCharacterGenerator"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            <Image src={gitIcon} alt="github" width="50px" />
          </Anchor>
          <Anchor href="mailto:insam2802@gmail.com">
            <Image src={mail} alt="github" width="50px" />
          </Anchor>
        </Group>
      </Center>
    </Card>
  );
}
