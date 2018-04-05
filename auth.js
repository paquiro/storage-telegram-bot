const isUserAllowed = id => {
  if (typeof id === Number) id = id.toString();
  const chatsAllowed = process.env.chatsAllowed.split(" ");
  return chatsAllowed.includes(ctx.message.from.id.toString());
};
