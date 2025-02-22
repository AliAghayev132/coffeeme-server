// Packages
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coffeeme API',
            version: '1.0.0',
            description: 'Coffeeme üçün APİ - dokumentasiyası',
        },
        servers: [
            {
                url: 'https://www.coffeeme.app/api',
            },
        ],
    },

    apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));