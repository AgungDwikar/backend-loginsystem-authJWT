import {Router} from "express"
import indexController from "../controller/indexController"
import verifyToken from "../middleware/VerifyToken"

const router = Router()

router.get("/", verifyToken.verifyToken,indexController.userCtrl.getUsers)
router.post("/", indexController.userCtrl.Register)
router.post("/login", indexController.userCtrl.Login)
router.get("/token", indexController.RefreshToken.refreshToken)
router.delete("/logout", indexController.userCtrl.Logout)

export default router