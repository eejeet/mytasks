import Swal from "sweetalert2";

export function axiosErrorAlert(error) {
  console.log("error", error);
  let message = error;
  //if not error.response
  if (error.response) {
    if (error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat();
      message = errorMessages.join("\n");
    } else {
      message = error.response.data.message;
    }
  }
  // // toast(error.response.data.message, {type: 'error'})
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    // confirmButtonText: 'Cool'
  });
}

export function errorAlert(msg) {
  Swal.fire({
    title: "Error!",
    text: msg,
    icon: "error",
    // confirmButtonText: 'Cool'
  });
}
export function successAlert(message) {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    // confirmButtonText: 'Cool'
  });
}

export function successAlertWithRedirect(message, redirect) {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    // confirmButtonText: 'Cool'
  }).then(() => {
    window.location.href = redirect;
  });
}

export function axiosErrorAlertWithRedirect(error, redirect) {
  let message = error;
  //if not error.response
  if (error.response) message = error.response.data.message;
  // // toast(error.response.data.message, {type: 'error'})
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    // confirmButtonText: 'Cool'
  }).then(() => {
    window.location.href = redirect;
  });
}

export function axiosSuccessAlertWithReload(message) {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    // confirmButtonText: 'Cool'
  }).then(() => {
    window.location.reload();
  });
}

export function axiosSuccessAlertWithCallback(message, callback) {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    // confirmButtonText: 'Cool'
  }).then(() => {
    callback();
  });
}

export function axiosErrorAlertWithCallback(error, callback) {
  let message = error;
  //if not error.response
  if (error.response) message = error.response.data.message;
  // // toast(error.response.data.message, {type: 'error'})
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    // confirmButtonText: 'Cool'
  }).then(() => {
    callback();
  });
}

// save token to local storage
export function saveTokenToLocalStorage(token) {
  localStorage.setItem("token", token);
}

// remove token from local storage
export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}

// get token from local storage
export function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

// check if user is authenticated
export function isAuthenticated() {
  return !!getTokenFromLocalStorage();
}

// logout user
export function logout() {
  removeTokenFromLocalStorage();
  window.location.href = "/login";
}
