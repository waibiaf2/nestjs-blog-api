import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_AUTOLOAD_ENTITIES: Joi.boolean().default(true),
  PROFILE_API_KEY: Joi.string().required(),
});
