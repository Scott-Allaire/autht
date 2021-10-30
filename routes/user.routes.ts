import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(authCtrl.verifyToken, userCtrl.list)
  .post(authCtrl.verifyToken, userCtrl.create);

router.param("userId", userCtrl.getUserById);

router
  .route("/api/users/:userId")
  .get(authCtrl.verifyToken, userCtrl.read)
  .put(authCtrl.verifyToken, userCtrl.update)
  .delete(authCtrl.verifyToken, userCtrl.remove);

export default router;
