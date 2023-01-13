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
              code: 200,
              message: "string",
              data: {
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
  },
};
const getAllUserByActived = {
  tags: ["User"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  // parameters: [
  //   {
  //     name: "userId",
  //     in: "path",
  //     required: true,
  //     type: "string",
  //   },
  // ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              message: "string",
              data: [
                {
                  id: "string",
                  email: "string",
                  name: "string",
                  no_unit: 0,
                  no_tlp: "string",
                  is_active: true,
                  role: "string",
                },
              ],
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
  "/api/users/getAllUserByActived/": {
    get: getAllUserByActived,
  },
};

module.exports = userRootDoc;
