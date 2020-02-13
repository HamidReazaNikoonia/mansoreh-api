const checkForExist = async (id, Object) => {
  const instance = await Object.findById(id);
  console.log('this is ||||||||||| ');
  console.log(instance);
  console.log('this is ||||||||||| ');
  if (instance) {
    return instance;
  }

  return false;
};

module.exports = checkForExist;
