import axios from 'axios';
import client from './client';

// Errors
const NO_TOKEN = "NO TOKEN";

/**
 * @desc Log in api service and set JWT token
 * @type {Promise} HTTP(s) request
 * @param {String} id, mail or username
 * @param {String} password, user password
 * @reject 
 */
export const logIn = (id, password) => {
  client.post("/oauth", { id, password })
  .then(response => (
    client.setJWT(response.data.accessToken) &&
    // Store the token on the front server cookies
    axios.post("/login", response.data)
    .catch( error => console.error( error ))
    // Its error isn't important
    // Client.post error will waterfall out of this function
  ))
}

/**
 * @desc Log in with google set JWT token
 * @type {Promise} HTTP(s) request
 * @param {Object} googleResponse
 */
export const googleLogin = (googleResponse) => (
  client
  .setJWT(googleResponse.tokenId)
  .post("/oauth/google")
  .then( response => client.setJWT(response.data.accessToken))
  .then( client => client.get("/oauth"))
  .then( response => console.log(response.data))
  // Where should we manage those errors ?
  // .catch( error => error.response && error.response.state === 401 || Promise.reject(error))
  // .catch( error => console.error(error))
);

/**
 * @desc 
 * @type {Promise} HTTP(s) request
 */
export const logOut = () => {
  client.removeJWT();
  return axios.delete("/login");
}

/**
 * @desc 
 * @type {Promise} HTTP(s) request
 */
export const signUp = (fullName, email, password) => (
  client.put("/oauth", {fullName, email, password})
  .then( response => (
    client.setJWT(response.data.accessToken) &&
    // Store the token on the front server cookies
    axios.post("/login", response.data)
    .catch(error => console.error(error))
    // Its error isn't important
    // Client.post error will waterfall out of this function
  ))
)

/**
 * @desc fetch data about current user
 * @type {Promise} one or two http request
 * @returns {Object} or null
 */
export const whoAmI = () => (
  Promise.resolve(client.getJWT() ? client : Promise.reject(NO_TOKEN))
  // If the client doesn't have a token, fetch it on the rendering server
  // !! Those data are not to be trusted !!
  .catch( error => error === NO_TOKEN ? (
    axios.get("/login")
    .then( response => client.setJWT(response.data.accessToken))
  ) : Promise.reject(error))
  // Once the token exists, fetch log data on api
  .then( client  => client.get("/oauth"))
  .then( response => response.data)
  // On 401, the user isn't logged, remove his JWT;
  .catch( error => error.response && error.response.status === 401 ? client.removeJWT() && null : Promise.reject(error))
);
