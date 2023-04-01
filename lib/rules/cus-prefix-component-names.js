/**
 * @author Marton Csordas
 * See LICENSE file in root directory for full license.
 */
'use strict'

const path = require('path')
const utils = require('../utils')

const RESERVED_NAMES_IN_VUE3 = new Set(
  require('../utils/vue3-builtin-components')
)

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require component names to be always multi-word and match custom prefix',
      categories: [],
      url: ''
    },
    fixable: "code",
    schema: [
      {
        type: 'object',
        properties: {
          ignores: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
            additionalItems: false
          },
          // 自定义前缀
          prefix: {
            type: 'string',
            default: 'tms'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      notMatchCusSuffix: '{{value}}'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    /** @type {Set<string>} */
    const ignores = new Set()
    ignores.add('App')
    ignores.add('app')

    for (const ignore of (context.options[0] && context.options[0].ignores) ||
      []) {
      ignores.add(ignore)
    }

    function isValidComponentCusName(name) {
      if (ignores.has(name) || RESERVED_NAMES_IN_VUE3.has(name)) {
        return true
      }
      const test =  /^tms-\w+/.test(name)
      return test
    }

    /**
      * @param {Expression | SpreadElement} nameNode
      */
    function validateCusName(nameNode) {
      if (nameNode.type !== 'Literal') return
      const componentName = `${nameNode.value}`
      const prefix = context.options[0] && context.options[0].prefix || 'tms'
      const fileName = context.getFilename()
      const _componentName = path.basename(fileName, path.extname(fileName))
      if (!isValidComponentCusName(componentName)) {
        context.report({
          node: nameNode,
          messageId: 'notMatchCusSuffix',
          data: {
            value: `${componentName} is invalid component name, expected: ${prefix}-${_componentName}`
          },
          fix(fixer) {
            return fixer.replaceText(nameNode, `'${prefix}-${_componentName}'`)
          }
        })
      }
    }

    const visitor = utils.compositingVisitors(
      utils.executeOnVue(context, (obj) => {
        const node = utils.findProperty(obj, 'name')
        // 如果没找到也是需要fix吗？
        if (!node) return
        validateCusName(node.value)
      })
    )
    return visitor
  }
}
