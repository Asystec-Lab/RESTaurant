const AWSSecretsManager = require('../../AWSSecretsManager');
const btoa = require('btoa');

module.exports = {
  async getCredentials(req, res, next) {
    try{
      const credentials = await AWSSecretsManager.getCredentials('restaurant-frontend-authentication'); 

      const AKI = btoa(credentials.accessKeyId);
      const SAK = btoa(credentials.secretAccessKey);

      return res.status(200).json({AKI, SAK});
    }
    catch(error){
      next(error);
    }
  }
}
