<script>
export default {
  props: ['schema'],
  inject: ['tools'],
  render() {
    const { extra } = this.schema
    const { widgets } = this.tools
    if (!extra) return

    const widgetName = extra.widget
    const Widget = widgets[widgetName]
    if (Widget) return <Widget schema={this.schema} />
    let __html = ''
    if (typeof extra === 'string') {
      __html = extra
    }
    // 内部BU使用的口子，这个api不对外，也没有必要
    if (typeof extra === 'object' && extra.text) {
      __html = extra.text
    }
    return (
      __html && (
        <div
          class='fr-form-item-extra'
        >{__html}</div>
      )
    )
  }
}
</script>
