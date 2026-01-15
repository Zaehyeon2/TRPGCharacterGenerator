import { DetailedSkillProps, SkillParams } from '../interfaces/interfaces';

export const detailedScience: DetailedSkillProps[] = [
  {
    label: '과학',
    key: 'science',
    baseValue: 0,
  },
  {
    label: '과학 (공학) (1%)',
    key: 'scienceEngineering',
    baseValue: 1,
  },
  {
    label: '과학 (기상학) (1%)',
    key: 'scienceMeteorology',
    baseValue: 1,
  },
  {
    label: '과학 (동물학) (1%)',
    key: 'scienceZoology',
    baseValue: 1,
  },
  {
    label: '과학 (물리학) (1%)',
    key: 'sciencePhysics',
    baseValue: 1,
  },
  {
    label: '과학 (생물학) (1%)',
    key: 'scienceBiology',
    baseValue: 1,
  },
  {
    label: '과학 (수사과학) (1%)',
    key: 'scienceForensicScience',
    baseValue: 1,
  },
  {
    label: '과학 (수학) (10%)',
    key: 'scienceMathematics',
    baseValue: 10,
  },
  {
    label: '과학 (식물학) (1%)',
    key: 'scienceBotany',
    baseValue: 1,
  },
  {
    label: '과학 (암호학) (1%)',
    key: 'scienceCryptology',
    baseValue: 1,
  },
  {
    label: '과학 (약학) (1%)',
    key: 'sciencePharmacy',
    baseValue: 1,
  },
  {
    label: '과학 (지질학) (1%)',
    key: 'scienceGeology',
    baseValue: 1,
  },
  {
    label: '과학 (천문학) (1%)',
    key: 'scienceAstronomy',
    baseValue: 1,
  },
  {
    label: '과학 (화학) (1%)',
    key: 'scienceChemistry',
    baseValue: 1,
  },
];

export const detailedFighting: DetailedSkillProps[] = [
  {
    label: '근접전',
    key: 'fighting',
    baseValue: 0,
  },
  {
    label: '근접전 (가롯테) (15%)',
    key: 'fightingGauntlet',
    baseValue: 15,
  },
  {
    label: '근접전 (격투) (25%)',
    key: 'fightingBrawl',
    baseValue: 25,
  },
  {
    label: '근접전 (도검) (20%)',
    key: 'fightingSword',
    baseValue: 20,
  },
  {
    label: '근접전 (도끼) (15%)',
    key: 'fightingAxe',
    baseValue: 15,
  },
  {
    label: '근접전 (도리깨) (10%)',
    key: 'fightingMace',
    baseValue: 10,
  },
  {
    label: '근접전 (동력톱) (10%)',
    key: 'fightingChainsaw',
    baseValue: 10,
  },
  {
    label: '근접전 (창) (20%)',
    key: 'fightingSpear',
    baseValue: 20,
  },
  {
    label: '근접전 (채찍) (5%)',
    key: 'fightingWhip',
    baseValue: 5,
  },
];

export const detailedFirearm: DetailedSkillProps[] = [
  {
    label: '사격',
    key: 'firearms',
    baseValue: 0,
  },
  {
    label: '사격 (권총) (20%)',
    key: 'firearmsHandgun',
    baseValue: 20,
  },
  {
    label: '사격 (기관단총) (15%)',
    key: 'firearmsSubmachineGun',
    baseValue: 15,
  },
  {
    label: '사격 (기관총) (10%)',
    key: 'firearmsMachineGun',
    baseValue: 10,
  },
  {
    label: '사격 (라이플/산탄총) (25%)',
    key: 'firearmsRifle',
    baseValue: 25,
  },
  {
    label: '사격 (중화기) (10%)',
    key: 'firearmsHeavyWeapon',
    baseValue: 10,
  },
  {
    label: '사격 (화염방사기) (10%)',
    key: 'firearmsFlamethrower',
    baseValue: 10,
  },
  {
    label: '사격 (활) (15%)',
    key: 'firearmsBow',
    baseValue: 15,
  },
];

