//const awsParamStore = require( 'aws-param-store' );

/*
//Fetching credentials from AWS SSM
const dbHost = awsParamStore.getParameterSync('restaurant-db-host', { region: 'eu-west-1' } );
const user = awsParamStore.getParameterSync('restaurant-db-username', { region: 'eu-west-1' } );
const password = awsParamStore.getParameterSync('restaurant-db-password', { region: 'eu-west-1' } );
const database = awsParamStore.getParameterSync('restaurant-db-database', { region: 'eu-west-1' } );
*/

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
