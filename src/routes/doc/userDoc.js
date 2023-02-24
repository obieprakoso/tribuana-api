const getUserById = {
  tags: ["User"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "idUser",
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
                device: "string",
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
                  device: "string",
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
  "/api/users/getUserById/{idUser}": {
    get: getUserById,
  },
  "/api/users/getAllUserByActived/": {
    get: getAllUserByActived,
  },
};

module.exports = userRootDoc;
