<template>
  <div id="app" class="fr-container">
    test
    <RenderField v-bind="fieldProps" />
  </div>
</template>

<script>

import { widgets as defaultWidgets } from '@/widgets/elementui'
import { mapping as defaultMapping } from '@/mapping'
import RenderField from '@/core/RenderField'

import {
  getValueByPath,
  getDataPath,
  clone,
  schemaContainsExpression,
  parseAllExpression
} from '@/utils'
const tools = {
  widgets: { ...defaultWidgets },
  mapping: { ...defaultMapping }
}
const store = {
  formData: {}
}
const store2 = {
  disabled: false,
  showValidate: true,
  debounceInput: true
}
export default {
  provide: { tools, store, store2 },
  components: { RenderField },
  data() {
    const id = '#'
    const dataIndex = []
    const dataPath = getDataPath(id, dataIndex)
    const formData = {}
    const _value = getValueByPath(formData, dataPath)
    const labelClass = 'fr-label'
    const labelStyle = ''
    const contentClass = 'fr-content'
    const errorFields = [
      { name: '#', error: ['Please input your Password!', 'something else is wrong'] }
    ]
    const displayType = 'column'
    const hideTitle = false
    const hideValidation = false
    return {
      fieldProps: {
        dataIndex: dataIndex,
        dataPath,
        _value,
        _schema: {
          type: 'object',
          properties: {
            input1: {
              title: '简单输入框',
              type: 'string',
              required: true
            },
            boolean: {
              title: 'boolean测试',
              type: 'boolean'
            }
          }
        },
        labelClass,
        labelStyle,
        contentClass,
        errorFields,
        // 层级间可使用的字段
        displayType,
        hideTitle,
        hideValidation
      }
    }
  }
}
</script>
