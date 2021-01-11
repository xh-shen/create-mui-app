/*
 * @Author: shen
 * @Date: 2021-01-11 21:39:29
 * @LastEditors: shen
 * @LastEditTime: 2021-01-11 22:44:03
 * @Description: 
 */
import {promisify} from 'util'
import chalk from 'chalk'

const log = content => console.log(chalk.white(content))
export const clone = async (repo,desc) => {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    log(`🗃  Initializing git repository...`)
    const process = ora()
    process.start()
    await download(repo, desc)
    process.succeed()
}