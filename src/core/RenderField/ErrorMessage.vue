<script>
import { translateMessage } from '@/utils'
export default {
  props: ['message', 'schema', 'softHidden', 'hardHidden'],
  computed: {
    msg() {
      let msg = ''
      if (typeof this.massage === 'string') msg = this.message
      if (Array.isArray(this.message)) {
        msg = this.message[0] || ''
      }
      return translateMessage(msg, this.schema)
    }
  },
  render() {
    if (this.hardHidden) return <div class='error-message'></div>
    return !this.msg && this.softHidden ? null : (
      <div class='error-message'>{this.msg}</div>
    )
  }

}
</script>
<style lang="less" scoped>
@import './ErrorMessage.less';
</style>
