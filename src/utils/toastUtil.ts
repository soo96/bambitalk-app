import Toast from 'react-native-toast-message';

export const showBaseToast = (text: string) => {
  Toast.show({
    type: 'selectedToast',
    text1: text,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export const showSuccessToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'success',
    text1: text1,
    text2: text2,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export const showErrorToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
    position: 'bottom',
    visibilityTime: 2000,
  });
};
