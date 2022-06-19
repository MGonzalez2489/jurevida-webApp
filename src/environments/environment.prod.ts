declare const require: any;

export const environment = {
  production: true,
  appversion: require('../../package.json').version,
  baseUrl: '',
};
