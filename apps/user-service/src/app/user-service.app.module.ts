import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserResolver } from './resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [],
      useFactory: () => {
        const config: ApolloDriverConfig = {
          debug: true,
          playground: true,
          autoSchemaFile: './apps/user-service/schema.gql',
          sortSchema: true,
          introspection: true,
        };
        const origins ="*"
        config.cors = { origin: origins, credentials: true };
        config.path = '/apis/user-service/graphql';
        return config;
      },
      inject: [],
    }),
  ],
  controllers: [],
  providers: [UserResolver],
})
export class UserServiceAppModule {}
