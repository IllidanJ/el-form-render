<script>
import { Checkbox } from 'element-ui'
export default {
  props: ['title'],
  render() {
    return <Checkbox props={{ ...this.$attrs }}>{this.title}</Checkbox>
  }
}
</script>
