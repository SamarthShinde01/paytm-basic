import zod from "zod";

const userRegisterZod = zod.object({
	firstName: zod.string({ message: "Enter valid fist name" }),
	lastName: zod.string({ message: "Enter valid last name" }),
	username: zod.string({ message: "Enter valid email address" }).email(),
	password: zod.string({ message: "Enter valid password" }),
});

const userAuthZod = zod.object({
	username: zod.string().email(),
	password: zod.string(),
});

export { userRegisterZod, userAuthZod };
