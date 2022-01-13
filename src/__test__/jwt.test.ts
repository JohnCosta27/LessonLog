//======================================================
//  JWTs Test
//======================================================

import { generateJwt, verifyJwt } from '../util/jwt';

describe('Testing JWTs', () => {
  test('Generating a valid JWT', () => {
    const testToken: string = generateJwt({ hello: 'world' }, 60);

    const verified: any = verifyJwt(testToken);
    if (typeof verified == 'object') {
      expect(verified.hello === 'world');
    } else {
      expect(false);
    }
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
