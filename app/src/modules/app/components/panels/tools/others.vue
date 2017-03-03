<template>
    <div>
        <div class="title active">
            <i class="dropdown icon"></i>
            Others
        </div>
        <div class="content active">
            <button class="ui mini fluid inverted labeled icon button">
                <i class="icon"><img src="app/src/assets/img/icons/camera.png" class="primitive-icon"></i>Camera
            </button>
            <button class="ui mini fluid inverted labeled icon button">
                <i class="icon"><img src="app/src/assets/img/icons/font.png" class="primitive-icon"></i>Text
            </button>
        </div>
    </div>
</template>
<script>
import CST from '../../../../../utils/CST';
import Utility from '../../../../../utils/Utility';
export default {
    name:'tools_others',
    data() {
        return {
            msg:'hello vue'
        }
    },
    methods: {
        create()
        {

        }
    }
}
</script>
