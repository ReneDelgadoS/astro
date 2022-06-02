/*
    René Delgado Servín 02/06/2022
    ******************************
    Validator module
*/
//Validator
const Ajv = require('ajv')
const ajv = new Ajv({coerceTypes:true});

//Add validation schemas to the validator or future use.
ajv.addSchema(
    {
        type: 'object',
        required: ['count']
    },
    'get /pictures count'
)
ajv.addSchema(
    {
        type: 'object',
        properties: {
            count: { type: 'number',minimum:1,maximum:100, multipleOf: 1},
            filter: {type: 'string',maxLength: 50},
            oldest_date:{type: 'string',pattern: "/^\d{4}-\d{2}-\d{2}$/"},
            newest_date:{type: 'string',pattern: "/^\d{4}-\d{2}-\d{2}$/"},
            offset:{type: 'number',minimum:1, multipleOf: 1}
        },
        additionalProperties: false,
        required: ['count']
    },
    'get /pictures'
)
ajv.addSchema(
    {
        type: 'object',
        properties: {
            key: { type: 'string'},
            entry: {
                type: 'object',
                properties: {
                    title: {type: "string", maxLength: 100},
                    explanation:{type: "string",maxLength: 1000},
                    url:{type: "string",pattern:"/([^\\s]+(\\.(?i)(jpe?g|gif|svg|avif|webp|a?png))$)/"},
                    hdurl:{type: "string",pattern:"/([^\\s]+(\\.(?i)(jpe?g|gif|svg|avif|webp|a?png))$)/"},
                },
                additionalProperties: false,
                required: ['title','explanation','url','hdurl']
            }
        },
        additionalProperties: false,
        required: ['key','entry']
    },
    'post /pictures'
)



module.exports=ajv
