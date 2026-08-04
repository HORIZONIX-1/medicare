const fs = require("node:fs");
const path = require("node:path");
const { Router } = require("express");
const multer = require("multer");
const organizationController = require("./organization.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");
const { 
  validate, 
  createOrganizationSchema, 
  updateOrganizationSchema 
} = require("./organization.validation");

const router = Router();
const uploadDirectory = path.join(process.cwd(), "uploads", "organization");

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `organization-logo-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    callback(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: Number.parseInt(process.env.LOGO_UPLOAD_MAX_BYTES || "2097152", 10),
  },
  fileFilter: (_req, file, callback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new Error("Logo must be a JPEG, PNG, WEBP, or SVG image"));
      return;
    }

    callback(null, true);
  },
});

router.use(authenticate, requireRoles("ADMIN"));

router
  .route("/")
  .get(organizationController.getOrganization)
  .post(validate(createOrganizationSchema), organizationController.createOrganization);

router
  .route("/:id")
  .get(organizationController.getOrganizationById)
  .patch(validate(updateOrganizationSchema), organizationController.updateOrganization)
  .delete(organizationController.deleteOrganization);

router.patch("/:id/logo", upload.single("logo"), organizationController.uploadLogo);

module.exports = router;
