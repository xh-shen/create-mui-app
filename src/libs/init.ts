/*
 * @Author: shen
 * @Date: 2021-01-11 21:17:18
 * @LastEditors: shen
 * @LastEditTime: 2021-01-11 23:02:31
 * @Description: 
 */
import {promisify} from 'util'
import figlet from 'figlet';
import clear from 'clear'
import chalk from 'chalk'
import {clone} from './download'
import path from 'path';

const figletPromisify = promisify(figlet);

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise((resolve:any) => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
const log = content => console.log(chalk.white(content))
const init = async name => {
    // 打印欢迎画面
    clear()
    const data = await figletPromisify('shen')
    log(data)
    // 创建项目
    console.log(chalk.bold.blue(`Create Mui App v${require('../../package').version}`))
    const targetDir = path.resolve(process.cwd(), name || '.')
    log(`✨  Creating project in ${chalk.yellow(targetDir)}.`)
    // 克隆代码
    await clone('github:xh-shen/mui-app-template', name)
    log(`⚙\u{fe0f}  Installing Project plugins. This might take a while...`)
    console.log()
    await spawn('npm', ['install'], { cwd: `./${name}` })
    await spawn('git', ['remote', 'remove', 'origin'], { cwd: `./${name}` })
    console.log()
    log(`🎉  Successfully created project ${chalk.yellow(name)}.`)
    log(
      `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`) +
      chalk.cyan(` ${chalk.gray('$')} npm run start`)
    )
}

export default init;