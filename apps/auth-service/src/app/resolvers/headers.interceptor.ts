import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const contextType = context.getType<GqlContextType>();
    const gqlContext = GqlExecutionContext.create(context);
    const gqlReq = gqlContext.getContext().req;

    console.log(gqlReq.headers);

    return next.handle();
  }
}
