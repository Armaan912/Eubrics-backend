import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request } from 'express';
import { Connection } from 'typeorm';

Injectable();

export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private conn: Connection,
  ) {
    super({
      secretOrKey: 'helloliAm',
      secret: 'helloliAm',
      secretOrPrivateKey: 'abcd',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.cookies.access_token) {
            const cookieKey = Object.keys(req.cookies).find((cookieKey) =>
              cookieKey.includes('access_token'),
            );
            return req.cookies[cookieKey];

            // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjU4LCJpYXQiOjE2ODM2MzM4NzAsImV4cCI6MTY4NjIyNTg3MH0.KV_9ua7GCIodu_ZY4YzFjq9Hu5ygrtzjiC2cVjazFTw';
          } else {
            return null;
          }
        },
      ]),
    });
  }

  async validate(payload): Promise<any> {
    const { _id } = payload;
    // let _id = 60;
    const prevUserRes = await this.conn.query(
      `Select * from users  where id = '${_id}';`,
    );

    let prevUser = prevUserRes[0];

    return prevUser;
  }
}
