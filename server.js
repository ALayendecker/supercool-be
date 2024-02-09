const express = require('express');
// Import the ApolloServer class
const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();


// app.use((req, res, next) => {
//   res.setHeader('Referrer-Policy', 'no-referrer');
//   next();
// });

const corsOptions = {
  origin: 'https://glittering-kashata-cb2f7b.netlify.app', // Adjust this to your client's URL
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
    cors: false 
  }));


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
