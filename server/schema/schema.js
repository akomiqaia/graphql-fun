const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data

let books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1" },
  { name: "The final empire", genre: "Fantasy", id: "2" },
  { name: "The long earth", genre: "Sci-Fi", id: "3" },
];

let authors = [
    { name: "Patrick", age: 45, id: "1" },
    { name: "Brandon", age: 32, id: "2" },
    { name: "Terry", age: 66, id: "3" },
  ];
  
// this object defines what is the book object is about
const BookType = new GraphQLObjectType({
  name: "Book",
  // fields need to be functions.
  // when we have mulitiple types later on this funciton will help us to overcome reference erros
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
    }),
  });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/ other source
        // this will come handy when we define realationships between data
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
