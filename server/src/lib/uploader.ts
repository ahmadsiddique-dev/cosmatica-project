import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err: any, raw: any) {
            if (err) return cb(err, file.filename);
            cb(
                null,
                raw.toString("hex") + "." + file.originalname.split(".")[1]
            );
        });
    },
});

export const upload = multer({ storage: storage });
