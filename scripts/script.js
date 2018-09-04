let vmMain = new Vue({
  el: "#main",
  data:{
    hotPlayList: {},
    tab: "hotSound"
  },
  methods: {
    getList: function(){
      this.$http.get("http://localhost:3000/playlist/hot").then((result)=>{
        this.hotPlayList = result.body.tags;
      });
    },
    selectMusicList: function(id){
      console.log(id);
    },
  },
  created: function(){
    this.getList();
  }
});

let vmHeader = new Vue({
  el: "#topHeader",
  data:{
    tab: "hotSound",
    loginTag: false
  },
  methods:{
    switchTab: function(tabName){
      vmMain._data.tab = tabName;
      this.tab = tabName;
    },
    toggleLogin: function(){
      this.loginTag = !this.loginTag;
    }
  }
});

mePlayer({
    music : {
        src   : '音乐文件地址',
        title : 'hello',
        author: 'me',
        cover : '封面路径',
        lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
    },
    target: '.container',
    autoplay: false // 是否自动播放
});
