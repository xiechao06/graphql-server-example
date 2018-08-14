const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
type Query {
  hello: String
}
`

const server = new ApolloServer({
  typeDefs,
  mocks: true,
  introspection: true,
  playground: {
    settings: {
      'editor.cursorShape': 'underline'
    }
  }
})

server.listen().then(({ url }) => {
  console.log('🚀 server ready at ' + url)
})
