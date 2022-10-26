const { GraphQLClient } = require('graphql-request')
module.exports = new GraphQLClient('http://host.docker.internal:4001/graphql')
