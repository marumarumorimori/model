export const getSmartphoneOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") !== -1) {
    return "ios";
  }
  if (userAgent.indexOf("android") !== -1) {
    return "android";
  }

  return null;
};

export const validatePassword = (password: string) => {
  if (password.length < 8) return false;
  if (password.length > 32) return false;
  if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/)) return false;
  if (!password.match(/^[A-z0-9!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]+$/))
    return false;
  return true;
};
