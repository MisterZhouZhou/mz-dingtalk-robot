import path from 'path';
// import nodeResolve from '@rollup/plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
// import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { builtinModules } from 'module';
import pkg from './package.json'

// 环境变量
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// 不需打包的依赖
const externalDeps = Object.keys(pkg.dependencies || {}).concat(builtinModules)

const banner = `/* ${pkg.name} version is ${pkg.version} commonjs */`;
const footer = '/* email: 16619930394@163.com */'

export default {
  input: 'src/index.ts', // 打包入口
  output: [ // 打包输出
    {
      file: path.resolve('./dist', pkg.main), // 输出文件路径
      format: 'cjs', // 打包模式
      indent: false,
      exports: 'named', // 消除 bundle['default'] to access the default export 警告
      banner, // 顶部提示
      footer, // 底部提示,
    },
    {
      file: path.resolve('./dist', pkg.module), // 输出文件路径
      format: 'esm', // 打包模式
      indent: false,
      exports: 'named',
      banner, // 顶部提示
      footer, // 底部提示,
    }
  ],
  external: externalDeps,
  plugins: [
    // nodeResolve({  // 查找和打包node_modules中的第三方模块
    //   extensions,
    //   modulesOnly: true,
    // }),
    // commonjs(),
    // typescript({ module: "ESNext" }),
    // babel({
    //   exclude: 'node_modules/**',
    //   extensions,
    // }),
    // babel({
    //   // babelHelpers: 'bundled',
    //   exclude: 'node_modules/**',
    //   // extensions: [".js", '.ts'],
    // }),
    typescript(),
    isDevelopment && serve({ // 开启服务
      open: true, // 打开浏览器
      openPage: '/public/index.html', // 默认打开的页面
      port: 3000, // 端口号
      contentBase: '',
    }),
    isProduction && terser(),
  ]
}