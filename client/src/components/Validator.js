function validId(str) {
  return /^(?=.*[A-Za-z0-9]){4,10}$/.test(str);
}

function strongPassword(str) {
  return /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,10}$/.test(str);
}

export { validId, strongPassword }