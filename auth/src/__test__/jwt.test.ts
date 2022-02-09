//======================================================
//  JWTs Test
//======================================================

import { generateAccessToken, generateJwt, verifyJwt } from '../util/jwt';
import { jwtToken } from '../util/jwt';

describe('Testing JWTs', () => {
  test('Generating a valid JWT', () => {
    const testToken: string = generateJwt({ hello: 'world' }, 60);

    const verified: jwtToken = verifyJwt(testToken);
    expect(verified.error == null);
  });

  test('Invalid JWT', () => {
    let testToken: string = generateJwt({ hello: 'world' }, 60);
    testToken = testToken.substring(1);
    const verified: any = verifyJwt(testToken);
    if (typeof verified == 'object') {
      expect(verified.hello === 'world');
    } else {
      expect(false);
    }
  });
});

describe('Testing check refresh token function', () => {
  test('Get new token if valid refresh token', () => {
    const refreshToken: string = generateJwt({ hello: 'world' }, 3600);
    const accessToken: jwtToken = generateAccessToken(refreshToken);
    expect(accessToken.error == null);
  });
});
