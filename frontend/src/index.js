import React from 'react';
import ReactDOM from 'react-dom';

// We will create this component shortly
import Root from './components/root';

// We set this up in the last section
import configureStore from './store/store';

// We will use this to parse the user's session token
import jwt_decode from 'jwt-decode';

// The session utility we just created
import {
	setAuthToken
} from './util/session_api_util';

// We have not created this action yet, but will do so in the next step
import {
	logout
} from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
			let store;
			// If a returning user has a session token stored in localStorage
			if (localStorage.jwtToken) {

				//Set token as common header for all axios requests
				setAuthToken(localStorage.jwtToken);

				//Decode token to obtain user's info
				const decodedUser = jwt_decode(localStorage.jwtToken);

				//Create preconfigured state that we can immediately add to our store
				const preloadedState = {
					session: {
						isAuthenticated: true,
						user: decodedUser
					}
				};

				store = configureStore(preloadedState);

				const currentTime = Date.now() / 1000;

				//If user's token has expired
				if (decodedUser.exp < currentTime) {
					//Logout user and redirect user to login page
					store.dispatch(logout());
					window.location.href = '/login';
				}
			} else {
				//If this is first time user, start w empty store
				store = configureStore({});
			}

			//Render root component and pass in store as prop
			const root = document.getElementById('root');
			ReactDOM.render( < Root store = {
					store
				}
				/>, root);
			});
