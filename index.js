const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJWT = require('express-jwt');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const Resolvers = require('./resolvers');

const dotenv = require('dotenv');
dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

mongoose
	.connect(mongodb_atlas_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((success) => {
		console.log('Success Mongodb connection');
	})
	.catch((err) => {
		console.log('Error Mongodb connection');
	});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('*', cors());

app.use(
	expressJWT({
		secret: 'SUPER_SECRET',
		algorithms: [ 'HS256' ],
		credentialsRequired: false
	})
);

const server = new ApolloServer({
	typeDefs: typeDefs.typeDefs,
	resolvers: Resolvers.resolvers,
	context: ({ req }) => {
		const user = req.user || null;
		return user;
	}
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
