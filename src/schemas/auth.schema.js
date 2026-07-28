const z = require("zod");

module.exports = z.object({
  email: z.string().email({
    msg: "Please enter valid email",
  }),

  password: z
    .string()
    .min(8, {
      msg: "Password must be at least 8 characters",
    })

    .regex(/[A-Z]/, {
      msg: "Password must has at least one capital character",
    })

    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      msg: "Password must has at least one special character",
    }),
});
