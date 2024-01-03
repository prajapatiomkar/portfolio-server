import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, await genSalt(10));
});

UserSchema.methods.matchPassword = async function (providedPassword) {
  try {
    return await compare(providedPassword, this.password);
  } catch (error) {
    console.log(error);
  }
};

const UserModel = model("User", UserSchema);

export { UserModel };
