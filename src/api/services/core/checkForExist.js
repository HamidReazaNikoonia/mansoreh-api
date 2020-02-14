const checkForExist = async (id, Object) => {
  const instance = await Object.findById(id);
  console.log(instance);
  if (instance) {
    return instance;
  }

  return false;
};

module.exports = checkForExist;
