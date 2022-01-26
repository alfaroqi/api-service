const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const fs = require("fs");

const { Media } = require("../models");

router.get("/", async (req, res) => {
  const media = await Media.findAll({
    attributes: ["id", "image"],
  });

  const mappedMedia = media.map((media) => {
    media.image = `${req.get("host")}${media.image}`;
    return media;
  });

  return res.json({
    status: "success",
    data: mappedMedia,
  });
});

/* GET root listing. */
router.post("/", (request, response) => {
  const image = request.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return response.status(400).json({
      status: "error",
      message: "Invalid image format base64",
    });
  }
  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    if (err) {
      return response
        .status(400)
        .json({ status: "error", message: err.message });
    }
    const filename = filepath.split("/").pop();

    const media = await Media.create({ image: `/images/${filename}` });

    return response.json({
      status: "success",
      data: {
        id: media.id,
        image: `${request.get("host")}/images/${filename}`,
      },
    });
  });
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const media = await Media.findByPk(req.params.id);

  if (!media) {
    return res
      .status(404)
      .json({ status: "error", message: "Media not found" });
  }
  fs.unlink(`./public${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
    await media.destroy();

    return res.json({
      status: "success",
      message: `image with id ${id} deleted`,
    });
  });
});

module.exports = router;
