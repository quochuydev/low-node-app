const PDFDocument = require("pdfkit");
const fs = require("fs");
const blobStream = require("blob-stream");

module.exports = ({ app }) => {
  app.post("/files", (req, res) => {
    res.send();
  });

  app.get("/files/pdf", (req, res) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream("output.pdf"));

    doc
      // .font("fonts/PalatinoBold.ttf")
      .fontSize(25)
      .text("Some text with an embedded font!", 100, 100);

    // doc.image("path/to/image.png", {
    //   fit: [250, 300],
    //   align: "center",
    //   valign: "center",
    // });

    doc
      .addPage()
      .fontSize(25)
      .text("Here is some vector graphics...", 100, 100);

    // Draw a triangle
    doc
      .save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill("#FF3300");

    doc
      .scale(0.6)
      .translate(470, -380)
      .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      .fill("red", "even-odd")
      .restore();

    // Add some text with annotations
    doc
      .addPage()
      .fillColor("blue")
      .text("Here is a link!", 100, 100)
      .underline(100, 100, 160, 27, { color: "#0000FF" })
      .link(100, 100, 160, 27, "http://google.com/");

    // Finalize PDF file
    doc.end();

    const stream = doc.pipe(blobStream());

    stream.on("finish", function () {
      // get a blob you can do whatever you like with
      const blob = stream.toBlob("application/pdf");

      // or get a blob URL for display in the browser
      const url = stream.toBlobURL("application/pdf");
      res.status(200).send(url);
    });
  });
};
