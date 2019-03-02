export const hostUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4201'
    : 'https://rambl-io.herokuapp.com';