export const detailedSurvive: DetailedSkillProps[] = [
  {
    label: '생존술',
    key: 'survival',
    baseValue: 0,
  },
  {
    label: '생존술 (사막) (10%)',
    key: 'survivalDesert',
    baseValue: 10,
  },
  {
    label: '생존술 (바다) (10%)',
    key: 'survivalSea',
    baseValue: 10,
  },
  {
    label: '생존술 (극지방) (10%)',
    key: 'survivalPolar',
    baseValue: 10,
  },
  {
    label: '생존술 (밀림) (10%)',
    key: 'survivalJungle',
    baseValue: 10,
  },
  {
    label: '생존술 (산악) (10%)',
    key: 'survivalMountain',
    baseValue: 10,
  },
];

export const detailedArtcraft: DetailedSkillProps[] = [
  {
    label: '예술/공예',
    key: 'artcraft',
    baseValue: 0,
  },
  {
    label: '예술/공예 (도색 및 실내장식) (5%)',
    key: 'artcraftPainting',
    baseValue: 5,
  },
  {
    label: '예술/공예 (도예) (5%)',
    key: 'artcraftPottery',
    baseValue: 5,
  },
  {
    label: '예술/공예 (모리스 댄스) (5%)',
    key: 'artcraftMorrisDance',
    baseValue: 5,
  },
  {
    label: '예술/공예 (목수) (5%)',
    key: 'artcraftCarpentry',
    baseValue: 5,
  },
  {
    label: '예술/공예 (무용) (5%)',
    key: 'artcraftDance',
    baseValue: 5,
  },
  {
    label: '예술/공예 (미술) (5%)',
    key: 'artcraftArt',
    baseValue: 5,
  },
  {
    label: '예술/공예 (사진) (5%)',
    key: 'artcraftPhotography',
    baseValue: 5,
  },
  {
    label: '예술/공예 (서예) (5%)',
    key: 'artcraftCalligraphy',
    baseValue: 5,
  },
  {
    label: '예술/공예 (연기) (5%)',
    key: 'artcraftActing',
    baseValue: 5,
  },
  {
    label: '예술/공예 (오페라 성악) (5%)',
    key: 'artcraftOpera',
    baseValue: 5,
  },
  {
    label: '예술/공예 (요리) (5%)',
    key: 'artcraftCooking',
    baseValue: 5,
  },
  {
    label: '예술/공예 (위조) (5%)',
    key: 'artcraftForgery',
    baseValue: 5,
  },
  {
    label: '예술/공예 (이발) (5%)',
    key: 'artcraftBarber',
    baseValue: 5,
  },
  {
    label: '예술/공예 (작가) (5%))',
    key: 'artcraftWriting',
    baseValue: 5,
  },
  {
    label: '예술/공예 (조각) (5%)',
    key: 'artcraftSculpture',
    baseValue: 5,
  },
  {
    label: '예술/공예 (진공관 제작) (5%)',
    key: 'artcraftVacuumTube',
    baseValue: 5,
  },
];

export const detailedPilot: DetailedSkillProps[] = [
  {
    label: '조종',
    key: 'pilot',
    baseValue: 0,
  },
  {
    label: '조종 (항공기) (1%)',
    key: 'pilotAircraft',
    baseValue: 1,
  },
  {
    label: '조종 (선박) (1%)',
    key: 'pilotShip',
    baseValue: 1,
  },
  {
    label: '조종 (비행선) (1%)',
    key: 'pilotAirship',
    baseValue: 1,
  },
  {
    label: '조종 (보트) (1%)',
    key: 'pilotBoat',
    baseValue: 1,
  },
  {
    label: '조종 (??) (1%)',
    key: 'pilotSomething',
    baseValue: 1,
  },
];

