import { UserModel } from "../modules/models/user-schema.js";

export const rbacMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).populate("role");

    const requiredPermission = req.routePermission;
    const hasPermission = user.role.permissions.some(
      (permission) => permission.name === requiredPermission
    );

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
