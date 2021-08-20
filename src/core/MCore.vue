<script>
import RenderField from './RenderField'
import {
  isLooselyNumber,
  isCssLength,
  getParentProps,
  isListType,
  isCheckBoxType,
  isObjType,
  getValueByPath,
  getDataPath,
  clone,
  schemaContainsExpression,
  parseAllExpression
} from '../utils'
export default {
  props: [
    'id',
    'item',
    'dataIndex',
    'dataPath',
    'hideTitle',
    'hideValidation',
    'debugCss',
    'schema',
    '_value',
    'displayType',
    'column',
    'labelWidth',
    'readOnly',
    'errorFields',
    'effectiveLabelWidth'
  ],
  computed: {
    _displayType() {
      return this.schema.displayType || this.$attrs.displayType || this.displayType || 'column'
    },
    isList() {
      return isListType(this.schema)
    },
    isObj() {
      return isObjType(this.schema)
    },
    isComplex() {
      return this.isObj || this.isList
    },
    isCheckBox() {
      return this.isCheckBoxType(this.schema, this.readOnly)
    },
    columnStyle() {
      const width = this.schema.width || this.schema['ui:width']
      if (!this.isObj) {
        if (width) {
          return {
            width,
            paddingRight: '12px'
          }
        } else if (this.column > 1) {
          return {
            width: `calc(100% /${this.column})`,
            paddingRight: '12px'
          }
        }
      }
      return {}
    }
  },
  render() {
    if (this.schema.hidden) {
      return null
    }
    return (
      <div
        style={this.columnStyle}
        className={`${containerClass} ${debugCss ? 'debug' : ''}`}
      >
        <RenderField {...fieldProps}>{_children}</RenderField>
      </div>
    )
  }
}
</script>
