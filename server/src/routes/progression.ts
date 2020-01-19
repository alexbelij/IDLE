import express from 'express';

/**
 * Routes giving constructions, items, production
 */

////////////////////////////////////////////////////////////////////////////////

const router = express.Router();

////////////////////////////////////////////////////////////////////////////////

router.get( '/progression/buildings', ( request, response ) =>
{
	response.status( 200 ).send( 'GET progression buildings' );
});

////////////////////////////////////////////////////////////////////////////////


export default router;