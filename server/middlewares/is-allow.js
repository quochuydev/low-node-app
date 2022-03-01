const isAllow = (permission) => {
  return function (req, res, next) {
    console.log("user:", req.session?.user, permission);

    if (req.session?.user) {
      res.locals = {
        user: req.session?.user,
      };

      return next();
    }

    return res.redirect("/login");
  };
};

module.exports = {
  isAllow,
};
