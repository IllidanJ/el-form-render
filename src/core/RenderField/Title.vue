<script>
import { isCheckBoxType } from '../../utils'

export default {
  inject: ['store2'],
  props: {
    labelClass: String,
    labelStyle: String,
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    displayType: String
  },
  render() {
    const { displayType: globalDisplayType, readOnly } = this.store2
    const { title, description, required, type } = this.schema
    const isObjType = type === 'object'
    const _displayType = this.schema.displayType || this.displayType || globalDisplayType || 'column'
    return (
      <div class={this.labelClass} style={this.labelStyle}>
        {title ? (
          <label class={`fr-label-title ${
            isCheckBoxType(this.schema, readOnly) || _displayType === 'column' ? 'no-colon' : ''
          }`}
          title={title}>
            {required === true && <span class='fr-label-required'></span>}
            <span class={`${isObjType ? 'b' : ''} 
                ${_displayType === 'column' ? 'flex-one' : ''} `}>
              <span>{title}</span>
            </span>
            {description &&
                (_displayType === 'row' ? (
                  <span class='fr-tooltip-toggle' aria-label={description}>
                    <i class='fr-tooltip-icon'></i>
                    <div class='fr-tooltip-container'>
                      <i class='fr-tooltip-triangle' />
                      {description}
                    </div>
                  </span>) : _displayType === 'inline' ? null : (
                  <span class='fr-desc ml2'>(&nbsp;{description}&nbsp;)</span>
                ))
            }
          </label>
        ) : null}
      </div>
    )
  }
}
</script>
