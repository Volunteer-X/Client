export const Character = {
  Animal: 'Animal Welfare',
  Art: 'Art',
  Culture: 'Culture',
  Children: 'Children',
  Civil: 'Civil Rights',
  Disaster: 'Disaster',
  Economic: 'Economic',
  Education: 'Education',
  Environment: 'Environment',
  Health: 'Health',
  Human: 'Human Rights',
  Poverty: 'Poverty',
  Politics: 'Politics',
  Science: 'Science',
  Social: 'Social Services',
  Technology: 'Technology',
  Women: 'Women',
};

export const CharacterArr = [
  'Animal Welfare',
  'Art',
  'Culture',
  'Children',
  'Civil Rights',
  'Disaster',
  'Economic',
  'Education',
  'Environment',
  'Health',
  'Human Rights',
  'Poverty',
  'Politics',
  'Science',
  'Social',
  'Technology',
  'Women',
];

export enum ECharacter {
  Animal = 'Animal Welfare',
  Art = 'Art',
  Culture = 'Culture',
  Children = 'Children',
  Civil = 'Civil Rights',
  Disaster = 'Disaster',
  Economic = 'Economics',
  Education = 'Education',
  Environment = 'Environment',
  Health = 'Health',
  Human = 'Human Rights',
  Poverty = 'Poverty',
  Politics = 'Politics',
  Science = 'Science',
  Social = 'Social',
  Technology = 'Technology',
  Women = 'Women',
}
export enum ECharacterIcon {}

//Sample data

type CharacterProps = {
  label: string;
  icon: string;
};

export const characterSampleData: Array<CharacterProps> = [
  {
    label: ECharacter.Animal,
    icon: 'home',
  },
  {
    label: ECharacter.Art,
    icon: 'home',
  },
  {
    label: ECharacter.Culture,
    icon: 'home',
  },
  {
    label: ECharacter.Children,
    icon: 'home',
  },
  {
    label: ECharacter.Civil,
    icon: 'home',
  },
  {
    label: ECharacter.Disaster,
    icon: 'home',
  },
  {
    label: ECharacter.Economic,
    icon: 'home',
  },
  {
    label: ECharacter.Education,
    icon: 'home',
  },
  {
    label: ECharacter.Environment,
    icon: 'home',
  },
  {
    label: ECharacter.Health,
    icon: 'home',
  },
  {
    label: ECharacter.Human,
    icon: 'home',
  },
  {
    label: ECharacter.Poverty,
    icon: 'home',
  },
  {
    label: ECharacter.Politics,
    icon: 'home',
  },
  {
    label: ECharacter.Science,
    icon: 'home',
  },
  {
    label: ECharacter.Social,
    icon: 'home',
  },
  {
    label: ECharacter.Technology,
    icon: 'home',
  },
  {
    label: ECharacter.Women,
    icon: 'home',
  },
];
