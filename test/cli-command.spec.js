/* global describe, jest, expect, beforeEach, afterEach, test */

const mockFs = require('mock-fs')
const execCliCommand = require('../src/cli-command')

const EXIT_ERROR = 1

const toArgv = str => [
  '/usr/local/bin/node',
  __filename,
  ...str.split(' ')
].filter(s => s.length > 0)

let mockStdout, mockStderr, mockExit
beforeEach(() => {
  mockFs({
    '/tmp/dummy_fs/package.json': '{"version": "1.2.3",  "name" : "abc"}'
  })
  mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => {})
  mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {})
  mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
})
afterEach(resetMocks)

function resetMocks () {
  mockExit.mockRestore()
  mockStdout.mockRestore()
  mockStderr.mockRestore()
  mockFs.restore()
}

describe('cli-command', () => {
  test('no args', async () => {
    const argv = toArgv('')
    await expect(execCliCommand(argv)).rejects.toThrow()

    expect(mockExit).toHaveBeenCalledWith(EXIT_ERROR)
    expect(mockStderr).toHaveBeenCalledWith(expect.stringContaining("missing required argument 'package.json'"))
  })

  test('first arg only', async () => {
    const argv = toArgv('package.json')
    await expect(execCliCommand(argv)).rejects.toThrow()

    expect(mockExit).toHaveBeenCalledWith(EXIT_ERROR)
    expect(mockStderr).toHaveBeenCalledWith(expect.stringContaining("missing required argument 'target_file'"))
  })

  test('full command', async () => {
    const argv = toArgv('/tmp/dummy_fs/package.json /tmp/_test.js')
    await execCliCommand(argv)

    mockFs.restore()

    expect(mockExit).toHaveBeenCalledTimes(0)
    expect(mockStderr).toHaveBeenCalledTimes(0)
  })
})
