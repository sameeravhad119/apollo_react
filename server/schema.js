const { default: axios } = require("axios");
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: {
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
  },
});

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: {
    mission_name: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    rocket: { type: RocketType },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
  },
});

let schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
