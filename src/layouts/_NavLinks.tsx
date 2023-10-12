import { UnstyledButton, Group, Text, ThemeIcon, Box, Collapse } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import character from '../assets/character.svg';
import chevron from '../assets/chevron.svg';
import cthulhu from '../assets/cthulhu.svg';
import dungeonGate from '../assets/dungeon-gate.svg';

interface LinksGroupProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  links: { icon: React.ReactNode; label: string; link: string }[];
}

export function LinksGroup({ icon, color, label, links }: LinksGroupProps) {
  const [opened, setOpened] = useState(false);
  const items = links.map((inlink) => (
    <Text
      size="sm"
      component={Link}
      to={inlink.link}
      key={inlink.label}
      align="left"
      sx={(theme) => ({
        paddingLeft: 31,
        marginLeft: 30,
        borderLeft: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        display: 'block',
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
          {inlink.icon}
        </ThemeIcon>
        {inlink.label}{' '}
      </Group>
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        component={Link}
        to="#"
        onClick={() => setOpened((o) => !o)}
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
        <Group position="left" spacing={0}>
          <Box
            sx={(theme) => ({
              display: 'block',
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
          </Box>

          <ThemeIcon
            color={color}
            variant="light"
            sx={(theme) => ({
              marginLeft: 'auto',
              transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              transition: 'transform 200ms ease',
            })}
          >
            <img src={chevron} alt="chevron" />
          </ThemeIcon>
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>{items}</Collapse>
    </>
  );
}

const data = [
  {
    icon: <img src={cthulhu} alt="cthulhu" />,
    color: '#000000',
    label: 'Call of Cthulhu',
    links: [
      {
        icon: <img src={character} alt="character" />,
        label: 'Character Generator',
        link: '/coc/generator',
      },
    ],
  },
  {
    icon: <img src={dungeonGate} alt="dungeonGate" />,
    color: '#000000',
    label: 'Dungeon World',
    links: [
      {
        icon: <img src={character} alt="character" />,
        label: 'Character Generator',
        link: '/dw/generator',
      },
    ],
  },
];

export function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);
  return <div>{links}</div>;
}
