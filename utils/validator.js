import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRegister = validator(registerSchema);
const validateLogin = validator(loginSchema);

export { validateRegister, validateLogin };
