import { Dimensions, Platform } from 'react-native';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Scale function for width
export const scaleWidth = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

// Scale function for height
export const scaleHeight = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Scale fonts
export const scaleFont = (size: number) => {
  const newSize = scaleWidth(size);
  if (Platform.OS === 'ios') {
    return Math.round(newSize);
  } else {
    return Math.round(newSize) - 1;
  }
};

// Moderately scale - useful for padding/margins
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scaleWidth(size) - size) * factor;
};

// Export percentage-based helpers
export { wp, hp };

// Screen dimensions
export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: SCREEN_WIDTH < 375,
  isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLarge: SCREEN_WIDTH >= 414,
};