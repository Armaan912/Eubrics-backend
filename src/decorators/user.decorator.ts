import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import _ = require('lodash');

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? _.get(user, data) : user;
  },
);
