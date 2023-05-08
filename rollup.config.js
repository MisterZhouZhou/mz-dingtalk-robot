import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import rollupCommonjs from '@rollup/plugin-commonjs'
import { builtinModules } from 'module';
import pkg from './package.json'

// 前端 or node, 前端项目开始服务
const isF2e = false
// 环境变量
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// 不需打包的依赖
const externalDeps = Object.keys(pkg.dependencies || {}).concat(builtinModules)

const banner = `/* ${pkg.name} version is ${pkg.version} commonjs */`;
const footer = '/* email: 16619930394@163.com */'
// const footer = `
// module.exports = Object.assign(exports.default, exports);
// /* email: 16619930394@163.com */
// `;

export default {
  input: 'src/index.ts', // 打包入口
  output: [ // 打包输出
    {
      file: 'dist/'+pkg.main, // 输出文件路径
      format: 'cjs', // 打包模式
      exports: 'named',
      banner, // 顶部提示
      footer, // 底部提示,
    },
    {
      file: 'dist/'+pkg.module, // 输出文件路径
      format: 'esm', // 打包模式
      exports: 'named',
      banner, // 顶部提示
      footer, // 底部提示,
    }
  ],
  external: externalDeps,
  plugins: [
    nodeResolve({  // 查找和打包node_modules中的第三方模块
      extensions: ['.js', '.ts']
    }),
    typescript(),
    rollupCommonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: '**/node_modules/**',
      extensions: [".js", '.ts'],
    }),
    isDevelopment && isF2e && serve({ // 开启服务
      open: true, // 打开浏览器
      openPage: '/public/index.html', // 默认打开的页面
      port: 3000, // 端口号
      contentBase: '',
    }),
    // isProduction && terser(),
  ]
}