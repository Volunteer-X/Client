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

export enum EPicks {
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
export enum EPickIcon {}

//Sample data

type PicksProps = {
  label: string;
  icon: string;
};

export const PICKS_DATA: Array<PicksProps> = [
  {
    label: EPicks.Animal,
    icon: 'home',
  },
  {
    label: EPicks.Art,
    icon: 'home',
  },
  {
    label: EPicks.Culture,
    icon: 'home',
  },
  {
    label: EPicks.Children,
    icon: 'home',
  },
  {
    label: EPicks.Civil,
    icon: 'home',
  },
  {
    label: EPicks.Disaster,
    icon: 'home',
  },
  {
    label: EPicks.Economic,
    icon: 'home',
  },
  {
    label: EPicks.Education,
    icon: 'home',
  },
  {
    label: EPicks.Environment,
    icon: 'home',
  },
  {
    label: EPicks.Health,
    icon: 'home',
  },
  {
    label: EPicks.Human,
    icon: 'home',
  },
  {
    label: EPicks.Poverty,
    icon: 'home',
  },
  {
    label: EPicks.Politics,
    icon: 'home',
  },
  {
    label: EPicks.Science,
    icon: 'home',
  },
  {
    label: EPicks.Social,
    icon: 'home',
  },
  {
    label: EPicks.Technology,
    icon: 'home',
  },
  {
    label: EPicks.Women,
    icon: 'home',
  },
];
