const AWSSecretsManager = require("./AWSSecretsManager");

module.exports = {
  async getConfiguration() {
    const credentials = await AWSSecretsManager.getCredentials('restaurant-db'); 

    console.log(credentials)

    return {
      development: {
        client: "mysql",
        connection: {
          host: credentials.host,
          database: credentials.dbname,
          user: credentials.username,
          password: credentials.password,
          timezone: 'UTC',
          dateStrings: true
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
          directory: `${__dirname}/src/database/seeds`
        }
      }
    }
  }
}
