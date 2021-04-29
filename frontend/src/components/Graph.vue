<script>
import { HorizontalBar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  // グラフの種類
  extends: HorizontalBar,

  // オプションをリアクティブに
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>

</style>
