const addPermission = {
  tags: ["Permission"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of the permession",
            },
            description: {
              type: "string",
              description: "description of the permession",
            },
          },
        },
      },
    },
  },
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
                name: "string",
                description: "string",
              },
            },
          },
        },
      },
    },
  },
};
const permissionDoc = {
  "/api/permission/add": {
    post: addPermission,
  },
};
module.exports = permissionDoc;
