<template>
  <div>
    <div v-transfer-dom>
      <actionsheet :menus="menus"
                   v-model="showMenu"
                   @on-click-menu="changeLocale"></actionsheet>
    </div>
    <x-header slot="header"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :left-options="leftOptions"
              :right-options="rightOptions"
              :title="title"
              :transition="headerTransition"
              @on-click-more="onClickMore">
    </x-header>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'myHeader',
  props: ['menus', 'changeLocale', 'leftOptions', 'rightOptions', 'title'],
  data: function () {
    return {
      showMenu: false
    }
  },
  directives: {
    TransferDom
  },
  components: { XHeader, Actionsheet },
  methods: {
    onClickMore() {
      this.showMenu = true
    }
  },
  computed: {
    ...mapState({
      direction: state => state.vux.direction
    }),
    headerTransition() {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    }
  }
}
</script>

<style lang="css">

</style>
