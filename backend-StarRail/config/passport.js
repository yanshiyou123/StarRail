const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Employee = require("../models/employees");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // First try to match User
      User.findOne({ username: username }).then((user) => {
        if (user) {
          // Match User password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              
              const entityWithAdminFlag = {
                ...user.toObject(),
                isAdmin: user.isAdmin,
              };
              return done(null, entityWithAdminFlag);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        } else {
          // If User not found, try to match Employee
          Employee.findOne({ username: username }).then((employee) => {
            if (!employee) {
              return done(null, false, {
                message: "Username is not registered",
              });
            }
            // Match Employee password
            bcrypt.compare(password, employee.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                const entityWithAdminFlag = {
                  ...employee.toObject(),
                  isAdmin: employee.isAdmin,
                };
                return done(null, entityWithAdminFlag);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          });
        }
      });
    })
  );

  passport.serializeUser((entity, done) => {
    const entityType = entity instanceof User ? "user" : "employee";
    done(null, { id: entity.id, type: entityType });
  });

  passport.deserializeUser((obj, done) => {
    if (obj.type === "user") {
      User.findById(obj.id, function (err, user) {
        done(err, user);
      });
    } else {
      Employee.findById(obj.id, function (err, employee) {
        done(err, employee);
      });
    }
  });
};
