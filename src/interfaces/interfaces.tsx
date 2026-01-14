export interface IStats {
  job: string;
  age: number;
  str: IInnerStats;
  dex: IInnerStats;
  int: IInnerStats;
  health: IInnerStats;
  appeareance: IInnerStats;
  mentality: IInnerStats;
  size: IInnerStats;
  education: IInnerStats;
  mobility: number;
  luck: number;
}

export interface IInnerStats {
  value: number;
  value2: number;
}

export interface IInnerSkills {
  value: number;
  valueAddedByBaseValue: number;
  isChecked: boolean;
}

export interface ISkills {
  [index: string]: IInnerSkills;
  // 감정
  appraise: IInnerSkills;
  // 고고학
  archaeology: IInnerSkills;
  // 과학 (공학)
  scienceEngineering: IInnerSkills;
  // 과학 (기상학)
  scienceMeteorology: IInnerSkills;
  // 과학 (동물학)
  scienceZoology: IInnerSkills;
  // 과학 (물리학)
  sciencePhysics: IInnerSkills;
  // 과학 (생물학)
  scienceBiology: IInnerSkills;
  // 과학 (수사과학)
  scienceForensicScience: IInnerSkills;
  // 과학 (수학)
  scienceMathematics: IInnerSkills;
  // 과학 (식물학)
  scienceBotany: IInnerSkills;
  // 과학 (암호학)
  scienceCryptology: IInnerSkills;
  // 과학 (약학)
  sciencePharmacy: IInnerSkills;
  // 과학 (지질학)
  scienceGeology: IInnerSkills;
  // 과학 (천문학)
  scienceAstronomy: IInnerSkills;
  // 과학 (화학)
  scienceChemistry: IInnerSkills;
  // 관찰력
  spotHidden: IInnerSkills;
  // 근접전 (가롯테)
  fightingGauntlet: IInnerSkills;
  // 근접전 (격투)
  fightingBrawl: IInnerSkills;
  // 근접전 (도검)
  fightingSword: IInnerSkills;
  // 근접전 (도끼)
  fightingAxe: IInnerSkills;
  // 근접전 (도리깨)
  fightingMace: IInnerSkills;
  // 근접전 (동력톱)
  fightingChainsaw: IInnerSkills;
  // 근접전 (창)
  fightingSpear: IInnerSkills;
  // 근접전 (채찍)
  fightingWhip: IInnerSkills;
  // 기계수리
  mechanicalRepair: IInnerSkills;
  // 도약
  jump: IInnerSkills;
  // 독순술
  lipReading: IInnerSkills;
  // 동물 다루기
  animalHandling: IInnerSkills;
  // 듣기
  listen: IInnerSkills;
  // 말재주
  fastTalk: IInnerSkills;
  // 매혹
  charm: IInnerSkills;
  // 법률
  law: IInnerSkills;
  // 변장
  disguise: IInnerSkills;
  // 비밀 지식 (꿈)
  secretKnowledgeDream: IInnerSkills;
  // 비밀 지식 (네트로노미콘)
  secretKnowledgeNecronomicon: IInnerSkills;
  // 비밀 지식 (UFO)
  secretKnowledgeUFO: IInnerSkills;
  // 비밀 지식 (뱀파이어)
  secretKnowledgeVampire: IInnerSkills;
  // 비밀 지식 (늑대인간)
  secretKnowledgeWerewolf: IInnerSkills;
  // 비밀 지식 (야디스)
  secretKnowledgeYidhra: IInnerSkills;
  // 사격 (권총)
  firearmsHandgun: IInnerSkills;
  // 사격 (기관단총)
  firearmsSubmachineGun: IInnerSkills;
  // 사격 (기관총)
  firearmsMachineGun: IInnerSkills;
  // 사격 (라이플/산탄총)
  firearmsRifle: IInnerSkills;
  // 사격 (중화기)
  firearmsHeavyWeapon: IInnerSkills;
  // 사격 (화염방사기)
  firearmsFlamethrower: IInnerSkills;
  // 사격 (활)
  firearmsBow: IInnerSkills;
  // 생존슬 (사막)
  survivalDesert: IInnerSkills;
  // 생존슬 (바다)
  survivalSea: IInnerSkills;
  // 생존슬 (극지방)
  survivalPolar: IInnerSkills;
  // 생존슬 (밀림)
  survivalJungle: IInnerSkills;
  // 생존슬 (산악)
  survivalMountain: IInnerSkills;
  // 설득
  persuade: IInnerSkills;
  // 손놀림
  sleightOfHand: IInnerSkills;
  // 수영
  swim: IInnerSkills;
  // 승마
  ride: IInnerSkills;
  // 심리학
  psychology: IInnerSkills;
  // 언어 (모국어)
  languageOwn: IInnerSkills;
  // 언어 (외국어1)
  languageOther1: IInnerSkills;
  // 언어 (외국어2)
  languageOther2: IInnerSkills;
  // 언어 (외국어3)
  languageOther3: IInnerSkills;
  // 역사
  history: IInnerSkills;
  // 열쇠공
  locksmith: IInnerSkills;
  // 예술/공예 (도색 및 실내장식)
  artcraftPainting: IInnerSkills;
  // 예술/공예 (도예)
  artcraftPottery: IInnerSkills;
  // 예술/공예 (모리스 댄스)
  artcraftMorrisDance: IInnerSkills;
  // 예술/공예 (목수)
  artcraftCarpentry: IInnerSkills;
  // 예술/공예 (무용)
  artcraftDance: IInnerSkills;
  // 예술/공예 (미술)
  artcraftArt: IInnerSkills;
  // 예술/공예 (사진)
  artcraftPhotography: IInnerSkills;
  // 예술/공예 (서예)
  artcraftCalligraphy: IInnerSkills;
  // 예술/공예 (연기)
  artcraftActing: IInnerSkills;
  // 예술/공예 (오페라 성악)
  artcraftOpera: IInnerSkills;
  // 예술/공예 (요리)
  artcraftCooking: IInnerSkills;
  // 예술/공예 (위조)
  artcraftForgery: IInnerSkills;
  // 예술/공예 (이발)
  artcraftBarber: IInnerSkills;
  // 예술/공예 (작가)
  artcraftWriting: IInnerSkills;
  // 예술/공예 (조각)
  artcraftSculpture: IInnerSkills;
  // 예술/공예 (진공관 제작)
  artcraftVacuumTube: IInnerSkills;
  // 오르기
  climb: IInnerSkills;
  // 오컬트
  occult: IInnerSkills;
  // 위협
  intimidate: IInnerSkills;
  // 은밀행동
  stealth: IInnerSkills;
  // 응급처치
  firstAid: IInnerSkills;
  // 의료
  medicine: IInnerSkills;
  // 인류학
  anthropology: IInnerSkills;
  // 자동차 운전
  driveAuto: IInnerSkills;
  // 자료조사
  libraryUse: IInnerSkills;
  // 자연
  naturalWorld: IInnerSkills;
  // 잠수
  scubaDiving: IInnerSkills;
  // 재력
  credit: IInnerSkills;
  // 전기수리
  electricalRepair: IInnerSkills;
  // 전자기기
  operateElectronics: IInnerSkills;
  // 정신분석
  psychoanalysis: IInnerSkills;
  // 조종 (항공기)
  pilotAircraft: IInnerSkills;
  // 조종 (선박)
  pilotShip: IInnerSkills;
  // 조종 (비행선)
  pilotAirship: IInnerSkills;
  // 조종 (??)
  pilotSomething: IInnerSkills;
  // 조종 (보트)
  pilotBoat: IInnerSkills;
  // 중장비 조작
  operateHeavyMachine: IInnerSkills;
  // 최면술
  hypnosis: IInnerSkills;
  // 추적
  track: IInnerSkills;
  // 컴퓨터 사용
  operateComputer: IInnerSkills;
  // 크툴루신화
  cthulhuMythos: IInnerSkills;
  // 투척
  throw: IInnerSkills;
  // 포격
  artillery: IInnerSkills;
  // 폭파
  demolitions: IInnerSkills;
  // 항법
  navigate: IInnerSkills;
  // 회계
  accounting: IInnerSkills;
  // 회피
  dodge: IInnerSkills;
}

