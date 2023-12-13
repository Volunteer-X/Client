export type Activity = {
  __typename?: 'Ping';
  id: string;
  title: string;
  description?: string | null;
  createdAt?: Date | string | null;
  latitude: string;
  longitude: string | number;
  picks: Array<string>;
  radius?: number | null;
  url?: URL | string | null;
  media?: Array<{
    __typename?: 'Media';
    key: string;
    type: string;
  } | null> | null;
};

export type User =
  | {
      __typename?: 'User';
      id: string;
      createdAt?: Date | string | null;
      username: string;
      email: string;
      picture?: string | null;
      picks: Array<string>;
      name?: {
        __typename?: 'Name';
        firstName: string;
        lastName: string;
        middleName?: string | null;
      } | null;
    }
  | undefined;
