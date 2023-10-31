import Joi from "joi";

import { RegexConstants } from "../constants";

export class userSchema {
  static email = Joi.string().email().regex(RegexConstants.EMAIL).messages({
    "string.email": "{{#label}} must be a valid email",
    "any.required": "{{#label}} is required!!",
    "string.pattern.base":
      "{{#label}} should start with alphanumeric, underscores, dots, or hyphens, followed by '@', then alphanumeric, dots or hyphens, and end with 2 to 4 alphabet characters.",
  });

  static password = Joi.string().regex(RegexConstants.PASSWORD).messages({
    "string.pattern.base":
      "{{#label}} must be 3 to 20 characters, contain at least one lowercase letter, one uppercase letter, and one number.",
    "any.required": "{{#label}} is required!!",
  });

  static create = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
