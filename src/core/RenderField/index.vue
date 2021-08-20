<script>
import { getValueByPath, isCheckBoxType, isObjType } from '../../utils'
import Extra from './Extra'
import ExtendWidget from './ExtendWidget'
import ErrorMessage from './ErrorMessage'
import FieldTitle from './Title'
export default {
  inject: ['store', 'store2', 'tools'],
  props: {
    dataIndex: Array,
    dataPath: String,
    _value: String | Object | Array | Number,
    _schema: {
      type: Object,
      default() {
        return {}
      }
    },
    labelClass: String,
    labelStyle: String,
    _contentClass: String,
    children: Object | String,
    errorFields: {
      type: Array,
      default: () => {
        return []
      }
    },
    hideTitle: Boolean,
    displayType: String

  },
  computed: {
    _readOnly() {
      const { readOnly } = this.tools
      return readOnly !== undefined ? readOnly : this._schema.readOnly
    },
    widgetProps() {
      const { formData } = this.store
      const { disabled } = this.store2
      const { onItemChange } = this.tools
      const _disabled = disabled !== undefined ? disabled : this._schema.disabled
      return {
        schema: this._schema,
        readOnly: this._readOnly,
        disabled: _disabled,
        onChange: this.onChange,
        getValue: this._getValue,
        formData,
        value: this._value,
        onItemChange,
        dataIndex: this.dataIndex,
        dataPath: this.dataPath,
        children: this.children
      }
    },
    errorMessage() {
      const errObj = this.errorFields.find(err => err.name === this.dataPath)
      return errObj && errObj.error // 是一个list
    },
    messageProps() {
      const { showValidate } = this.store2
      return {
        message: this.errorMessage,
        schema: this._schema,
        displayType: this.displayType,
        softHidden: this.displayType === 'inline',
        hadrHidden: showValidate === false || this._readOnly === true
      }
    },
    titleProps() {
      return {
        labelClass: this.labelClass,
        labelStyle: this.labelStyle,
        schema: this._schema,
        displayType: this.displayType
      }
    },
    placeholderTitleProps() {
      return {
        class: this.labelClass,
        style: this.labelStyle
      }
    },
    contentClass() {
      const _contentClass = this._contentClass
      const { showValidate } = this.store2
      const hasError = Array.isArray(this.errorMessage) && this.errorMessage.length > 0
      return hasError && showValidate
        ? _contentClass + ' ant-form-item-has-error'
        : _contentClass
    },
    _showTitle() {
      return !this.hideTitle && typeof this._schema.title === 'string'
    }
  },
  methods: {
    onChange(value) {
      const { formData } = this.store
      const { debounceInput } = this.store2
      const { onValuesChange, onItemChange, setEditing, touchKey } = this.tools
      // 动过的key，算被touch了, 这里之后要考虑动的来源
      touchKey(this.dataPath)
      // 开始编辑，节流
      if (debounceInput) {
        setEditing(true)
        //   debouncedSetEditing(false)
      }
      if (typeof this.dataPath === 'string') {
        onItemChange(this.dataPath, value)
      }
      // 先不暴露给外部，这个api
      if (typeof onValuesChange === 'function') {
        onValuesChange({ [this.dataPath]: value }, formData)
      }
    },
    _getValue(path) {
      return getValueByPath(this.formData, path)
    }
  },
  render() {
    const contentStyle = {}
    if (isCheckBoxType(this._schema, this._readOnly)) {
      return (
        <div>
          {this._showTitle && <div attrs={{ ...this.placeholderTitleProps }}></div>}
          <div class={this.contentClass} style={contentStyle}>
            <ExtendWidget props={{ props: { ...this.widgetProps }}}></ExtendWidget>
            <Extra props={{ ...this.widgetProps }} />
            <ErrorMessage props={{ ...this.messageProps }}></ErrorMessage>
          </div>
        </div>
      )
    }
    let titleElement = <FieldTitle props={{ ...this.titleProps }} />
    if (isObjType(this._schema)) {
      titleElement = (
        <div style={{ display: 'flex' }}>
          {titleElement}
          <ErrorMessage props={{ ...this.messageProps }}></ErrorMessage>
        </div>
      )
      return (
        <div class={this.contentClass} style={contentStyle}>
          <ExtendWidget props={{ props: { ...this.widgetProps }}}></ExtendWidget>
          <Extra props={{ ...this.widgetProps }} />
        </div>
      )
    }
    return (
      <div>
        {this._showTitle && titleElement}
        <div class={`${this.contentClass} ${this.hideTitle ? 'fr-content-no-title' : ''}`} style={contentStyle}>
          <ExtendWidget props={{ props: { ...this.widgetProps }}}></ExtendWidget>
          <Extra props={{ ...this.widgetProps }} />
          <ErrorMessage props={{ ...this.messageProps }}></ErrorMessage>
        </div>
      </div>
    )
  }
}
</script>
