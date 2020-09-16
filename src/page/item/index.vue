<template>
    <div>
        <div>
            <itemcontainer  father-component="item"></itemcontainer>
        </div>
    </div>
</template>
<script>
import  itemcontainer  from  "../../components/itemContainer"
export default{
   name:'item',
   components:{
       itemcontainer
   },
   created(){
       //进入题目页面，开始倒计时
       this.$store.commit('REMBER_TIME');
   }
    
}
</script>