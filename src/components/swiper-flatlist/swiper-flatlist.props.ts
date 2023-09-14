import { FlatListProps, ViewabilityConfig } from 'react-native';
import { DotProps, PaginationProps } from './pagination';

export type ScrollToIndex = { index: number; animated?: boolean };

export type SwiperFlatlistRefProps = {
  getCurrentIndex: () => number;
  getPrevIndex: () => number;
};

export type SwiperFlatlistProps<T> = Partial<FlatListProps<T>> & {
  data?: T[];
  renderItem?: FlatListProps<T>['renderItem'];
  vertical?: boolean;
  index?: number;
  renderAll?: boolean;
  onChangeIndex?: (item: { index: number; prevIndex: number }) => void;
  disableGesture?: boolean;

  //   RN Props
  onMomentumScrollEnd?: (item: { index: number }, event: any) => void;
  onViewableItemsChanged?: FlatListProps<T>['onViewableItemsChanged'];
  viewibilityConfig?: ViewabilityConfig;

  //   Pagination
  showPagination?: boolean;
  showDots?: boolean;
} & Pick<
    DotProps,
    | 'dotStyle'
    | 'dotContainerStyle'
    | 'activeDotColor'
    | 'inactiveDotColor'
    | 'expandingDotWidth'
    | 'inactiveDotOpacity'
  > &
  Pick<
    PaginationProps,
    'paginationContainerStyle' | 'paginationStyle' | 'paginationTextStyle'
  >;
