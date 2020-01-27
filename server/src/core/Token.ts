import { sign, verify as jwtVerify } from 'jsonwebtoken';

import { Environment } from '../environment';
import User from '../model/User';

////////////////////////////////////////////////////////////////////////////////

const DEFAULT_JWT_EXPIRATION = "1d";

////////////////////////////////////////////////////////////////////////////////

export namespace Token
{
	export const generate = async ( email : string, password : string ) : Promise<string> =>
	{
        return new Promise( ( resolve, reject ) =>
        {
            sign( { email, password }, Environment.get.JWT_SECRET, { expiresIn : DEFAULT_JWT_EXPIRATION }, ( error, token ) => error ? reject( error ) : resolve( token ) );
        });
    }

    export const getUserID = async ( token : string ) : Promise<any> =>
	{
        return new Promise( ( resolve, reject ) =>
        {
            jwtVerify( token, Environment.get.JWT_SECRET, ( error, user ) => error ? reject( error ) : resolve( user ) );
        });
    }

    export const getUser = async ( token : string ) : Promise<any> =>
    {
        return new Promise( ( resolve, reject ) =>
        {
            getUserID( token ).then(
                user =>
                {
                    User.findById( user.id ).then(
                        user => resolve( user ),
                        error => reject( error )
                    );
                },
                error => reject( error )
            )
        });
    }
}