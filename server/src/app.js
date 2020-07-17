const {GraphQLServer, PubSub} = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

  let idCount = links.length
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                urls: args.urls,
            }
            links.push(link)
            return link
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
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))