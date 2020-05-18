import { Platform } from 'react-native';

export const isMobile = ['ios', 'android'].includes(Platform.OS);
export const isWeb = Platform.OS === 'web';

export const styleForPlatform = ({ mobile, web }) =>
  Platform.select({ default: mobile, web });
