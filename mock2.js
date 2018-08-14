const { ApolloServer, gql } = require('apollo-server')
const casual = require('casual')

const typeDefs = gql`
  type Query {
    hello: String,
    resolved: String,
    person: Person
  }

  type Person {
    name: String,
    age: Int 
  }
`

const resolvers = {
  Query: {
    resolved: () => 'Resolved'
  }
}

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0, 120)
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  playground: {
    settings: {
      'editor.cursorShape': 'underline'
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
