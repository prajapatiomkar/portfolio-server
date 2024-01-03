import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/userModel.js";

const initializePassport = (passport) => {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: (req) => {
          try {
            let token = null;
            if (req && req.cookies) {
              token = req.cookies["jwt"];
            }
            return token;
          } catch (error) {
            console.error('Error extracting JWT from request:', error);
            return null;
          }
        },
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserModel.findById(jwt_payload._id);
          
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          console.error('Error in JWT strategy:', error);
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    // You might want to only store the user's ID in the session
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await UserModel.findById(id);
      cb(null, user);
    } catch (error) {
      console.error('Error in deserializeUser:', error);
      cb(error, null);
    }
  });
};

export { initializePassport };
