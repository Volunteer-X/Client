// export const picksLabel = {
//   Animal: 'Animal Welfare',
//   Art: 'Art',
//   Culture: 'Culture',
//   Children: 'Children',
//   Civil: 'Civil Rights',
//   Disaster: 'Disaster',
//   Economic: 'Economic',
//   Education: 'Education',
//   Environment: 'Environment',
//   Health: 'Health',
//   Human: 'Human Rights',
//   Poverty: 'Poverty',
//   Politics: 'Politics',
//   Science: 'Science',
//   Social: 'Social Services',
//   Technology: 'Technology',
//   Women: 'Women',
// };

export const PicksArray = [
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

export enum PicksLabel {
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
export enum PicksIcon {
  Animal = 'home',
  Art = 'home',
  Culture = 'home',
  Children = 'home',
  Civil = 'home',
  Disaster = 'home',
  Economic = 'home',
  Education = 'home',
  Environment = 'home',
  Health = 'home',
  Human = 'home',
  Poverty = 'home',
  Politics = 'home',
  Science = 'home',
  Social = 'home',
  Technology = 'home',
  Women = 'home',
}

//Sample data

export interface Pick {
  label: string;
  icon: string;
  isSelected: boolean;
}

export const Picks: Array<Pick> = [
  {
    label: PicksLabel.Animal,
    icon: PicksIcon.Animal,
    isSelected: false,
  },
  {
    label: PicksLabel.Art,
    icon: PicksIcon.Art,
    isSelected: false,
  },
  {
    label: PicksLabel.Culture,
    icon: PicksIcon.Culture,
    isSelected: false,
  },
  {
    label: PicksLabel.Children,
    icon: PicksIcon.Children,
    isSelected: false,
  },
  {
    label: PicksLabel.Civil,
    icon: PicksIcon.Civil,
    isSelected: false,
  },
  {
    label: PicksLabel.Disaster,
    icon: PicksIcon.Disaster,
    isSelected: false,
  },
  {
    label: PicksLabel.Economic,
    icon: PicksIcon.Economic,
    isSelected: false,
  },
  {
    label: PicksLabel.Education,
    icon: PicksIcon.Education,
    isSelected: false,
  },
  {
    label: PicksLabel.Environment,
    icon: PicksIcon.Environment,
    isSelected: false,
  },
  {
    label: PicksLabel.Health,
    icon: PicksIcon.Health,
    isSelected: false,
  },
  {
    label: PicksLabel.Human,
    icon: PicksIcon.Human,
    isSelected: false,
  },
  {
    label: PicksLabel.Poverty,
    icon: PicksIcon.Poverty,
    isSelected: false,
  },
  {
    label: PicksLabel.Politics,
    icon: PicksIcon.Politics,
    isSelected: false,
  },
  {
    label: PicksLabel.Science,
    icon: PicksIcon.Science,
    isSelected: false,
  },
  {
    label: PicksLabel.Social,
    icon: PicksIcon.Social,
    isSelected: false,
  },
  {
    label: PicksLabel.Technology,
    icon: PicksIcon.Technology,
    isSelected: false,
  },
  {
    label: PicksLabel.Women,
    icon: PicksIcon.Women,
    isSelected: false,
  },
];

console.log(Picks);
