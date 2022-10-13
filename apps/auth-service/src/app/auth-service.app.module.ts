import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AuthResolver } from './resolvers/auth.resolver';
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
          autoSchemaFile: './apps/auth-service/schema.gql',
          sortSchema: true,
          introspection: true,
        };
        const origins = '*';
        config.cors = { origin: origins, credentials: true };
        config.path = '/apis/auth-service/graphql';
        return config;
      },
      inject: [],
    }),
  ],
  controllers: [],
  providers: [AuthResolver],
})
export class AuthServiceAppModule {}
