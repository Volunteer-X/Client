import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Position } from '@turf/helpers';
import { Activity, User } from './entities';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: { point?: Position; picks?: Array<string> };
  // SelectPicks: { picks?: Array<string> };
  // SearchLocation: { point: Point };
};

export type PingCompositeScreenProps<
  T extends keyof BottomTabParamList,
  U extends keyof PingStackParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  StackScreenProps<PingStackParamList, U>
>;

export type PingStackScreenProps<T extends keyof PingStackParamList> =
  StackScreenProps<PingStackParamList, T>;

/*
 * AuthStackParamList
 */
export type AuthStackParamList = {
  AuthHome: undefined;
  SetUsername: { possibleUsername?: string };
  SetPicks: { username: string };
  LoadingScreen: { username: string; picks: Array<string> };
};

/*
 * MainNavList
 */
export type MainNavList = {
  AuthStack: AuthStackParamList;
  Root: RootStackParamList;
};

// * Root
export type RootStackParamList = {
  Drawer: NavigatorScreenParams<MainDrawerParamList>;
  ForumNavigation: NavigatorScreenParams<ForumStackParamList>;
  // Home: NavigatorScreenParams<HomeStackParamList>;
  NearbyNavigation: NavigatorScreenParams<NearbyStackParamList>;
  Ping: NavigatorScreenParams<PingStackParamList>;
  ActivityNavigation: NavigatorScreenParams<ActivityStackParamList>;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// Drawer
export type MainDrawerParamList = {
  Nearby: undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  Profile: { userID: string };
  AppSettings: undefined;
};
// Bottom tab
// export type BottomTabParamList = {
//   Home: undefined;
//   Activity: undefined;
//   Ping: NavigatorScreenParams<PingStackParamList>;
//   Nearby: undefined;
//   Search: undefined;
// };

// * Home Screen
export type HomeStackParamList = {
  HomeScreen: {
    ping?: Activity;
    loading?: boolean;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type BottomTabStackScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList, T>,
      DrawerScreenProps<MainDrawerParamList, 'BottomTab'>
    >,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// * Activity
export type ActivityStackParamList = {
  ActivityScreen: {
    activityID?: string;
    activity?: Activity;
    owner?: User;
  };
  ActivityMembers: undefined;
  ActivitySetting: undefined;
  Profile: undefined;
};

export type ActivityStackScreenProps<T extends keyof ActivityStackParamList> =
  StackScreenProps<ActivityStackParamList, T>;

// * Forum
export type ForumStackParamList = {
  Forums: undefined;
  Channel: { channelID: string };
  ForumMembers: undefined;
  ForumSetting: undefined;
  Profile: undefined;
};

export type ForumStackScreenProps<T extends keyof ForumStackParamList> =
  StackScreenProps<ForumStackParamList, T>;

// * Nearby
export type NearbyStackParamList = {
  MapScreen: undefined;
};

export type NearbyStackScreenProps<T extends keyof NearbyStackParamList> =
  StackScreenProps<NearbyStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface MainDrawerParamList extends MainDrawerParamList {}
  }
}
