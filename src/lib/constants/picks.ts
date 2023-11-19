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
export enum EPicksIcon {
  Animal = 'animal',
  Art = 'art',
  Children = 'children',
  Culture = 'culture',
  Civil = 'civil',
  Disaster = 'disaster',
  Economic = 'economic',
  Education = 'education',
  Environment = 'environment',
  Health = 'health',
  Human = 'human',
  Poverty = 'poverty',
  Politics = 'politics',
  Science = 'science',
  Social = 'social',
  Technology = 'technology',
  Women = 'women',
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
    icon: EPicksIcon.Animal,
    isSelected: false,
  },
  {
    label: PicksLabel.Art,
    icon: EPicksIcon.Art,
    isSelected: false,
  },
  {
    label: PicksLabel.Culture,
    icon: EPicksIcon.Culture,
    isSelected: false,
  },
  {
    label: PicksLabel.Children,
    icon: EPicksIcon.Children,
    isSelected: false,
  },
  {
    label: PicksLabel.Civil,
    icon: EPicksIcon.Civil,
    isSelected: false,
  },
  {
    label: PicksLabel.Disaster,
    icon: EPicksIcon.Disaster,
    isSelected: false,
  },
  {
    label: PicksLabel.Economic,
    icon: EPicksIcon.Economic,
    isSelected: false,
  },
  {
    label: PicksLabel.Education,
    icon: EPicksIcon.Education,
    isSelected: false,
  },
  {
    label: PicksLabel.Environment,
    icon: EPicksIcon.Environment,
    isSelected: false,
  },
  {
    label: PicksLabel.Health,
    icon: EPicksIcon.Health,
    isSelected: false,
  },
  {
    label: PicksLabel.Human,
    icon: EPicksIcon.Human,
    isSelected: false,
  },
  {
    label: PicksLabel.Poverty,
    icon: EPicksIcon.Poverty,
    isSelected: false,
  },
  {
    label: PicksLabel.Politics,
    icon: EPicksIcon.Politics,
    isSelected: false,
  },
  {
    label: PicksLabel.Science,
    icon: EPicksIcon.Science,
    isSelected: false,
  },
  {
    label: PicksLabel.Social,
    icon: EPicksIcon.Social,
    isSelected: false,
  },
  {
    label: PicksLabel.Technology,
    icon: EPicksIcon.Technology,
    isSelected: false,
  },
  {
    label: PicksLabel.Women,
    icon: EPicksIcon.Women,
    isSelected: false,
  },
];
