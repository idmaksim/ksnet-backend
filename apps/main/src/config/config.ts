export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
});
