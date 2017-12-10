"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function massCreateValidation(request, response, next) {
  var majors = request.body.majors;
  var error = [];
  for (var i = 0; i < majors.length; i++) {
    console.log(majors[i].name);
    var majorName = validateName(majors[i].name, "Major's name doesn't allow numbers or special characters");
    var majorCode = validateCode(majors[i].code, "Major's code doesn't allow characters");
    if (majorName != null) {
      error.push(majorName);
    }
    if (majorCode != null) {
      error.push(majorCode);
    }

    var courses = request.body.majors[i].courses;

    for (var j = 0; j < courses.length; j++) {
      console.log(courses[j].name);
      var courseName = validateName(courses[j].name, "Course's name doesn't allow numbers or special characters");
      var courseCode = validateCode(courses[j].code, "Course's code doesn't allow special characters");
      if (courseName != null) {
        error.push(courseName);
      }
      if (courseCode != null) {
        error.push(courseCode);
      }
    }
  }
  if (isArrayEmpty(error)) {
    return false;
  } else {
    return error;
  }
}

function validateName(name, msj) {
  var json;
  if (/^[ A-Za-záéíóúÁÉÍÓÚñ,]+$/.test(name) === false) {
    json = { error: msj, date: name };
    return json;
  }
  return null;
}

function validateCode(code, msj) {
  var json;
  if (/^[a-zA-Z0-9]+$/.test(code) === false) {
    json = { error: msj, date: code };
    return json;
  }
  return null;
}

function isArrayEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

exports.default = { massCreateValidation: massCreateValidation };