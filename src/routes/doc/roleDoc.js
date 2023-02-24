const addRole = {
  tags: ["Role"],
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
              description: "name of the role",
            },
            description: {
              type: "string",
              description: "description of the role",
            },
            menus: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  menu: {
                    type: "string",
                    description: "id of the menu",
                  },
                  submenus: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        submenu: {
                          type: "string",
                          description: "id of the submenu",
                        },
                      },
                    },
                  },
                },
              },
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
                menus: [
                  {
                    menu: "string",
                    submenus: [
                      {
                        submenu: "string",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
const roleDoc = {
  "/api/role/add": {
    post: addRole,
  },
};
module.exports = roleDoc;
