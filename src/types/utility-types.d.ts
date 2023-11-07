export type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

export type Modify<T, R, S> = Omit<T, keyof R> & S;

export type Point = {
  lat: number;
  lng: number;
};
