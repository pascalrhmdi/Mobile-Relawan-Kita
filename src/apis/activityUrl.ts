import Constants from 'expo-constants';

const activityMainUrl: string = `${Constants.manifest?.extra?.apiBaseUrl}/api/activity`;

const registerAnActivityUrl: string = `${activityMainUrl}/register`;
const searchActivityUrl: string = `${activityMainUrl}/search`;
const allActivityCategoryUrl : string = `${activityMainUrl}/category`;

export {
  activityMainUrl,
  searchActivityUrl,
  registerAnActivityUrl,
  allActivityCategoryUrl
};

