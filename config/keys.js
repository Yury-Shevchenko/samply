if(process.env.NODE_ENV == "production"){
  module.exports = require('./keys_prod');
} else {
  module.exports = {
    stripePublishableKey: 'pk_test_bQ8jWWd1ktfrrxqxyEzi10jn',
    stripeSecretKey: 'sk_test_mL40Uasrl81K84eMyk6BB5Ce'
  };
}
