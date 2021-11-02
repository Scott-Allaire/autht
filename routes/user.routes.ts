import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(authCtrl.authorize, authCtrl.hasAdminRole, userCtrl.list)
  .post(authCtrl.authorize, authCtrl.hasAdminRole, userCtrl.create);

router.param("userId", userCtrl.getUserById);

router
  .route("/api/users/:userId")
  .get(authCtrl.authorize, authCtrl.hasAdminRole, userCtrl.read)
  .put(authCtrl.authorize, authCtrl.hasAdminRole, userCtrl.update)
  .delete(authCtrl.authorize, authCtrl.hasAdminRole, userCtrl.remove);

export default router;