export const rareSkills: DetailedSkillProps[] = [
  {
    label: '기타',
    key: 'rare',
    baseValue: 0,
  },
  {
    label: '독순술 (1%)',
    key: 'lipReading',
    baseValue: 1,
  },
  {
    label: '동물 다루기 (5%)',
    key: 'animalHandling',
    baseValue: 5,
  },
  {
    label: '비밀지식 (꿈) (1%)',
    key: 'secretKnowledgeDream',
    baseValue: 1,
  },
  {
    label: '비밀지식 (네크로노미콘) (1%)',
    key: 'secretKnowledgeNecronomicon',
    baseValue: 1,
  },
  {
    label: '비밀지식 (UFO) (1%)',
    key: 'secretKnowledgeUFO',
    baseValue: 1,
  },
  {
    label: '비밀지식 (뱀파이어) (1%)',
    key: 'secretKnowledgeVampire',
    baseValue: 1,
  },
  {
    label: '비밀지식 (늑대인간) (1%)',
    key: 'secretKnowledgeWerewolf',
    baseValue: 1,
  },
  {
    label: '비밀지식 (야디스) (1%)',
    key: 'secretKnowledgeYidhra',
    baseValue: 1,
  },
  {
    label: '승마 (5%)',
    key: 'ride',
    baseValue: 5,
  },
  {
    label: '잠수 (1%)',
    key: 'scubaDiving',
    baseValue: 1,
  },
  {
    label: '최면술 (1%)',
    key: 'hypnosis',
    baseValue: 1,
  },
  {
    label: '포격 (1%)',
    key: 'artillery',
    baseValue: 1,
  },
  {
    label: '폭파 (1%)',
    key: 'demolitions',
    baseValue: 1,
  },
];

