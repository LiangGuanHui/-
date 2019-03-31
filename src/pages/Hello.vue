<template>
  <div class="index">
    <div v-for="(item, key) in newsListShow">
      <news-cell
      :newsDate="item"
      :key="key"
      ></news-cell>
    </div>
  </div>
  
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
// import api from './../axios/api.js'
import axios from 'axios'
import NewsCell from '../components/common/NewsCell.vue'

 
export default {
  name: 'Hello',
  data () {
    return {
      newsListShow: [],
      show:true,
    }
  },
  components: {
    NewsCell
  },
  created() {
    this.setNewsApi();
  },
  methods:{
    setNewsApi () {
      // api.JH_news('/news/index', 'type=top&key=123456')
      // .then(res => {
      //   console.log(res);
      //   this.newsListShow = res.articles;
      // });

      axios.get('/api/users','name=123&id=2').then(res=>{
          console.log(res)
          this.newsListShow= res.data.user;
      })
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topNav{
  width: 100%;
  background: #ED4040;
  position: fixed;
  top:0;
  left: 0;
  z-index: 10;
}
.simpleNav{
  width: 100%;
  line-height: 10rem;
  overflow: hidden;
  overflow-x: auto;
  text-align: center;
  font-size: 0;
  font-family: '微软雅黑';
  white-space: nowrap;
}
.simpleNav::-webkit-scrollbar{height:0px}
.simpleNavBar{
  display: inline-block;
  width: 12rem;
  color:#fff;
  font-size:3rem;
}
.navActive{
  color: #000;
  border-bottom: 0.5rem solid #000;
}
.placeholder{
  width:100%;
  height: 10rem;
}

</style>