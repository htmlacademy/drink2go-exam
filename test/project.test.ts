import { describe, expect, it, test } from 'vitest'
import { lint } from 'stylelint'
describe('project-good test', () => {

  it('bar', () => {
    expect(1 + 1).eq(2)
  })

  it('snapshot', ({ expect }) => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })

  it('style lint', async ({ expect}) => {
    const { errored } = await lint({
      config: {
        extends: 'stylelint-config-htmlacademy'
      },
      files: 'project/**/*.scss'
    })
    expect(errored).toBeFalsy()
  })
})

