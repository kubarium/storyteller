module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/storyteller/'
    : '/',
  /* publicPath: process.env.NODE_ENV === 'production'
    ? '/storyteller/'
    : '/' */
}