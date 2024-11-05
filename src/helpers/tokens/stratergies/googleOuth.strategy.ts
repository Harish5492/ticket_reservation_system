import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { EM } from 'src/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: EM.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
      clientSecret: EM.GOOGLE_AUTH.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('data from the google is here', profile);
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      email_verified: emails[0].verified,
      firstName: name.givenName,
      lastName: name.familyName,
      //   accessToken,
    };
    done(null, user);
  }
}
