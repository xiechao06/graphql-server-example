const { ApolloServer, gql } = require('apollo-server')

let server = new ApolloServer({
  typeDefs: gql`
    enum Color {
      RED, GREEN, BLUE
    }

    type Query {
      favoriteColor: Color,
      avatar(borderColor: Color): String
    }
  `,
  resolvers: {
    Query: {
      favoriteColor () {
        return 'RED'
      },
      avatar (_, { borderColor }) {
        return 'avatar with border color: ' + borderColor
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
