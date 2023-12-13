import { PING_FRAGMENT, USER_FRAGMENT } from '@app/lib';
import { FragmentType } from '@app/__generated__/gql';
import {
  PingFragmentFragment,
  UserFragmentFragment,
} from '@app/__generated__/gql/graphql';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Activity, User } from './entities';
import { Point } from './utility-types';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: { point?: Point; picks?: Array<string> };
  SelectPicks: { picks?: Array<string> };
  SearchLocation: { point: Point };
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
  Drawer: NavigatorScreenParams<DrawerParamList>;
  ForumNavigation: NavigatorScreenParams<ForumStackParamList>;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// Drawer
export type DrawerParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  Profile: undefined;
  AppSettings: undefined;
};

// Bottom tab
export type BottomTabParamList = {
  Home: undefined;
  Activity: NavigatorScreenParams<ActivityStackParamList>;
  Ping: NavigatorScreenParams<PingStackParamList>;
  Nearby: undefined;
  Search: undefined;
};

// * Home Screen
export type HomeStackParamList = {
  HomeScreen: {
    ping?: {
      id: string;
      createdAt?: string | Date | null;
      title: string;
      description?: string | null;
      picks: Array<string>;
      latitude: number;
      longitude: number;
      media?: ({ key: string; type: string } | null)[] | null;
      user: {
        id: string;
        username: string;
        name?: { firstName: string; lastName: string } | null;
        picture?: string | null;
      };
    };
    loading?: boolean;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type BottomTabStackScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList, T>,
      DrawerScreenProps<DrawerParamList, 'BottomTab'>
    >,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// * Activity
export type ActivityStackParamList = {
  Activities: undefined;
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
  ForumScreen: undefined;
  ForumMembers: undefined;
  ForumSetting: undefined;
  Profile: undefined;
};

export type ForumStackScreenProps<T extends keyof ForumStackParamList> =
  StackScreenProps<ForumStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
