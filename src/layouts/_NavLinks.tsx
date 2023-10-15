import { UnstyledButton, Group, Text, ThemeIcon, Box, Collapse } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import character from '../assets/character.svg';
import chevron from '../assets/chevron.svg';
import cthulhu from '../assets/cthulhu.svg';
import dungeonGate from '../assets/dungeon-gate.svg';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      to={link}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <img src={cthulhu} alt="cthulhu" />,
    color: '#000000',
    label: 'Call of Cthulhu',
    link: '/coc',
  },
  {
    icon: <img src={dungeonGate} alt="dungeonGate" />,
    color: '#000000',
    label: 'Dungeon World',
    link: '/dw',
  },
];

export function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
