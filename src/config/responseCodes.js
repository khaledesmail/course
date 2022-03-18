const responseCode = {
  "01": {
    status: 401,
    body: {
      success: false,
      code: "01",
      message: "Auth failed, password doesn't match",
      data: {},
    },
  },
  "02": {
    status: 200,
    body: {
      success: true,
      code: "02",
      message: "You have been signed in successfully",
      data: {},
    },
  },
  "03": {
    status: 200,
    body: {
      success: true,
      code: "03",
      message: "Grades upload was successful",
      data: {},
    },
  },
  "04": {
    status: 422,
    body: {
      success: false,
      code: "04",
      message:
        "invalid value for grades, grades should be between 0 and 100 at line: ",
      data: {},
    },
  },
  "05": {
    status: 400,
    body: {
      success: false,
      code: "05",
      message: "Missed required header value",
      data: {},
    },
  },
  "06": {
    status: 200,
    body: {
      success: true,
      code: "06",
      message: "Data has been saved successfully",
      data: {},
    },
  },
  "07": {
    status: 500,
    body: {
      success: false,
      code: "07",
      message: "Unexpected server error",
      data: {},
    },
  },
  "08": {
    status: 200,
    body: {
      success: true,
      code: "08",
      message: "Data has been retrieved successfully",
      data: {},
    },
  },
  "09": {
    status: 422,
    body: {
      success: false,
      code: "09",
      message: "duplicated student ids at line: ",
      data: {},
    },
  },
  "10": {
    status: 400,
    body: {
      success: false,
      code: "10",
      message: "This email is used",
      data: {},
    },
  },
  "11": {
    status: 400,
    body: {
      success: false,
      code: "11",
      message: "This userName is not exists",
      data: {},
    },
  },
};

module.exports = responseCode;