export interface SkillProps {
  value: number;
  valueAddedByBaseValue: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
  isClassTraits: boolean;
  detailedKey: string;
  baseValue: number;
}

export interface DetailedSkillProps {
  label: string;
  key: string;
  baseValue: number;
}

export interface ReloadStateParams {
  [index: string]: boolean;
  science: boolean;
  fighting: boolean;
  firearms: boolean;
  language: boolean;
  artcraft: boolean;
  pilot: boolean;
  survival: boolean;
}

export interface SkillParams {
  value: number;
  skillKey: string;
  label: string;
  baseValue: number;
  checkboxDisabled?: boolean;
  getAndSetFunction?: (key: string, value: IInnerSkills | undefined) => void;
  bonus50?: boolean;
  bonus90?: boolean;
  reloadState?: ReloadStateParams;
}

export interface SkillParamsItem {
  value: number;
  skillKey: string;
  label: string;
  baseValue: number;
  checkboxDisabled?: boolean;
}

export interface Weapons {
  name: string;
  function: string;
  damage: string;
  range: string;
  usePerRound: string;
  ammo: string;
  price1920: number;
  priceModern: number;
  breakDown: string;
  age: string;
}

export interface IExpcetedSkills {
  [index: string]: boolean;
  science50: boolean;
  science90: boolean;
  fighting50: boolean;
  fighting90: boolean;
  firearms50: boolean;
  firearms90: boolean;
  language50: boolean;
  language90: boolean;
  artcraft50: boolean;
  artcraft90: boolean;
  pilot50: boolean;
  pilot90: boolean;
  survival50: boolean;
  survival90: boolean;
}
