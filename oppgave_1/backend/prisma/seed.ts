import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const usersData = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );

  console.log("Seeding users...");
  for (const user of usersData) {
    const { id, ...userData } = user;
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }
  console.log("Users seeded.");

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
      await prisma.course.upsert({
        where: { slug: course.slug },
        update: {
          title: course.title,
          description: course.description,
          categoryId: category.id,
          lessons: {
            upsert: course.lessons.map((lesson: any) => ({
              where: { id: lesson.id },
              update: {
                title: lesson.title,
                preAmble: lesson.preAmble,
                texts: {
                  upsert: lesson.texts.map((text: any) => ({
                    where: { id: text.id },
                    update: { text: text.text },
                    create: { id: text.id, text: text.text },
                  })),
                },
              },
              create: {
                id: lesson.id,
                title: lesson.title,
                slug: lesson.slug,
                preAmble: lesson.preAmble,
                texts: {
                  create: lesson.texts.map((text: any) => ({
                    id: text.id,
                    text: text.text,
                  })),
                },
              },
            })),
          },
        },
        create: {
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
              text: {
                create: lesson.texts.map((text: any) => ({
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

  const commentsData = JSON.parse(
    fs.readFileSync("src/data/comments.json", "utf-8")
  );

  console.log("Seeding comments...");
  for (const comment of commentsData) {
    const user = await prisma.user.upsert({
      where: { id: comment.createdBy.id },
      update: { name: comment.createdBy.name },
      create: {
        id: comment.createdBy.id,
        name: comment.createdBy.name,
        email: `${comment.createdBy.name
          .toLowerCase()
          .replace(" ", ".")}@example.com`,
      },
    });

    const lesson = await prisma.lesson.findUnique({
      where: { id: comment.lesson.id },
    });

    if (lesson) {
      await prisma.comment.upsert({
        where: { id: comment.id },
        update: {
          comment: comment.comment,
          lessonId: lesson.id,
          createdById: user.id,
        },
        create: {
          id: comment.id,
          comment: comment.comment,
          lessonId: lesson.id,
          createdById: user.id,
        },
      });
    } else {
      console.log(`Lesson not found for comment: ${comment.id}`);
    }
  }
  console.log("Comments seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
