const { ApolloServer, gql, MockList } = require('apollo-server')
const casual = require('casual')

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      people: [Person]
    }

    type Person {
      name: String,
      age: Int
    }
  `,
  resolvers: { },
  mocks: {
    Query: () => ({
      people: () => new MockList([2, 6])
    }),
    Person: () => ({
      name: casual.name,
      age: () => casual.integer(0, 120)
    })
  },
  playground: {
    settings: {
      'editor.cursorShape': 'underline'
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
