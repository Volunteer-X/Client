import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  I18nManager,
  FlatList as RNFlatlist,
  FlatListProps,
  useWindowDimensions,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  SwiperFlatlistProps,
  SwiperFlatlistRefProps,
} from './swiper-flatlist.props';

import { Pagination, ExpandingDots } from './pagination';

type T = any;
const FIRST_INDEX = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 60;

const SwiperFlatlist = React.forwardRef(
  (
    {
      vertical = false,
      data = [],
      renderItem,
      renderAll = false,
      index = I18nManager.isRTL ? data.length - 1 : FIRST_INDEX,
      // * Pagination
      showPagination = false,
      paginationStyle,
      paginationContainerStyle,
      paginationTextStyle,
      // * Dots
      showDots = true,
      dotContainerStyle,
      dotStyle,
      activeDotColor,
      inactiveDotColor,
      inactiveDotOpacity,
      expandingDotWidth,
      // * Function
      onChangeIndex,
      onMomentumScrollEnd,
      onViewableItemsChanged,
      viewibilityConfig = {},
      disableGesture = false,
      ...props
    }: SwiperFlatlistProps<T>,
    ref: React.Ref<SwiperFlatlistRefProps>,
  ) => {
    let _data: unknown[] = [];
    let _renderItem: FlatListProps<any>['renderItem'];

    if (data) {
      _data = data;
      _renderItem = renderItem;
    }

    const size = _data.length;

    const initialNumToRender = renderAll ? size : 1;

    const x = useSharedValue(0);

    // states
    const [currentIndexes, setCurrentIndexes] = useState({
      index,
      prevIndex: index,
    });

    const [ignoreOnMomentumScrollEnd, setIgnoreOnMomentumScrollEnd] =
      useState(false);

    const [scrollEnabled, setScrollEnabled] = useState(!disableGesture);

    const flatlistElement = useRef<RNFlatlist<unknown>>(null);

    useEffect(() => {
      setScrollEnabled(!disableGesture);
    }, [disableGesture]);

    const _onChangeIndex = useCallback(
      ({
        index: _index,
        prevIndex: _prevIndex,
      }: {
        index: number;
        prevIndex: number;
      }) => {
        if (_index !== _prevIndex) {
          onChangeIndex?.({ index: _index, prevIndex: _prevIndex });
        }
      },
      [onChangeIndex],
    );

    useEffect(() => {
      _onChangeIndex({
        index: currentIndexes.index,
        prevIndex: currentIndexes.prevIndex,
      });
    }, [_onChangeIndex, currentIndexes.index, currentIndexes.prevIndex]);

    useImperativeHandle(ref, () => ({
      getCurrentIndex: () => currentIndexes.index,
      getPrevIndex: () => currentIndexes.index,
    }));

    const _onMomentumScrollEnd: FlatListProps<unknown>['onMomentumScrollEnd'] =
      event => {
        if (ignoreOnMomentumScrollEnd) {
          setIgnoreOnMomentumScrollEnd(false);
          return;
        }

        onMomentumScrollEnd?.({ index: currentIndexes.index }, event);
      };

    const _viewabilityConfig = useRef({
      minimumViewTime: 200,
      itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD,
      ...viewibilityConfig,
    }).current;

    const _onViewableItemsChanged = useMemo<
      FlatListProps<unknown>['onViewableItemsChanged']
    >(
      () => params => {
        const { changed } = params;
        const newItem = changed?.[FIRST_INDEX];
        if (newItem !== undefined) {
          const newIndex = newItem.index as number;
          if (newItem.isViewable) {
            setCurrentIndexes(prevState => ({ ...prevState, index: newIndex }));
          } else {
            setCurrentIndexes(prevState => ({
              ...prevState,
              prevIndex: newIndex,
            }));
          }
        }
        onViewableItemsChanged?.(params);
      },
      [onViewableItemsChanged],
    );

    const onScroll = useAnimatedScrollHandler({
      onScroll: event => {
        x.value = event.contentOffset.x;
      },
    });

    const flatlistProps: FlatListProps<unknown> & {
      ref: RefObject<RNFlatlist<unknown>>;
    } = {
      scrollEnabled,
      onScroll,
      initialNumToRender,
      ref: flatlistElement,
      keyExtractor: (_item, _index) => {
        const item = _item as { key?: string; id?: string };
        const key = item?.key ?? item?.id ?? _index.toString();
        return key;
      },
      horizontal: !vertical,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      pagingEnabled: true,
      onMomentumScrollEnd: _onMomentumScrollEnd,
      data: _data,
      renderItem: _renderItem,
      initialScrollIndex: index,
      viewabilityConfig: _viewabilityConfig,
      onViewableItemsChanged: _onViewableItemsChanged,
      ...props,
    };

    const { width, height } = useWindowDimensions();

    if (props.getItemLayout === undefined) {
      const itemDimension = vertical ? height : width;

      flatlistProps.getItemLayout = (__data, ItemIndex: number) => {
        return {
          length: itemDimension,
          offset: itemDimension * ItemIndex,
          index: ItemIndex,
        };
      };
    }

    return (
      <>
        <Animated.FlatList {...flatlistProps} />
        {size > 1 && showDots && (
          <ExpandingDots
            scrollX={x}
            size={size}
            dotContainerStyle={dotContainerStyle}
            dotStyle={dotStyle}
            activeDotColor={activeDotColor}
            inactiveDotColor={inactiveDotColor}
            inactiveDotOpacity={inactiveDotOpacity}
            expandingDotWidth={expandingDotWidth}
          />
        )}
        {size > 1 && showPagination && (
          <Pagination
            size={size}
            paginationIndex={currentIndexes.index}
            paginationContainerStyle={paginationContainerStyle}
            paginationStyle={paginationStyle}
            paginationTextStyle={paginationTextStyle}
          />
        )}
      </>
    );
  },
);

export default SwiperFlatlist;

type Handle<T1> = T extends ForwardRefExoticComponent<RefAttributes<infer T2>>
  ? T2
  : never;

export type SwiperFlatlist = Handle<typeof SwiperFlatlist>;
