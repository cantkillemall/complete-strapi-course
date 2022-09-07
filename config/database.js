module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'artcoded-course'),
      user: env('DATABASE_USERNAME', 'thierry'),
      password: env('DATABASE_PASSWORD', 'IloveAkabane2'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
