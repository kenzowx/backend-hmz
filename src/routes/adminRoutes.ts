import { Request, Response, Router } from "express";
import { loginAdmin, createAdmin, listAdmins  } from "../controllers/adminController";
import asyncHandler from "express-async-handler";




const router = Router();

router.post("/login", (req, res) => {
  loginAdmin(req, res);
});

router.post("/", asyncHandler(createAdmin));    // POST /admins
router.get("/", asyncHandler(listAdmins));      // GET /admins
export default router;


