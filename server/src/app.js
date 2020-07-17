const {GraphQLServer, PubSub} = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const prisma = new PrismaClient()


  const resolvers = {
    Query,
    Mutation,
    User,
    Link
  }

  const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers,
    // instead of attaching the object itself we created the `context` as a funtion which return the `context`
    // the advantage of this approach is that you can attach the HTTp requests taht carries the incoming GraphQL query(or muttation) to the context as well
    // This allows our resolvers to read the `Authorization` header and validate if the user who subbmitted the reqeust is eligible to perfomr the requested operation
  context: request => {
    return {
      ...request,
      prisma,
    }
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))