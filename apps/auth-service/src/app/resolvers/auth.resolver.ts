import { Query, Resolver } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType({ description: 'status response' })
export class HealthResponse {
  @Field()
  public status: 'HEALTHY';
  @Field()
  public service: string;
}


@Resolver()
export class AuthResolver {


  @Query(() => HealthResponse)
  public getAuthServiceHealth(): HealthResponse {
    return { status: 'HEALTHY', service: "AUTH_SERVICE" };
  }
}
