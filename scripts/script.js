const APIurl = 'http://localhost:3000';

let vmMain = new Vue({
  el: "#main",
  data:{
    hotAlbumn: {},
    hotList: {},
    tab: "hotSound",
    userAlbumn: {},
    userList: {},
    dailyList: {}
  },
  methods: {
    getList: function(){
      this.$http.get(`${APIurl}/playlist/hot`).then((result)=>{
        this.hotAlbumn = result.body.tags;
      });
    },
    listSound :function(id, type){
      if (type == "userSound") {
        this.$http.get(`${APIurl}/playlist/detail?id=${id}`).then((result)=>{
          this.userList = result.body.playlist.tracks;
        });
      }else {
        this.$http.get(`${APIurl}/playlist/detail?id=${id}`).then((result)=>{
          this.hotList = result.body.playlist.tracks;
        });
      }
    },
    playSound: function(id, name, ar, pic){
      console.log(`id:${id}, name:${name}, author:${ar}, pic:${pic}`);
      this.$http.get(`${APIurl}/music/url?id=${id}`).then((result)=>{
        mePlayer({
            music : {
                src   : result.body.data[0].url,
                title : name,
                author: ar,
                cover : pic
            },
            target: '.container',
            autoplay: true // 是否自动播放
        });
      });
    }
  },
  created: function(){
    this.getList();
  }
});

let vmHeader = new Vue({
  el: "#topHeader",
  data:{
    tab: "hotSound",
    loginTag: false,
    user: {
      account: "",
      passwd: "",
      username: "",
      userid: ""
    }
  },
  methods:{
    switchTab: function(tabName){
      vmMain._data.tab = tabName;
      this.tab = tabName;
    },
    toggleLogin: function(){
      this.loginTag = !this.loginTag;
    },
    login: function(){
      this.$http.get(`${APIurl}/login/cellphone?phone=${this.user.account}&password=${this.user.passwd}`).then((result)=>{
        this.user.userid = result.body.account.id;
        this.user.username = result.body.profile.nickname;
        console.log("login success");
        this.toggleLogin();
        this.getUserPlayList();
      });
    },
    getUserPlayList: function(){
      this.$http.get(`${APIurl}/user/playlist?uid=${this.user.userid}`).then((result)=>{
        console.log("get user play list");
        vmMain._data.userAlbumn = result.body.playlist;
      });
      this.$http.get(`${APIurl}/recommend/songs`).then((result)=>{
        console.log("get user recommend");
        vmMain._data.dailyList = result.body.recommend;
      });
    }
  }
});

mePlayer({
    music : {
        src   : 'none',
        title : 'title',
        author: 'author',
        cover : './images/neteaseMusicLogo.jpg',
    },
    target: '.music',
    autoplay: false // 是否自动播放
});

