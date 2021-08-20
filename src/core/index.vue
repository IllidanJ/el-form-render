<script>
import MCore from './MCore'
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
import {
  getParentProps,
  getValueByPath,
  getDataPath,
  clone,
  schemaContainsExpression,
  parseAllExpression
} from '../utils'
export default {
  inject: ['store', 'store2'],
  props: {
    id: {
      type: String,
      default: '#'
    },
    _item: Object,
    dataIndex: {
      type: Array,
      default: () => []
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    hideValidation: {
      type: Boolean,
      default: false
    },
    debugCss: Boolean
  },
  computed: {
    item() {
      const { flatten } = this.store
      return this._item ? this._item : flatten[this.id]
    },
    dataProps() {
      const { flatten, errorFields, isEditing, formData, allTouched } = this.store
      const { displayType, column, labelWidth, readOnly } = this.store2
      const dataPath = getDataPath(this.id, this.dataIndex)
      const _value = getValueByPath(formData, dataPath)
      let schema = clone(this.item.schema)
      if (!isEditing) {
        if (schemaContainsExpression(schema)) {
          schema = parseAllExpression(schema, formData, dataPath)
        }
      }
      const effectiveLabelWidth = getParentProps('labelWidth', this.id, flatten) || labelWidth
      return {
        id: this.id,
        item: this.item,
        dataIndex: this.dataIndex,
        dataPath,
        _value,
        hideTitle: this.hideTitle,
        hideValidation: this.hideValidation,
        debugCss: this.debugCss,
        schema,
        displayType,
        column,
        labelWidth,
        readOnly,
        errorFields,
        effectiveLabelWidth,
        allTouched,
        ...this.$attrs
      }
    }
  },
  render() {
    if (!this.item) return null
    return <MCore props={{ ...this.dataProps }}></MCore>
  }

}
</script>
