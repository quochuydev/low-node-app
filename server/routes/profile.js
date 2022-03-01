module.exports = ({ app }) => {
  app.post("/bo/profiles", (req, res) => {
    res.json({
      data: [
        { id: 1, firstName: "Huy" },
        { id: 2, firstName: "Huong" },
        { id: 3, firstName: "Nhi" },
      ],
    });
  });
};
