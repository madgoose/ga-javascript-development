// the router is agnostic and should not be specific to any controller


const express = require('express');
const router  = express.Router();



// root path
router.get("/", (req, res) => {
  res.redirect(302, "/foods");
});

// Food Restful routes


router.route("foods")
  .get(foodsController.index)
  .post(foodsController.create)

router.route("/foods/new").get(foodsController.new);

router.get("/foods/:id", foodsController.show); // colon before, express treats it as dynamic
router.get("/foods/:id/edit", foodsController.edit);
router.put("/foods/:id", foodsController.update);
router.delete("/foods/:id", foodsController.delete);

module.exports = router;
