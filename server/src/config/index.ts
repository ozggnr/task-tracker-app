import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//we separate the stage and environment (to run the environment version of app locally, ex stage: local, environmnet: production)
const stage = process.env.STAGE || 'local';
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === 'production') {
    envConfig = require('./prod').default;
} else if (stage === 'testing') {
    envConfig = require('./testing').default;
} else {
    envConfig = require('./local').default;
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    logging: false,
};

export default merge(defaultConfig, envConfig);
