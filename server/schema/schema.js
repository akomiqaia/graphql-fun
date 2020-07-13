const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = graphql;

// dummy data

let books = [
  {
    name: "Scooby-Doo! Abracadabra-Doo",
    genre: "Animation|Children|Mystery",
    id: "1",
    authorid: " 7",
  },
  {
    name: "Road Warrior, The (Mad Max 2)",
    genre: "Action|Adventure|Sci-Fi",
    id: "2",
    authorid: "1",
  },
  {
    name: "Set Me Free (Emporte-moi)",
    genre: "Drama",
    id: "3",
    authorid: " 2",
  },
  {
    name: "The Grump",
    genre: "Comedy",
    id: "4",
    authorid: " 10",
  },
  {
    name: "Paradise Lost 3: Purgatory",
    genre: "Documentary",
    id: "5",
    authorid: " 5",
  },
  {
    name: "Xtro 3: Watch the Skies",
    genre: "Horror|Sci-Fi",
    id: "6",
    authorid: " 10",
  },
  {
    name: "Down in the Delta",
    genre: "Drama",
    id: "7",
    authorid: " 3",
  },
  {
    name: "Solan og Ludvig: Jul i Flåklypa",
    genre: "Animation|Children",
    id: "8",
    authorid: " 6",
  },
  {
    name: "Young Goethe in Love",
    genre: "Drama|Romance",
    id: "9",
    authorid: " 10",
  },
  {
    name: "Chosen One, The",
    genre: "Comedy|Drama",
    id: "10",
    authorid: "7",
  },
];

let authors = [
  {
    name: "Alvina Cropton",
    age: 36,
    id: "1",
  },
  {
    name: "Gerri Sarfati",
    age: 38,
    id: "2",
  },
  {
    name: "Clay Snoddy",
    age: 53,
    id: "3",
  },
  {
    name: "Simon Willerson",
    age: 47,
    id: "4",
  },
  {
    name: "Silvanus Hitter",
    age: 59,
    id: "5",
  },
  {
    name: "Nataniel Bonifant",
    age: 44,
    id: "6",
  },
  {
    name: "Anthea Keemer",
    age: 45,
    id: "7",
  },
  {
    name: "Hedy Allner",
    age: 31,
    id: "8",
  },
  {
    name: "Harley Welfare",
    age: 26,
    id: "9",
  },
  {
    name: "Ingaberg Fleay",
    age: 59,
    id: "10",
  },
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
    author: {
      type: AuthorType,

      // parent element has information about the quered data
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      },
    },
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
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
