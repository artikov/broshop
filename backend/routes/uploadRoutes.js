import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		// cb = callback
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function fileFilter(file, cb) {
	const filetypes = /jpe?g|webp|png/;
	const mimetypes = /image\/jep?g|image\/webp|image\/png/;

	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = mimetypes.test(file.mimetype);

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Images only!"), false);
	}
}

const upload = multer({
	storage,
	fileFilter,
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
	uploadSingleImage(req, res, function (err) {
		if (err) {
			res.status(400).send({ message: err.message });
		}

		res.status(200).send({
			image: `/${req.file.path}`,
			message: "Image uploaded successfully!",
		});
	});
});

export default router;
