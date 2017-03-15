<template>
    <div id="entities_list" style="width:calc(100% - 50px);position: relative;padding: 0;">
        <div class="ui tiny menu inverted" style="border-bottom: 1px solid rgba(255,255,255,0.1);border-top: 1px solid rgba(255,255,255,0.1);margin-top: 2px;margin-bottom:0;border-right: 1px solid rgba(255, 255, 255, 0.0980392);height: 39px">
            <div class="centered item">
                <i class="download icon"></i>
                Timeline controls
            </div>
            <div class="right menu">
                <div class="item">

                </div>
            </div>
        </div>
        <div style="position:relative; width:100%;height: calc(100% - 42px);">
            <canvas id="timeline" style="height: 100%; width: 100%;box-shadow: inset 0 0 20px black"></canvas>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {}
    }
}
</script>
