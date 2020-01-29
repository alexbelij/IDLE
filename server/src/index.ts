#!/usr/bin/env node
import { install as installSourceMapSupport } from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import clear from 'clear';

import DataBase from './core/DataBase';
import RootQuery from './graphql';
import { Environment } from './environment';

////////////////////////////////////////////////////////////////////////////////

const DEFAULT_PORT = 5001;
const GRAPHQL_ROUTE = '/graphql';
const ROUTES = [ ];

////////////////////////////////////////////////////////////////////////////////

export const main = async ( argv: string[] ) : Promise<void> =>
{
	clear();

	Environment.check();

	const app = express();
	const dataBase = new DataBase( Environment.get.MONGO_URL );

	////////////////////////////////////////////////////////////////////////////

	const onError = ( err: any ) =>
	{
		console.log( err );
		process.exit( 1 );
	}

	const allowJSONBodyHandling = () => app.use( bodyParser.json() );

	const enableCORS = () => app.use( cors() );

	const startService = () => app.listen( Environment.get.REST_PORT, () =>  console.log( `NodeJS REST service running in ${ Environment.get.NODE_ENV } mode, port ${ Environment.get.REST_PORT }` ) );

	const setupTestRoute = () => app.get( '/', ( request, response ) => response.send( 'The server received a GET resquest' ) );

	//const setupRoutes = () => ROUTES.forEach( route => app.use( API_BASE_NAME, route ) );

	const setupGraphQL = () => app.use( GRAPHQL_ROUTE, graphqlHTTP(
	{
		// TODO look more on rootValue -> https://github.com/graphql/express-graphql#options
		schema : RootQuery,
		graphiql : true 
	}));

	////////////////////////////////////////////////////////////////////////////

	installSourceMapSupport();

	allowJSONBodyHandling();
	enableCORS();

	startService();

	setupTestRoute();
	//setupRoutes();
	dataBase.connect().then( 
		resolve => console.log( 'Connected to DB' ),
		error => console.error( error )
	);
	setupGraphQL();

	process.on( "uncaughtException", onError );
	process.on( "unhandledRejection", onError );
}

///////////////////////////////////////////////////////////////////////////////

main( process.argv );