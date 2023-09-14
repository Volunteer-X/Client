import { ImagePickerResponse } from 'react-native-image-picker';
import { SwiperFlatlistProps } from '../swiper-flatlist.props';

export interface MediaFlatlistProps<T> extends Partial<SwiperFlatlistProps<T>> {
  assets: ImagePickerResponse['assets'];
  paddingOffset?: number;
}
