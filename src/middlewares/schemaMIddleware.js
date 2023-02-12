export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) return res.status(400).send({ message: error.details.map((d) => d.message) });

    next();
  };
}
