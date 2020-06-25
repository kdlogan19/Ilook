var nodeExternals =  require('webpack-node-externals')
module.exports = {
    env: {
        MONGO_URI: 'mongodb://127.0.0.1:27017/ilook-database',
        SECRET_COOKIE_PASSWORD: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8'
    },

    externals: [nodeExternals()]
}