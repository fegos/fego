module.exports = {
  bail: true, // 遇到执行fail的测试用例就停止执行，方便定位错误
  collectCoverage: true, // 代码覆盖率
  coverageDirectory: '<rootDir>/coverage-report', // jest 生成的关于覆盖了的文件的输出地址
  collectCoverageFrom: ['src/[A-Z]*/*.{js,jsx}'], // 收集代码覆盖率的文件为src下的首字母大写文件夹(组件)下的js文件
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/www/', '<rootDir>/site/', '<rootDir>/src/Icon/font'], // 收集代码覆盖率忽略的文件
  moduleDirectories: ['node_modules', 'src'], // 查找包的路径
  moduleFileExtensions: ['js', 'jsx'], // 文件扩展名
  moduleNameMapper: {
    /**
     * 用于解决 Icon 组件引入字体文件引起的 jest typeError
     * 关于 moduleNameMapper 配置项说明，戳 → https://facebook.github.io/jest/docs/en/configuration.html#modulenamemapper-object-string-string
     * 就是为正则匹配的文件指定 mock 的方式，例如代码中直接 import 'xx.png' 会导致测试执行时报错，
     * 所以需通过为 png 文件指定 mock 方式来解决这一问题
     * 详见 GitHub jest issue → https://github.com/facebook/jest/issues/2663#issuecomment-340243320
     * 关于 identity-obj-proxy, 戳 → https://github.com/keyanzhang/identity-obj-proxy
     */
    '\\.(jpg|png|svg|ttf|woff|woff2)$': 'identity-obj-proxy',
    'font.js$': 'identity-obj-proxy',
  },
  notify: true,
  /**
   * setupFiles vs setupTestFrameworkScriptFile
   * https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
   * setupFiles 里的代码执行时机在 test environment installed 之前
   * setupTestFrameworkScriptFile 里的代码执行时机在 test environment installed 之后
   */
  // setupFiles: ['./enzyme.setup.js'], // enzyme 启动配置文件
  setupTestFrameworkScriptFile: './enzyme.setup.js', // enzyme 启动配置文件
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/site/', '<rootDir>/www/'], // 搜索测试用例时忽略的路径
  testRegex: '(/__tests__/.*test)\\.jsx?$', // 匹配测试文件，当前指定为以 .test.js(x) 结尾的文件
  verbose: true, // 在执行测试用例期间就报告每个测试用例的执行结果
};
