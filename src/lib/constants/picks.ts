export const Picks = {
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

export type PicksProps = {
  label: string;
  icon: string;
  isSelected: boolean;
};

export const PICKS_DATA: Array<PicksProps> = [
  {
    label: EPicks.Animal,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Art,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Culture,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Children,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Civil,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Disaster,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Economic,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Education,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Environment,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Health,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Human,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Poverty,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Politics,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Science,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Social,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Technology,
    icon: 'home',
    isSelected: false,
  },
  {
    label: EPicks.Women,
    icon: 'home',
    isSelected: false,
  },
];
