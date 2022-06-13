var installedModules = {};

// The require function
function __webpack_require__(moduleId) {

  // Check if module is in cache
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
  };

  // Execute the module function
  modules[moduleId].call(module.exports, module, module.exports,
    __webpack_require__);

  // Flag the module as loaded
  module.l = true;

  // Return the exports of the module
  return module.exports;
}

!function (obj) {
  {
    filepath: fileContent;
  }
}(obj);

//文件能够打包 __webpack_require__
//0.获取配置 npm link
//1.解析文件依赖
//2.替换require
//3.本地使用对象存储所有的文件，然后通过使用未__webpack_require__ 获取文件内容

// loader
// plugin
