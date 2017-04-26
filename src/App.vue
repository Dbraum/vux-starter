<template>
  <div style="height:100%">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus"
                   v-model="showMenu"
                   @on-click-menu="changeLocale"></actionsheet>
    </div>
    <view-box ref="viewBox"
              body-padding-top="46px"
              body-padding-bottom="55px">

      <x-header slot="header"
                style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                :left-options="leftOptions"
                :right-options="rightOptions"
                :title="title"
                :transition="headerTransition"
                @on-click-more="onClickMore"></x-header>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view"></router-view>
      </transition>
      <tabbar class="vux-demo-tabbar"
              icon-class="vux-center"
              v-show="!isTabbarDemo"
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
    </view-box>

  </div>
</template>

<script>
import { Tab, TabItem, ViewBox, Tabbar, TabbarItem, XHeader, Loading, TransferDom, Actionsheet } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: function () {
    return {
      isTabbarDemo: false,
      showMenu: false,
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh-CN': '中文',
        'en': 'English'
      }
    }
  },
  directives: {
    TransferDom
  },
  components: { Tab, TabItem, ViewBox, Tabbar, TabbarItem, XHeader, Loading, Actionsheet },
  methods: {
    onClickMore() {
      this.showMenu = true
    },
    changeLocale(locale) {
      console.info(locale)
    },
    onItemClick: function (event) {
      console.info('hello world')
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isDemo() {
      return /component|demo/.test(this.route.path)
    },
    leftOptions() {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions() {
      return {
        showMore: true
      }
    },
    componentName() {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    headerTransition() {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    title() {
      if (this.route.path === '/') return 'Home'
      if (this.route.path === '/project/donate') return 'Donate'
      if (this.route.path === '/demo') return 'Demo list'
      return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}

.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
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

.router-view {
  width: 100%;
  top: 46px;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.menu-title {
  color: #888;
}
</style>
