const loginDoc = {
  tags: ["Auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Email of the user",
            },
            password: {
              type: "string",
              description: "Password of the user",
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
              id: "string",
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
      },
    },
  },
};

const signup = {
  tags: ["Auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Email of the user",
            },
            name: {
              type: "string",
              description: "name of the user",
            },
            no_unit: {
              type: "number",
              description: "Number unit of the user",
            },
            no_tlp: {
              type: "string",
              description: "Nomer telepon of the user",
            },
            is_active: {
              type: "boolean",
              description: "Active of the user",
            },
            role: {
              type: "string",
              description: "Role of the user",
            },
            password: {
              type: "string",
              description: "Password of the user",
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
              id: "string",
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
      },
    },
  },
};

const logout = {
  tags: ["Auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              description: "Refresh token of the user",
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
              success: true,
            },
          },
        },
      },
    },
  },
};

const logoutAll = {
  tags: ["Auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              description: "Refresh token of the user",
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
              success: true,
            },
          },
        },
      },
    },
  },
};

const accessToken = {
  tags: ["Auth"],
  parameters: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              description: "Refresh token of the user",
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
              id: "string",
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
      },
    },
  },
};

const refreshToken = {
  tags: ["Auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              description: "Refresh token of the user",
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
              id: "string",
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
      },
    },
  },
};

const authRootDoc = {
  "/api/auth/login": {
    post: loginDoc,
  },
  "/api/auth/signup": {
    post: signup,
  },
  "/api/auth/logout": {
    post: logout,
  },
  "/api/auth/logoutAll": {
    post: logoutAll,
  },
  "/api/auth/accessToken": {
    post: accessToken,
  },
  "/api/auth/refreshToken": {
    post: refreshToken,
  },
};

module.exports = authRootDoc;
