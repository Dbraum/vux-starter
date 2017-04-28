<template>
  <tabbar class="vux-demo-tabbar"
          icon-class="vux-center"
          v-show="showTabbar"
          slot="bottom">
    <tabbar-item :link="{path:'/'}"
                 :selected="route.path === '/'">
      <span class="demo-icon-22 vux-demo-tabbar-icon-home"
            slot="icon"
            style="position:relative;top: -2px;">&#xe637;</span>
      <span slot="label">Home</span>
    </tabbar-item>
    <tabbar-item :link="{path:'/demo'}"
                 :selected="isDemo"
                 badge="9">
      <span class="demo-icon-22"
            slot="icon">&#xe633;</span>
      <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>Demos</span></span>
    </tabbar-item>
    <tabbar-item :link="{path:'/project/donate'}"
                 :selected="route.path === '/project/donate'"
                 show-dot>
      <span class="demo-icon-22"
            slot="icon">&#xe630;</span>
      <span slot="label">Donate</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'myTabbar',
  props: ['showTabbar'],
  data: function () {
    return {
      isTabbarDemo: false
    }
  },
  components: { Tabbar, TabbarItem },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    }),
    isDemo() {
      return /component|demo/.test(this.route.path)
    },
    componentName() {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    }
  }
}
</script>

<style lang="less">
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}

.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}

.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}

.demo-icon-22:before {
  content: attr(icon);
}

.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}

.weui-tabbar__icon+.weui-tabbar__label {
  margin-top: 0!important;
}

.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

@font-face {
  font-family: 'vux-demo';
  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}

.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}

.demo-icon-big {
  font-size: 28px;
}

.demo-icon:before {
  content: attr(icon);
}
</style>
