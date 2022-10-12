# Instructions

1. install dependencies:

```
pnpm i
```

2. Statup servers:

```
pnpm serve
```

auth service: `http://localhost:3100/apis/auth-service/graphql`
user service: `http://localhost:3200/apis/user-service/graphql`

gateway: `http://localhost:3000/apis/gateway/graphql`

queries possible:

auth service:

```
query {
    getAuthServiceHealth {
        status
        service
    }
}
```

user service

```
query {
    getUserServiceHealth {
        status
        service
    }
}
```

gateway

```
query {
    getGatewayHealth {
        status
        service
    }
}
```

File tying everything together: `gateway.app.module.ts`

Problem:

````
Error: Couldn't load service definitions for "user" at http://localhost:3200/apis/user-service/graphql: request to http://localhost:3200/apis/user-service/graphql failed, reason: connect ECONNREFUSED 127.0.0.1:3200
```
````
