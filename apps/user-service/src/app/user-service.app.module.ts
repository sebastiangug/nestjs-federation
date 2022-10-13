import { Module } from '@nestjs/common';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';

import { UserResolver } from './resolvers/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [],
      useFactory: () => {
        const config: ApolloFederationDriverConfig = {
          debug: true,
          playground: true,
          autoSchemaFile: './apps/user-service/schema.gql',
          sortSchema: true,
          introspection: true,
        };
        const origins = '*';
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
