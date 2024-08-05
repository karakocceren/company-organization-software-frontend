import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/login", (req, res, ctx) => {
    const { email, password } = req.body;

    // Mock authentication logic
    if (email === "admin@delta.smart" && password === "E4c-p7*K") {
      // Set authenticated flag
      sessionStorage.setItem("is-authenticated", "true");

      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email: "admin@delta.smart",
            accessToken: "mockAccessToken",
            roles: ["admin"], // Include roles or other user data as needed
          },
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "Invalid credentials",
        })
      );
    }
  }),

  http.get("/users", () => {
    HttpResponse.json({
      users: [
        {
          ID: "1",
          User_Role_ID: "1",
          Department_ID: "1",
          Name: "System",
          Surname: "Administrator",
          Email_Address: "admin@delta.smart",
          Password: "E4c-p7*K",
          Is_Active: "1",
        },
        {
          ID: "2",
          User_Role_ID: "2",
          Department_ID: "1",
          Name: "Tolgahan",
          Surname: "Oysal",
          Email_Address: "tolgahan.oysal@deltasmart.tech",
          Password: "",
          Is_Active: "0",
        },
      ],
    });
  }),
];
