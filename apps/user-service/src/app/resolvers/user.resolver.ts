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
export class UserResolver {

  @Query(() => HealthResponse)
  public getUserServiceHealth(): HealthResponse {
    return { status: 'HEALTHY', service: "USER_SERVICE" };
  }
}
