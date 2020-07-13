const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

// this object defines what is the book object is about
const BookType = new GraphQLObjectType({
    name: 'Book',
    // fields need to be functions. 
    // when we have mulitiple types later on this funciton will help us to overcome reference erros
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // query for a book
        // the name matters
        book: {
            type: BookType,
            // any kind of arguments. 
            //when someone wants to query the book 
            // they have to pass an argument when they are looking for a book.
            // and in this case it will be an ide

            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to get data from db/ other source
                // this will come handy when we define realationships between data

            }

        }
    }
})


module.exports =  new Grap

 