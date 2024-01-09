const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Buffroo',
      version: '0.9.0',
      description: 'API for Buffroo - a gym tracking app',
    },
    components: {
      schemas: {
        Exercise: {
          type: 'object',
          properties: {
            userId: { type: 'string', required: true },
            name: { type: 'string', required: true },
            bodypart: { type: 'string', required: true },
            category: { type: 'string', required: false },
          },
        },
        UserExercise: {
          type: 'object',
          properties: {
            name: { type: 'string', required: true },
            bodypart: { type: 'string', required: true },
            category: { type: 'string', required: false },
          },
        },
        User: {
          type: 'object',
          properties: {
            username: { type: 'string', required: true, unique: true },
            password: { type: 'string', required: true },
            email: { type: 'string', required: true, unique: true },
            roles: {
              User: { type: 'number', default: 2001 },
              Admin: { type: 'number' },
            },
            refreshToken: { type: 'string' },
            userData: {
              preferences: {
                theme: { type: 'string', default: 'light' },
                unitSystem: { type: 'string', default: 'metric' },
              },
              goals: {
                workoutsPerWeek: { type: 'number', default: 3 },
              },
              dashboard: [
                {
                  type: { type: 'string', required: true },
                  exerciseId: { type: 'string' },
                },
              ],
            },
          },
        },
        UserWorkoutTemplate: {
          type: 'object',
          properties: {
            userId: { type: 'string', required: true },
            name: { type: 'string', required: true },
            notes: { type: 'string', required: false },
            exercises: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  sets: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        reps: { type: 'number' },
                        weight: { type: 'number' },
                        rpe: { type: 'number' },
                      },
                    },
                  },
                  exerciseId: { type: 'string' },
                },
              },
            },
          },
        },
        WorkoutSession: {
          type: 'object',
          properties: {
            userId: { type: 'string', required: true },
            name: { type: 'string', required: true },
            startdate: { type: 'string', required: true },
            enddate: { type: 'string', required: true },
            notes: { type: 'string', required: false },
            exercises: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  sets: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        reps: { type: 'number' },
                        weight: { type: 'number' },
                        rpe: { type: 'number' },
                      },
                    },
                  },
                  exerciseId: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/**/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;