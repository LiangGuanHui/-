<template>
  <section class="financial-list">
    <section class="collect" @click="jumpPage">
      <aside>
        <h2>{{newsDate.title}}</h2>
        <section class="Cleft clearfix">
          <span class="fl">{{newsDate.author_name}}</span>
        </section>
        <section class="Cright">
          <span>{{newsDate.date }}</span>
        </section>
        <div style="clear: both"></div>
      </aside>
      <aside>
        <img :src="newsDate.thumbnail_pic_s" style="border-radius: 0.2rem;">
      </aside>
      <div style="clear: both"></div>
    </section>
  </section>
</template>
 
<script>
export default {
  name: 'NewsCell',
  props: {
    newsDate: Object
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    jumpPage: function () {
    //   window.location.href = this.newsDate.url
      alert('mock测试数据'+this.newsDate.url)
    }
  }
}
</script>
 
<style scoped>
.financial-list {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2.8rem 0;
  border-bottom: 1px solid #ccc;
}
 
.financial-list .collect {
  width: 92%;
  margin: 0 auto;
}
 
.financial-list .collect aside:nth-of-type(1) {
  width: 63%;
  float: left;
}
 
.financial-list .collect aside:nth-of-type(2) {
  width: 32%;
  height: 20rem;
  float: left;
  margin-left: 3rem;
}
 
.financial-list .collect h2 {
  width: 100%;
  height: 9.6rem;
  font-size: 3.2rem;
  color: #333333;
  line-height: 4.8rem;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
 
.financial-list .collect aside:nth-of-type(2) img {
  width: 100%;
  height: 100%;
}
 
.financial-list .collect aside .Cleft {
  width: 45%;
  float: left;
  margin-top: 6.6rem;
}
 
.financial-list .collect aside .Cleft span{
  display: block;
  width: 14rem;
  margin-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
 
.financial-list .collect aside .Cright {
  width: 55%;
  float: right;
  margin-top: 6.6rem;
}
.financial-list .collect aside .Cright span{
  display: inline-block;
  margin: 0.4rem 0 0 0.5rem;
}
.financial-list .collect aside span {
  font-size: 2rem;
  color: #999999;
}
 
.financial-list .collect aside .Cleft img,
.financial-list .collect aside .Cright img {
  width: 1.8rem;
  height: 2.4rem;
  margin-top: 0.9rem;
}
</style>