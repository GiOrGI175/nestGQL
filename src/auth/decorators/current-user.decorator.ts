import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    const jwtService = new JwtService({ secret: 'your-jwt-secret' });
    const token = gqlContext.req.headers.authorization?.split(' ')[1];
    const decoded = jwtService.verify(token);
    return decoded.userId;
  },
);
