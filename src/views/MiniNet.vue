<template>
  <div class="mn">
    <MiniNetEnv/>
  </div>
</template>


<script>
// @ is an alias to /src
import MiniNetEnv from '@/components/MiniNetEnv.vue'
import { fabric } from 'fabric'

export default {
  name: 'MiniNet',
  components: {
    MiniNetEnv
  },
  
  
}



    // const rect = new fabric.Rect({
    //   fill: "blue",
    //   width: 40,
    //   height: 20,
    // });
    // MiniNetEnv.canvas.add(rect);


//MiniNetEnv.data.canvas;
</script>