export const skillsParamsFunction = (dex: number, education: number): SkillParams[][] => {
  return [
    // first row
    [
      {
        value: 0,
        label: '감정',
        skillKey: 'appraise',
        baseValue: 5,
      },
      {
        value: 0,
        label: '고고학',
        skillKey: 'archaeology',
        baseValue: 1,
      },
      {
        value: 0,
        label: '과학 (1)',
        skillKey: 'science1',
        baseValue: 1,
      },
      {
        value: 0,
        label: '과학 (2)',
        skillKey: 'science2',
        baseValue: 1,
      },
      {
        value: 0,
        label: '과학 (3)',
        skillKey: 'science3',
        baseValue: 1,
      },
      {
        value: 0,
        label: '관찰력',
        skillKey: 'spotHidden',
        baseValue: 25,
      },
      {
        value: 0,
        label: '근접전 (1)',
        skillKey: 'fighting1',
        baseValue: 25,
      },
      {
        value: 0,
        label: '근접전 (2)',
        skillKey: 'fighting2',
        baseValue: 25,
      },
      {
        value: 0,
        label: '근접전 (3)',
        skillKey: 'fighting3',
        baseValue: 25,
      },
      {
        value: 0,
        label: '기계수리',
        skillKey: 'mechanicalRepair',
        baseValue: 10,
      },
      {
        value: 0,
        label: '도약',
        skillKey: 'jump',
        baseValue: 20,
      },
      {
        value: 0,
        label: '듣기',
        skillKey: 'listen',
        baseValue: 20,
      },
      {
        value: 0,
        label: '말재주',
        skillKey: 'fastTalk',
        baseValue: 5,
      },
      {
        value: 0,
        label: '매혹',
        skillKey: 'charm',
        baseValue: 15,
      },
      {
        value: 0,
        label: '법률',
        skillKey: 'law',
        baseValue: 5,
      },
    ],
    // second row
    [
      {
        value: 0,
        label: '변장',
        skillKey: 'disguise',
        baseValue: 5,
      },
      {
        value: 0,
        label: '사격 (1)',
        skillKey: 'firearms1',
        baseValue: 20,
      },
      {
        value: 0,
        label: '사격 (2)',
        skillKey: 'firearms2',
        baseValue: 25,
      },
      {
        value: 0,
        label: '사격 (3)',
        skillKey: 'firearms3',
        baseValue: 1,
      },
      {
        value: 0,
        label: '생존술 (??)',
        skillKey: 'survival1',
        baseValue: 10,
      },
      {
        value: 0,
        label: '설득',
        skillKey: 'persuade',
        baseValue: 10,
      },
      {
        value: 0,
        label: '손놀림',
        skillKey: 'sleightOfHand',
        baseValue: 10,
      },
      {
        value: 0,
        label: '수영',
        skillKey: 'swim',
        baseValue: 20,
      },
      {
        value: 0,
        label: '심리학',
        skillKey: 'psychology',
        baseValue: 10,
      },
      {
        value: 0,
        label: '언어 (모국어)',
        skillKey: 'languageOwn',
        baseValue: education,
      },
      {
        value: 0,
        label: '언어 (외국어1)',
        skillKey: 'languageOther1',
        baseValue: 1,
      },
      {
        value: 0,
        label: '언어 (외국어2)',
        skillKey: 'languageOther2',
        baseValue: 1,
      },
      {
        value: 0,
        label: '언어 (외국어3)',
        skillKey: 'languageOther3',
        baseValue: 1,
      },
      {
        value: 0,
        label: '역사',
        skillKey: 'history',
        baseValue: 5,
      },
      {
        value: 0,
        label: '열쇠공',
        skillKey: 'locksmith',
        baseValue: 1,
      },
    ],
    // third row
    [
      {
        value: 0,
        label: '예술/공예 (1)',
        skillKey: 'artcraft1',
        baseValue: 5,
      },
      {
        value: 0,
        label: '예술/공예 (2)',
        skillKey: 'artcraft2',
        baseValue: 5,
      },
      {
        value: 0,
        label: '예술/공예 (3)',
        skillKey: 'artcraft3',
        baseValue: 5,
      },
      {
        value: 0,
        label: '오르기',
        skillKey: 'climb',
        baseValue: 20,
      },
      {
        value: 0,
        label: '오컽트',
        skillKey: 'occult',
        baseValue: 5,
      },
      {
        value: 0,
        label: '위협',
        skillKey: 'intimidate',
        baseValue: 15,
      },
      {
        value: 0,
        label: '은밀행동',
        skillKey: 'stealth',
        baseValue: 20,
      },
      {
        value: 0,
        label: '응급처치',
        skillKey: 'firstAid',
        baseValue: 30,
      },
      {
        value: 0,
        label: '의료',
        skillKey: 'medicine',
        baseValue: 1,
      },
      {
        value: 0,
        label: '인류학',
        skillKey: 'anthropology',
        baseValue: 1,
      },
      {
        value: 0,
        label: '자동차운전',
        skillKey: 'driveAuto',
        baseValue: 20,
      },
      {
        value: 0,
        label: '자료조사',
        skillKey: 'libraryUse',
        baseValue: 20,
      },
      {
        value: 0,
        label: '자연',
        skillKey: 'naturalWorld',
        baseValue: 10,
      },
      {
        value: 0,
        label: '재력',
        skillKey: 'credit',
        baseValue: 0,
        checkboxDisabled: true,
      },
      {
        value: 0,
        label: '전기수리',
        skillKey: 'electricalRepair',
        baseValue: 10,
      },
    ],
    // fourth row
    [
      {
        value: 0,
        label: '전자기기',
        skillKey: 'operateElectronics',
        baseValue: 1,
      },
      {
        value: 0,
        label: '정신분석',
        skillKey: 'psychoanalysis',
        baseValue: 1,
      },
      {
        value: 0,
        label: '조종 (1)',
        skillKey: 'pilot1',
        baseValue: 1,
      },
      {
        value: 0,
        label: '중장비조작',
        skillKey: 'operateHeavyMachine',
        baseValue: 1,
      },
      {
        value: 0,
        label: '추적',
        skillKey: 'track',
        baseValue: 10,
      },
      {
        value: 0,
        label: '컴퓨터사용',
        skillKey: 'operateComputer',
        baseValue: 5,
      },
      {
        value: 0,
        label: '크툴루신화',
        skillKey: 'cthulhuMythos',
        baseValue: 0,
        checkboxDisabled: true,
      },
      {
        value: 0,
        label: '투척',
        skillKey: 'throw',
        baseValue: 20,
      },
      {
        value: 0,
        label: '항법',
        skillKey: 'navigate',
        baseValue: 10,
      },
      {
        value: 0,
        label: '회계',
        skillKey: 'accounting',
        baseValue: 5,
      },
      {
        value: 0,
        label: '회피',
        skillKey: 'dodge',
        baseValue: Math.floor(dex / 2),
      },
      {
        value: 0,
        label: 'something1',
        skillKey: 'rare1',
        baseValue: 20,
      },
      {
        value: 0,
        label: 'something2',
        skillKey: 'rare2',
        baseValue: 20,
      },
      {
        value: 0,
        label: 'something3',
        skillKey: 'rare3',
        baseValue: 20,
      },
      {
        value: 0,
        label: 'something4',
        skillKey: 'rare4',
        baseValue: 20,
      },
    ],
  ];
};
