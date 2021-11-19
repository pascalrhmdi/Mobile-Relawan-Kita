import Constants from 'expo-constants';

const volunteerMainUrl: string = `${Constants.manifest?.extra?.apiBaseUrl}/api/volunteer`;

const loginUrl: string = `${volunteerMainUrl}/login`;
const registerUrl: string = `${volunteerMainUrl}/register`;
const profileUrl: string = `${volunteerMainUrl}/profile`;

export {
  loginUrl,
  registerUrl,
  profileUrl
};

