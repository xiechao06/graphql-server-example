const {
  ApolloServer, gql, AuthenticationError, UserInputError 
} = require('apollo-server')
const fs = require('fs')

let server = new ApolloServer({
  typeDefs: gql`
    type Query {
      readError: String,
      authenticationError: String
    }
    type Mutation {
      userInputError(input: String): String
    }
  `,
  resolvers: {
    Query: {
      readError () {
        fs.readFileSync('/does/not/exist')
      },
      authenticationError () {
        throw new AuthenticationError('must authenticate')
      }
    },
    Mutation: {
      userInputError (_, args) {
        if (args.input !== 'expected') {
          throw new UserInputError('invalid input', {
            invalidArgs: Object.keys(args)
          })
        }
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
