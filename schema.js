const {GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLList
    } = require("graphql");
const { RootMuatation } = require("./roots/mutation");

    const {RoootQuery} = require("./roots/query");
    const {RootMutation} = require("./roots/mutation")

    const ourSchema = new GraphQLSchema({
        query: RoootQuery,
        mutation: RootMutation
    })

    module.exports = ourSchema