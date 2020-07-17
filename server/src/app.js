const {GraphQLServer, PubSub} = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { request } = require('express')


const prisma = new PrismaClient()


  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: async (parent, args, context) => {
        return context.prisma.link.findMany()
      },
    },
    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
              data: {
                url: args.url,
                description: args.description,
              }
            })
         
            return newLink
        },
        updateLink: (parent, args) => {
          for(let i= 0; i < links.length; i++) {
            if(args.id == links[i].id) {
              if (args.url) links[i].url = args.url
              if (args.description) links[i].description = args.description
            }
          }
        },
        deleteLink: (parent, args) => {
          for(let i= 0; i < links.length; i++) {
            if(args.id == links[i].id) {
              links.splice(i, 1)
            }
          }

        }
    },
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