import { IStats, IExpectedSkills, ReloadStateParams } from '../interfaces/interfaces';

export const INITIAL_STATS: IStats = {
  name: '',
  player: '',
  job: '',
  age: 0,
  gender: '',
  residence: '',
  birthplace: '',
  str: { value: 0, value2: 0 },
  dex: { value: 0, value2: 0 },
  int: { value: 0, value2: 0 },
  health: { value: 0, value2: 0 },
  appeareance: { value: 0, value2: 0 },
  mentality: { value: 0, value2: 0 },
  size: { value: 0, value2: 0 },
  education: { value: 0, value2: 0 },
  mobility: 0,
  luck: 0,
};

export const INITIAL_STAT_PENALTY = {
  str: 0,
  dex: 0,
  health: 0,
  size: 0,
  education: 0,
  appeareance: 0,
  total: 0,
};

export const INITIAL_EXPECTED_SKILLS: IExpectedSkills = {
  science50: false,
  science90: false,
  fighting50: false,
  fighting90: false,
  firearms50: false,
  firearms90: false,
  language50: false,
  language90: false,
  artcraft50: false,
  artcraft90: false,
  pilot50: false,
  pilot90: false,
  survival50: false,
  survival90: false,
};

export const INITIAL_SKILL_POINTS = {
  baseJob: 0,
  job: 0,
  baseInterest: 0,
  interest: 0,
};

export const INITIAL_RELOAD_STATE: ReloadStateParams = {
  science: false,
  fighting: false,
  firearms: false,
  language: false,
  artcraft: false,
  pilot: false,
  survival: false,
};

export interface StatConfig {
  statKey: string;
  label: string;
  nDices: number;
  nSides: number;
  baseValue?: number;
  multiplyValue: number;
  penaltyKey?: keyof typeof INITIAL_STAT_PENALTY;
}

export const STAT_CONFIGS: StatConfig[][] = [
  [
    { statKey: 'str', label: '근력', nDices: 3, nSides: 6, multiplyValue: 5, penaltyKey: 'str' },
    { statKey: 'dex', label: '민첩성', nDices: 3, nSides: 6, multiplyValue: 5, penaltyKey: 'dex' },
    { statKey: 'int', label: '지능', nDices: 2, nSides: 6, baseValue: 6, multiplyValue: 5 },
  ],
  [
    {
      statKey: 'health',
      label: '건강',
      nDices: 3,
      nSides: 6,
      baseValue: 0,
      multiplyValue: 5,
      penaltyKey: 'health',
    },
    {
      statKey: 'appeareance',
      label: '외모',
      nDices: 3,
      nSides: 6,
      multiplyValue: 5,
      penaltyKey: 'appeareance',
    },
    { statKey: 'mentality', label: '정신력', nDices: 3, nSides: 6, multiplyValue: 5 },
  ],
  [
    {
      statKey: 'size',
      label: '크기',
      nDices: 2,
      nSides: 6,
      baseValue: 6,
      multiplyValue: 5,
      penaltyKey: 'size',
    },
    {
      statKey: 'education',
      label: '교육',
      nDices: 2,
      nSides: 6,
      baseValue: 6,
      multiplyValue: 5,
      penaltyKey: 'education',
    },
  ],
];
