# Infinisoft Micro App Template

## Getting Started
Application is completely bootstraped by `@infini-soft/cli` and ready to implement.


| Environments | Commands | Description |
|--- |--- |--- |
| development | yarn start | Local dev env |
| test| yarn start:test | e2e Test environement |
| mock | yarn start:mock | Mock data in `mock/` folder |


## Implementation
Before starting impelementation, it's required to understand our micro app design standards.

```
|
+-- src/
|       pages/
|            index.tsx          Micro app entry point, including config provider, context (Should avoid to be changed)
|
|            components/
|                    App.tsx    Implementation should start in this component
|
+--- mock/
|         api.ts                CRUD mock api methods POST PUT GET
|         data.ts               Data mocking
|
|---- .env                      Configuration ex: Port number
|
|
```


## Configurations
Following is the configuration folder structure.

> IMPORTANT   
> Api proxy config MUST be prefixed by `/api` to work unless custom config. (Not recommanded)

```
|
+-- config/
|         config.ts             Umijs, Define API URL
|         icConfig.ts           Infinicloud
|
+-- mock/
|         api.ts                CRUD mock api methods POST PUT GET
|         data.ts               Data mockin
|
|--- .env                      Configuration ex: Port number
|
|
```

## Models   

Application data models is standard OpenAPI 3.0 to fully support automation of our system. Providing an compliant JSON Schema inside following folders will generate typings, sdk, operations, services to interact smoothly with front-end.   


> IMPORTANT   
> Changing folder structure will break code generation and integration    


```
|
+-- models/
|         collections                   Postman collection synced with Postman workspace
|         schemas                       JSON Schema synced with Postman workspace
|
+--- src/
|         hooks/                        React hook
|              useOperations.tsx        Generated CRUD event handlers. Logging, UI Feedback, Error handling is all implemented
|
|--- services/                          OpenAPI Generated SDK
|---        schema/                     Typings and API requests
|
|
```

### Regenerate SDK
When changing model definition, run following command to regenerate sdk, typings, api requests, event handlers.

```bash
$ yarn openapi
```