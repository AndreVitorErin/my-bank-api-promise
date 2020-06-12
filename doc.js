const swaggerDocumente = {
  swagger: '2.0',
  info: {
    description: 'My Bank API description',
    version: '1.0.0',
    title: 'My Bank API',
  },
  host: 'http://localhost:3000/doc',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/pet': {
      get: {
        tags: ['account'],
        summary: 'Get existing account description',
        description: 'Get existing account description description',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'Creat a new account',
        description: 'Creat a new account description',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Andre Vitor',
        },
        balance: {
          type: 'integer',
          example: '742.34',
        },
      },
    },
  },
};

module.exports = swaggerDocumente;
