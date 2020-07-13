const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString} = graphql

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
 