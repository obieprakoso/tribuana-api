const addSubMenu = {
  tags: ["SubMenu"],
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
              description: "name of the sub menu",
            },
            master_menu: {
              type: "string",
              description: "id of the sub menu",
            },
            ordering: {
              type: "number",
              description: "Ordering position of the sub menu",
            },
            url: {
              type: "string",
              description: "url of the sub menu",
            },
            icon: {
              type: "string",
              description: "Icon of the sub menu",
            },
            is_active: {
              type: "boolean",
              description: "Active of the sub menu",
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
                master_menu: "string",
                ordering: 0,
                url: "string",
                tittle: "string",
                icon: "string",
                is_target_self: true,
                is_active: true,
              },
            },
          },
        },
      },
    },
  },
};

const getAllSubMenuByActived = {
  tags: ["SubMenu"],
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
                  master_menu: "string",
                  ordering: 0,
                  url: "string",
                  tittle: "string",
                  icon: "string",
                  is_target_self: true,
                  is_active: true,
                },
              ],
            },
          },
        },
      },
    },
  },
};

const getSubMenuById = {
  tags: ["SubMenu"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "subMenuId",
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
                master_menu: "string",
                ordering: 0,
                url: "string",
                tittle: "string",
                icon: "string",
                is_target_self: true,
                is_active: true,
              },
            },
          },
        },
      },
    },
  },
};
const getSubmenuByIdMenu = {
  tags: ["SubMenu"],
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
              data: [
                {
                  id: "string",
                  name: "string",
                  master_menu: "string",
                  ordering: 0,
                  url: "string",
                  tittle: "string",
                  icon: "string",
                  is_target_self: true,
                  is_active: true,
                },
              ],
            },
          },
        },
      },
    },
  },
};
const subMenuDoc = {
  "/api/subMenu/add": {
    post: addSubMenu,
  },
  "/api/subMenu/getAllSubMenuByActived": {
    get: getAllSubMenuByActived,
  },
  "/api/subMenu/{subMenuId}": {
    get: getSubMenuById,
  },
  "/api/subMenu/menu/{menuId}": {
    get: getSubmenuByIdMenu,
  },
};

module.exports = subMenuDoc;
