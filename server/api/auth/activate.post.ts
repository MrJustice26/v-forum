import userService from "~~/server/services/user-service";
export default defineEventHandler(async (event) => {
  const { activationLink } = await readBody(event);
  const res = await userService.activate(activationLink);
  return res;
});
