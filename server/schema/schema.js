const {GraphQLServer} = require("graphql-yoga")
const _ = require("lodash");


// dummy data

let books = [
  {
    name: "Scooby-Doo! Abracadabra-Doo",
    genre: "Animation|Children|Mystery",
    id: "1",
    authorid: "7",
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
    authorid: "2",
  },
  {
    name: "The Grump",
    genre: "Comedy",
    id: "4",
    authorid: "10",
  },
  {
    name: "Paradise Lost 3: Purgatory",
    genre: "Documentary",
    id: "5",
    authorid: "5",
  },
  {
    name: "Xtro 3: Watch the Skies",
    genre: "Horror|Sci-Fi",
    id: "6",
    authorid: "10",
  },
  {
    name: "Down in the Delta",
    genre: "Drama",
    id: "7",
    authorid: "3",
  },
  {
    name: "Solan og Ludvig: Jul i Flåklypa",
    genre: "Animation|Children",
    id: "8",
    authorid: "6",
  },
  {
    name: "Young Goethe in Love",
    genre: "Drama|Romance",
    id: "9",
    authorid: "10",
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

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
          type: new GraphQLList(BookType),
          resolve(parent, args) {            
            return _.filter(books, {authorid: parent.id})
          }
      }
    }),
  });
  

// this object defines what is the book object is about
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorid });
      },
    },
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
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return books
        }
    }, 
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return authors
        }
    },
  },
});

const Mutation = new GraphQLObjectType ({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)}, 
                age: {type:new GraphQLNonNull(GraphQLInt)},
                id: {type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                }
                return authors.push(author)
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)}, 
                genre: {type:new GraphQLNonNull(GraphQLString)},
                authorid: {type:new GraphQLNonNull(GraphQLID)},
                id: {type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    id: args.id,
                    authorid: args.authorid
                }
                return books.push(book)
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
