import { hash } from "bcrypt"
import request from "supertest"
import { Connection } from "typeorm"
import { v4 as uuid } from "uuid"

import { app } from "@shared/infra/http/app"
import createConnection from "@shared/infra/typeorm"

let connection: Connection
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    )
  })


  it("should be able to list all categories ", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    })

    const { token } = responseToken.body
    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest1232132311233215235345345345345",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    await request(app)
      .post("/categories")
      .send({
        name: "Category gdfssdg",
        description: "Category sdgsdf",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    await request(app)
      .post("/categories")
      .send({
        name: "Category gdfgfggghggg",
        description: "Category sdgsdf",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Category Supertest1232132311233215235345345345345")
  })
})