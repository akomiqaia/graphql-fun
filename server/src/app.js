const {GraphQLServer, PubSub} = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')


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
  context: {
    prisma,
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))