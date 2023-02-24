const addMenu = {
  tags: ["Menu"],
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
              description: "name of the menu",
            },
            ordering: {
              type: "number",
              description: "Ordering position of the menu",
            },
            icon: {
              type: "string",
              description: "Icon of the menu",
            },
            url: {
              type: "string",
              description: "Url of the menu",
            },
            is_active: {
              type: "boolean",
              description: "Active of the menu",
            },
            submenu_exist: {
              type: "boolean",
              description: "Active of the submenu exist",
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
                ordering: 0,
                icon: "string",
                is_active: true,
              },
            },
          },
        },
      },
    },
  },
};

const getAllMenuByActived = {
  tags: ["Menu"],
  security: [
    {
      bearerAuth: [],
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
              data: [
                {
                  id: "string",
                  name: "string",
                  ordering: 0,
                  icon: "string",
                  is_active: true,
                  submenu_exist: true,
                },
              ],
            },
          },
        },
      },
    },
  },
};

const getMenuById = {
  tags: ["Menu"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "menuId",
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
                name: "string",
                ordering: 0,
                icon: "string",
                is_active: true,
                submenu_exist: true,
              },
            },
          },
        },
      },
    },
  },
};
const masterMenuDoc = {
  "/api/menu/add": {
    post: addMenu,
  },
  "/api/menu/getAllMenuByActived": {
    get: getAllMenuByActived,
  },
  "/api/menu/{menuId}": {
    get: getMenuById,
  },
};

module.exports = masterMenuDoc;
