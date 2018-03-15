module.exports = {
  bail: true, // 遇到执行fail的测试用例就停止执行，方便定位错误
  moduleDirectories: ['node_modules', 'src'], // 查找包的路径
  moduleFileExtensions: ['js', 'jsx'], // 文件扩展名
  notify: true,
  /**
   * setupFiles vs setupTestFrameworkScriptFile
   * https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
   * setupFiles 里的代码执行时机在 test environment installed 之前
   * setupTestFrameworkScriptFile 里的代码执行时机在 test environment installed 之后
   */
  // setupFiles: ['./enzyme.setup.js'], // enzyme 启动配置文件
  setupTestFrameworkScriptFile: './enzyme.setup.js', // enzyme 启动配置文件
  testPathIgnorePatterns: ['node_modules', 'site', 'www'], // 搜索测试用例时忽略的路径
  testRegex: '(/__tests__/.*test)\\.jsx?$', // 匹配测试文件，当前指定为以 .test.js(x) 结尾的文件
  verbose: true, // 在执行测试用例期间就报告每个测试用例的执行结果
};
