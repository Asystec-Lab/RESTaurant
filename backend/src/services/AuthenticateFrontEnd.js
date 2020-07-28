const AWSSecretsManager = require('../../AWSSecretsManager');

module.exports = {
  async getCredentials(req, res, next) {
    try{
      const credentials = await AWSSecretsManager.getCredentials('restaurant-frontend-authentication'); 

      return res.status(200).json(credentials);
    }
    catch(error){
      next(error);
    }
  }
}
