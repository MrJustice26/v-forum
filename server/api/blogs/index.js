export default defineEventHandler((event) => {
  if (event.req.method === "GET") {
    return { message: "Hello", status: 200 };
  }
});
