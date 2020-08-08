/** @format */

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('should return the initialstate', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			loading: false,
			error: null,
			authRedirectPath: '/',
		});
	});

	it('should store token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					loading: false,
					error: null,
					authRedirectPath: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'some-idtoken',
					userId: 'some-userId',
				}
			)
		).toEqual({
			token: 'some-idtoken',
			userId: 'some-userId',
			loading: false,
			error: null,
			authRedirectPath: '/',
		});
	});
});
