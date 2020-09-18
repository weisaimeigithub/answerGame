<template>
   <section>
      <header class="top_tips">
		    <!-- 通过给组件中传入值，然后判断到底是哪一个组件，再显示出来，共性部分抽取出来，然后就是能够组成一个组件 -->
           <span  class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
           <span  class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
      </header>
	  <div v-if="fatherComponent == 'home'">
          <div class="home_logo item_container_style"></div>
		  <!--点击开始就直接跳转到item组件中，router-link就能够转换为a标签-->
		  <!--因为页面具有共性，所以把这结果路由跳转页面都写到一个组件中就可以了-->
		  <router-link to="item"  class="start button_style"></router-link>
	  </div>
      <div   v-if="fatherComponent == 'item'">
           <div class="item_back item_container_style">
                <div  class="item_list_container"  v-if="itemDetail.length>0">
					   <!--抽象思维：把握共性：随着题目itemNum变化，题目中的内容也跟着变化-->
                       <header class="item_title">{{itemDetail[itemNum-1].topic_name}}</header>
                       <ul>
                          <li  v-for="(item,index) in  itemDetail[itemNum-1].topic_answer" @click="choosed(index,item.topic_answer_id)" :key="index" class="item_list">
                             <span class="option_style" v-bind:class="{'has_choosed':chooseNum==index}">{{chooseType(index)}}</span>
                             <span class="option_detail">{{item.answer_name}}</span>
                          </li>
                       </ul>
                </div>
           </div>
           <span  class="next_item  button_style" @click="nextItem" v-if="itemNum<itemDetail.length"></span>
           <span  class="submit_item button_style" v-else @click="submitAnswer"></span>
      </div>
   </section>
</template>

<script>
import {mapState, mapActions}  from 'vuex'
export default {
  name: 'item-container',
  data () {
    return {
       itemId:null,//题目ID
       chooseNum:null,//选中答案索引
       choosedId:null //选中答案id
    }
  },
  props:['fatherComponent'],
  computed:mapState([
	  'itemNum',//第几题
	  'level',//第几周
	  'itemDetail',//题目详情
	  'timer',//计时器
  ]),

   created(){
	   //初始化信息
	   if(this.fatherComponent == 'home'){
		   this.initializeData();
	   }
   },
  methods:{
	  ...mapActions([
		  'addNum','initializeData',
	  ]),

	  //点击下一题
	  nextItem(){
		  debugger
          if(this.chooseNum !==null){
			  this.chooseNum = null;
			  //保存答案，题目索引加一，条到下一题
			  this.addNum(this.choosedId)
		  }else{
               alert('您还没有选择答案哦')
		  }
	  },

	  //索引0-3对应答案A-B
	  chooseType:type =>{
		  debugger
		  switch(type){
			  case 0:return 'A';
			  case 1:return 'B';
			  case 2:return 'C';
			  case 3:return 'D'
	  }
  },
  //选中的答案信息
  choosed(type,id){
	  debugger
	  this.chooseNum = type;
	  this.choosedId = id;
	  
  },

  //到达最后一题，交卷，请空定时器，跳转分数页面
  submitAnswer(){
	  debugger
	  if(this.choosedNum !==null){
		  this.addNum(this.choosedId)
		  clearInterval(this.timer)
		  //跳转到不同的url，这个方法会想history栈添加一个记录，点击后退会返回到上一个页面
		  //什么叫做刻意练习，刻意练习就是自己重头到位做一遍，基本上前端不错了，懒，就是不想自己来，那么基本上肯定不行的
		  this.$router.push('score')
	  }else{
		  alert('您还没有选择答案哦')
	  }
  },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.top_tips{
		position: absolute;
		height: 7.35rem;
		width: 3.25rem;
		top: -1.3rem;
		right: 1.6rem;
		background: url(../images/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		z-index: 10;
		.num_tip{
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
	}
	.item_container_style{
		height: 11.625rem;
		width: 13.15rem;
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;
		left: 1rem;
	}	
	.home_logo{
		background-image: url(../images/1-2.png);
		background-size: 13.142rem 100%;
		background-position: right center;
	}
	.item_back{
		background-image: url(../images/2-1.png);
		background-size: 100% 100%;
	}
	.button_style{
        display: block;
        height: 2.1rem;
        width: 4.35rem;
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%;
        margin-left: -2.4rem;
        background-repeat: no-repeat;
	}
	.start{
        background-image: url(../images/1-4.png);
    }
    .next_item{
    	background-image: url(../images/2-2.png);
    }
    .submit_item{
    	background-image: url(../images/3-1.png);
    }
    .item_list_container{
    	position: absolute;
    	height: 7.0rem;
    	width: 8.0rem;
    	top: 2.4rem;
    	left: 3rem;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 0.65rem;
		color: #00e;
		line-height: 0.7rem;
	}
	.item_list{
		font-size: 0;
		margin-top: 0.4rem;
		width: 10rem;
		span{
			display: inline-block;
			font-size: 0.6rem;
			color: #00e;
			vertical-align: middle;
		}
		.option_style{
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}
		.has_choosed{
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}
		.option_detail{
			width: 7.5rem;
			padding-top: 0.11rem;
		}
	}
</style>
