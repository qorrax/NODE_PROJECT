import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {

    try {
        

          await prisma.admin.create({
            data: {
                id: 1,
                "username": "ali",
                "password": "123456",
            }

            });

       console.log("seed is done!"); 

    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }

}

seed();