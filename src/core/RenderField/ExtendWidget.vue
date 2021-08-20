<script>
import { getWidgetName, extraSchemaList } from '../../mapping'
import { isObjType, isListType, isObject } from '../../utils'
import { transformProps } from '../../createWidget'
export default {
  name: 'ExtendWidget',
  inject: ['tools'],
  props: {
    props: {
      type: Object,
      default() {
        return {
          schema: {}
        }
      }
    }
  },
  data() {
    return {
      defaultWeidgetName: 'input'
    }
  },
  computed: {
    widgetName() {
      const { schema, readOnly } = this.props
      const { mapping, widgets } = this.tools
      const widgetName = getWidgetName(schema, mapping)
      const customName = schema.widget || schema['ui:widget']
      if (readOnly && !isObjType(schema) && !isListType(schema)) {
        const readOnlyName = schema.readOnlyWidget || 'html'
        return readOnlyName
      } else if (customName && widgets[customName]) {
        return customName
      } else {
        return widgetName
      }
    },
    finalProps() {
      const {
        schema,
        onChange,
        value,
        children,
        onItemChange,
        formData,
        getValue,
        readOnly,
        dataPath,
        disabled,
        dataIndex
      } = this.props
      const {
        widgets,
        setErrorFields,
        setSchema,
        resetFields,
        removeErrorField
      } = this.tools
      const extraSchema = extraSchemaList[this.widgetName || this.defaultWeidgetName]
      let widgetProps = {
        schema: { ...schema, ...extraSchema },
        onChange,
        value,
        children,
        disabled,
        readOnly,
        ...schema.props
      }
      if (schema.type === 'string' && typeof schema.max === 'number') {
        widgetProps.maxLength = schema.max
      }
      ['title', 'placeholder', 'disabled', 'format'].forEach(key => {
        if (schema[key]) {
          widgetProps[key] = schema[key]
        }
      })
      if (schema.props) {
        widgetProps = { ...widgetProps, ...schema.props }
      }
      Object.keys(schema).forEach(key => {
        if (
          typeof key === 'string' &&
            key.toLowerCase().indexOf('props') > -1 &&
            key.length > 5
        ) {
          widgetProps[key] = schema[key]
        }
      })
      // 支持 addonAfter 为自定义组件的情况
      if (isObject(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
        const AddonAfterWidget = widgets[widgetProps.addonAfter.widget]
        widgetProps.addonAfter = <AddonAfterWidget {...schema} />
      }
      // 避免传组件不接受的props，按情况传多余的props
      widgetProps.addons = {
        onItemChange,
        setValue: onItemChange, // onItemChange 已经文档放出去了，不去掉了，但改个好理解的名字
        getValue,
        formData,
        dataPath,
        dataIndex,
        setErrorFields,
        setSchema,
        resetFields,
        removeErrorField
      }
      return transformProps(widgetProps)
    }
  },
  methods: {
    errorSchema() {
      return (
        <div>
          <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
          <div>{JSON.stringify(this.props.schema)}</div>
        </div>)
    }
  },
  render() {
    const { widgets } = this.tools
    const widgetName = this.widgetName
    if (!widgetName) {
      return this.errorSchema()
    }
    const Widget = widgets[widgetName]
    return <Widget props={{ ...this.finalProps }}></Widget>
  }
}
</script>
