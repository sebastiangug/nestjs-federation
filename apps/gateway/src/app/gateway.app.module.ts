import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { RootResolver } from './resolvers/root.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [],
      inject: [],

      useFactory: () => {
        const server: ApolloDriverConfig = {
          debug: true,
          playground: true,
          autoSchemaFile: './apps/gateway/schema.gql',
          sortSchema: true,
          introspection: true,
        };
        const origins = '*';
        server.cors = { origin: origins, credentials: true };
        server.path = '/apis/gateway/graphql';

        const resolveSubgraphUrl = (service: string) => {
          const env = process.env.ENVIRONMENT;

          if (env) {
            return `https://${env}.yeo.services/apis/${service}-service/graphql`;
          } else {
            switch (service) {
              case 'auth':
                return `http://localhost:3100/apis/auth-service/graphql`;
              case 'user':
                return `http://localhost:3200/apis/user-service/graphql`;
              default:
                return;
            }
          }
        };

        return {
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphHealthCheck: true,
              subgraphs: [
                {
                  name: 'user',
                  url: resolveSubgraphUrl('user'),
                },
                {
                  name: 'auth',
                  url: resolveSubgraphUrl('auth'),
                },
              ],
            }),
          },
          server,
        };
      },
    }),
  ],
  controllers: [],
  providers: [RootResolver],
})
export class GatewayAppModule {}
