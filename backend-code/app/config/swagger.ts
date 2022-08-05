import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { CONF_ENV } from '@config/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Demo API',
        description: 'This is an api documentation for Demo application.',
        version: '1.0.0',
    },
    servers: [
        {
            description: 'Server',
            url: 'http://localhost:3000/api',
        },
    ],
    tags: [
        {
            name: 'demo',
            description: 'Demo API',
        },
        {
            name: 'User',
            description: 'User API',
        },
        {
            name: 'FavLocation',
            description: 'User Fav Location API',
        },
    ],
    components: {
        schemas: {
            Demo: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '589a815f53f1eae555f01424'
                    },
                    field1: {
                        type: 'string',
                        example: 'Fields One'
                    },
                    field2: {
                        type: 'string',
                        example: 'Fields Two'
                    },
                },
            },
            User: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        example: 'first'
                    },
                    lastName: {
                        type: 'string',
                        example: 'last'
                    },
                    role: {
                        type: 'string',
                        example: 'developer',
                        enum: ['systemAdmin', 'centreAdmin', 'developer']
                    },
                    address: {
                        type: 'string',
                        example: 'xyz'
                    },
                    email: {
                        type: 'string',
                        example: 'test@gmail.com'
                    },
                    password: {
                        type: 'string',
                        example: 'U2FsdGVkX1+XxpO5ZQklb63XpTyrwqRcYD9jLgBcyiM=',
                        description: 'admin'
                    },
                },
            },
            FavLocation: {
                type: 'object',
                properties: {
                    userId: {
                        type: 'string',
                        example: '62e7a5842d1a87a87196b12f',
                    },
                    location: {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                example: 'point',
                            },
                            coordinates: {
                                type: 'array',
                                example: [76.7179, 30.7046],
                            },
                        },
                    },
                    title: {
                        type: 'string',
                        example: 'test',
                    },
                },
            },
            '200': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: ''
                    },
                    success: {
                        type: 'boolean',
                        example: true
                    },
                },
            },
            '500': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Server Not Responding.'
                    },
                },
            },
            '404': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Record not found.'
                    },
                },
            },
            '400': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: ''
                    },
                    success: {
                        type: 'boolean',
                        example: false
                    },
                },
            },
            '401': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'User Unauthenticated.'
                    },
                },
            },
        },
        securitySchemes: {
            jwt_api_auth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
};

const swaggeroptions: ILooseObject = {
    swaggerDefinition,
    apis: ['./app/routes/*.ts'],
};
const openapiSpecification = swaggerJsdoc(swaggeroptions);

const apiDoc = (app: ILooseObject) => {
    if (CONF_ENV !== 'production') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    }
};

export default apiDoc;
