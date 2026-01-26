import { createHashPassword } from "./../src/utils/bycrypt.util";
import { prisma } from "../src/configs/prismaClient";

async function startSeedingServer(): Promise<void> {
  let usersSeedJson: { name: string; email: string; password: string }[] = [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: "Test@123",
    },
  ];

  for (let i = 0; i < usersSeedJson.length; i++) {
    let password = usersSeedJson[i]?.password;
    let hashPassword = await createHashPassword(password);
    usersSeedJson[i].password = hashPassword;
  }

  await prisma.user.createMany({ data: usersSeedJson });
}

startSeedingServer();
