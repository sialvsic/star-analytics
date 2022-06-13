!function () {
  //缓存
  const installModuels = {};

  function __webpack_require__(moduleId) {
    if (installModuels[moduleId]) {
      return installModuels[moduleId];
    }

    let modules = installModuels[moduleId] = {
      exports: {},
    };

    modules[moduleId] = call(moduleId.exports, module, __webpack_require__);

    return module.exports;
  }

  return __webpack_require__('__entry__');
}({__modules_content_});
