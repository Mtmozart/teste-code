import "dotenv/config";

export const EnvConfig = {
  mysql: {
    HOST_DB: process.env.DATABASE_HOST,
    PORT_DB: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    USER_DB: process.env.MYSQL_USER, 
    PASSWORD_DB: process.env.MYSQL_ROOT_PASSWORD,
    NAME_DB: process.env.MYSQL_DATABASE,
    URL: process.env.URL_DATABASE, 
  },
  mongodb: {
    URL: process.env.DATABASE_URL
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  PORT: process.env.PORT
}