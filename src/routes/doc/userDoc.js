const getUserById = {
  tags: ["User"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "userId",
      in: "path",
      required: true,
      type: "string",
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              id: "string",
              email: "string",
              name: "string",
              no_unit: 0,
              no_tlp: "string",
              is_active: true,
              role: "string",
            },
          },
        },
      },
    },
  },
};

const userRootDoc = {
  "/api/users/getUserById/{userId}": {
    get: getUserById,
  },
};

module.exports = userRootDoc;
