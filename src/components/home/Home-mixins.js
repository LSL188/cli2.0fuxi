export default {
  data() {
    return {
        menusList: [],
        iconList: ['icon-add-account', 'icon-browse', 'icon-apparel', 'icon-rejected-order', 'icon-tradingvolume'],
        collapse: false,
        saveClickPath: ''
    };
  },
  created() {
      this.getLeftMenus()
      const ap = window.sessionStorage.getItem('savePath')
      this.saveClickPath = ap
  },
  methods: {
    logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
    },
    async getLeftMenus() {
        const {data: res} = await this.$http.get('/menus')
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取左侧菜单失败!')
        this.menusList = res.data
    },
    saveActivePath(clickPath) {
      console.log(clickPath)
      this.saveClickPath = clickPath
      window.sessionStorage.setItem('savePath', clickPath)
    }
  },
}