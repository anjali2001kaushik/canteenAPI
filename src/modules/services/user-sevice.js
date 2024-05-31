import ErrorHandler from "../../shared/utils/ErrorHandler.js";
import {
  comparePassword,
  passwordHashing,
} from "../../shared/utils/encryption/password-hash.js";
import { PermissionModel } from "../models/permission-schema.js";
import { RoleModel } from "../models/role-schema.js";
import { UserModel } from "../models/user-schema.js";

export const userService = {
//   async register(userData) {
//     try {
//       const existingUser = await UserModel.findOne({ email: userData.email });
//       if (existingUser) {
//         return null;
//       }

//       let roleIds = [];

//       if (!userData.role) {
//         const defaultRole = await RoleModel.findOne({ name: "USER" });
//         roleIds = [defaultRole._id];

//         const getUserPermission = await PermissionModel.findOne({
//           name: "GetUser",
//         });
//         defaultRole.permissions.push(getUserPermission._id);
//         await defaultRole.save();
//       } else {
//         const role = await RoleModel.findOne({ name: userData.role });
//         if (!role) {
//           throw new Error("Role not found");
//         }
//         roleIds = [role._id];

//         if (role.name === "ADMIN") {
//           const allRoles = await RoleModel.find();
//           roleIds = allRoles.map((role) => role._id);

//           const getUserPermission = await PermissionModel.findOne({
//             name: "GetUser",
//           });
//           const addUserPermission = await PermissionModel.findOne({
//             name: "AddUser",
//           });
//           role.permissions.push(getUserPermission._id, addUserPermission._id);
//           await role.save();
//         } else {
//           // Add "GetUser" permission to other roles
//           const getUserPermission = await PermissionModel.findOne({
//             name: "GetUser",
//           });
//           role.permissions.push(getUserPermission._id);
//           await role.save();
//         }
//       }
//       userData.password = await passwordHashing(userData.password);
//       const newUser = await UserModel({ ...userData, role: roleIds }).save();
//       return newUser;
//     } catch (err) {
//       throw err;
//     }
//   },

  async login(email, password) {
    try {
      // Find user by email
      const user = await UserModel.findOne({ email })
        .select("+password")
        .populate({ path: 'role', select: 'name status' }); // Populate user's role with name attribute
  
  
      if (!user) {
        throw new ErrorHandler("User Not Exists", 401);
      }
  
      const isMatch = await comparePassword(password, user.password);
  
      if (!isMatch) {
        throw new ErrorHandler("Incorrect Email or Password", 401);
      }

  
      return user;
    } catch (error) {
      console.error("Error occurred during login:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  
  ,

//   async changePassword(userId, oldPassword, newPassword) {
//     const user = await UserModel.findById(userId).select("+password");

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const isMatchOldPassword = await comparePassword(password, user.password);

//     if (!isMatchOldPassword) {
//       return null;
//     }

//     user.password = await passwordHashing(newPassword);
//     await user.save();

//     return user;
//   },

//   async getAllUsers(userId) {
//     const user = await UserModel.findById(userId).populate({
//       path: "role",
//       populate: {
//         path: "permissions",
//         model: "permissions",
//       },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const hasGetUserPermission = user.role.some((role) =>
//       role.permissions.some((permission) => permission.name === "GetUser")
//     );

//     if (!hasGetUserPermission) {
//       throw new Error("You do not have permission to get users");
//     }

//     const users = await UserModel.find({ is_deleted: false }).populate("role");
//     return users;
//   },

//   async deleteUser(userId, deleteUserId) {
//     const user = await UserModel.findOne({
//       _id: userId,
//       is_deleted: false,
//     }).populate({
//       path: "role",
//       populate: {
//         path: "permissions",
//         model: "permissions",
//       },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const hasDeleteUserPermission = user.role.some((role) =>
//       role.permissions.some((permission) => permission.name === "DeleteUser")
//     );

//     if (!hasDeleteUserPermission) {
//       throw new Error("You do not have permission to Delete users");
//     }

//     const userToDelete = await UserModel.findOne({
//       _id: deleteUserId,
//       is_deleted: false,
//     }).populate("role");

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     if (!userToDelete) {
//       return null;
//     }

//     userToDelete.is_deleted = true;
//     await userToDelete.save();

//     return user;
//   },
};

