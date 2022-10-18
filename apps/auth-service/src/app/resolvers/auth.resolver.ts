import { UseInterceptors } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { HeadersInterceptor } from './headers.interceptor';

@ObjectType({ description: 'status response' })
export class HealthResponse {
  @Field()
  public status: 'HEALTHY';
  @Field()
  public service: string;
}

@UseInterceptors(HeadersInterceptor)
@Resolver()
export class AuthResolver {
  @Query(() => HealthResponse)
  public getAuthServiceHealth(): HealthResponse {
    return { status: 'HEALTHY', service: 'AUTH_SERVICE' };
  }
}
