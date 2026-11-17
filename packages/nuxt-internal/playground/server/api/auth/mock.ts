export default defineEventHandler(async (event) => {
  await setUserSession(event, {
    user: {
      id: "mock",
    },
  });
});
