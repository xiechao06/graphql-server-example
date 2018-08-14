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
    Color: {
      RED: '#f00',
      GREEN: '#0f0',
      BLUE: '#00f'
    },
    Query: {
      favoriteColor () {
        return '#f00'
      },
      avatar (_, { borderColor }) {
        return 'avatar with border color: ' + borderColor
      }
    }
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
