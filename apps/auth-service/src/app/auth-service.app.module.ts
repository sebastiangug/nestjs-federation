import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthResolver } from './resolvers/auth.resolver';
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
          autoSchemaFile: './apps/auth-service/schema.gql',
          sortSchema: true,
          introspection: true,
        };
        const origins ="*"
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
