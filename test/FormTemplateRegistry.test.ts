// @ts-ignore
import { expect } from '@open-wc/testing'
import { html, render } from 'lit-html'
import FormTemplateRegistry from '../src/lib/TemplateRegistry'
import { textbox } from '../src/components'

describe('FormTemplateRegistry', () => {
  let registry: FormTemplateRegistry

  beforeEach(() => {
    registry = new FormTemplateRegistry('test')
  })

  describe('useComponents', () => {
    it('allows component set to be changed', () => {
      // given
      registry.useComponents({
        textbox: () => () =>
          html`
            orig tb
          `,
      })
      registry.useComponents({
        textbox: () => () =>
          html`
            changed tb
          `,
      })
      registry.when
        .fieldMatches(() => true)
        .rendersComponent(
          textbox({
            type: 'single line',
          }),
        )
      const div = document.createElement('div')

      // when
      const template = registry.getTemplate({
        field: {
          property: 'prop',
        },
      } as any)
      render(
        html`
          ${template!.render()}
        `,
        div,
      )

      // then
      expect(div).dom.to.equalSnapshot()
    })

    it('allows component set to be changed when templates are set first', () => {
      // given
      registry.when
        .fieldMatches(() => true)
        .rendersComponent(
          textbox({
            type: 'single line',
          }),
        )
      registry.useComponents({
        textbox: () => () =>
          html`
            orig tb
          `,
      })
      registry.useComponents({
        textbox: () => () =>
          html`
            changed tb
          `,
      })
      const div = document.createElement('div')

      // when
      const template = registry.getTemplate({
        field: {
          property: 'prop',
        },
      } as any)
      render(
        html`
          ${template!.render()}
        `,
        div,
      )

      // then
      expect(div).dom.to.equalSnapshot()
    })
  })
})
