"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function newUser(request, response, next) {
  // return response.status(200).json({message: 'Validation active'})
  next();
}

exports.default = { newUser: newUser };