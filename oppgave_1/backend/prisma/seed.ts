import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  // Load Users
  const usersData = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );

  console.log("Seeding users...");
  for (const user of usersData) {
    const { id, ...userData } = user; // Remove the id field
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }
  console.log("Users seeded.");

  // Load Categories
  const categoriesData = JSON.parse(
    fs.readFileSync("src/data/categories.json", "utf-8")
  );

  console.log("Seeding categories...");
  for (const categoryName of categoriesData) {
    const normalizedCategoryName = categoryName.toLowerCase();
    await prisma.category.upsert({
      where: { name: normalizedCategoryName },
      update: {},
      create: { name: normalizedCategoryName },
    });
    console.log(`Category created or updated: ${normalizedCategoryName}`);
  }
  console.log("Categories seeded.");

  // Load courses
  const coursesData = JSON.parse(
    fs.readFileSync("src/data/courses.json", "utf-8")
  );

  console.log("Seeding courses...");
  for (const course of coursesData) {
    const normalizedCategoryName = course.category.toLowerCase();
    const category = await prisma.category.findUnique({
      where: { name: normalizedCategoryName },
    });

    if (category) {
      console.log(`Seeding course: ${course.title}`);
      await prisma.course.create({
        data: {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          categoryId: category.id,
          lessons: {
            create: course.lessons.map((lesson: any) => ({
              id: lesson.id,
              title: lesson.title,
              slug: lesson.slug,
              preAmble: lesson.preAmble,
              texts: {
                create: lesson.text.map((text: any) => ({
                  id: text.id,
                  text: text.text,
                })),
              },
            })),
          },
        },
      });
    } else {
      console.log(`Category not found for course: ${course.title}`);
    }
  }
  console.log("Courses seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
