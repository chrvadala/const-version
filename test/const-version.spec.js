/* global describe, it, expect, beforeEach, afterAll, test */
const mock = require('mock-fs')
const constVersion = require('../src/const-version')
const fs = require('fs')

beforeEach(() => {
  mock({
    dummy_fs: {
      good: {
        'package.json': '{"version": "1.2.3",  "name" : "abc"}'
      },
      missing_version: {
        'package.json': '{"name" : "abc"}'
      },
      malformed_json: {
        'package.json': '{"version": "1.2.3"'
      }
    }
  })
})

afterAll(() => {
  mock.restore()
})

describe('const version', () => {
  it('should read package.json and save file with version', async () => {
    const source = 'dummy_fs/good/package.json'
    const dest = 'dummy_fs/ver.js'
    await constVersion(source, dest)
    const generatedFile = fs.readFileSync(dest, 'utf-8')
    expect(generatedFile).toMatch('1.2.3')
    mock.restore()
    expect(generatedFile).toMatchSnapshot()
  })

  test.each([
    { source: 'dummy_fs/malformed_json/package.json', expectedError: "file doesn't contain valid json" },
    { source: 'dummy_fs/notfound_package.json', expectedError: 'file not found' },
    { source: 'dummy_fs/missing_version/package.json', expectedError: "file doesn't contain version" }
  ])('should be able to handle failing scenarious. Error: \'$expectedError\'', async ({ source, expectedError }) => {
    const dest = 'dummy_fs/ver.js'
    await expect(constVersion(source, dest)).rejects.toThrow(expectedError)
    expect(fs.existsSync(dest)).toBe(false)
  })
})
