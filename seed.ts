const createSeedData = async (db: any) => {
  console.log("Inserting seed data");

  const adminRole = await db.Role.create({ name: "ADMIN" });
  const userRole = await db.Role.create({ name: "USER" });
  await db.User.create({
    username: "admin",
    password: "secret",
    roleId: adminRole.id
  });
  await db.User.create({
    username: "user",
    password: "secret",
    roleId: userRole.id
  });
};

export default createSeedData;
