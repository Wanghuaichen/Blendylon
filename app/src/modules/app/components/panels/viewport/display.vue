<template>
    <div class="viewport_display_infos" v-bind:class="{'active': showViewportTools}" id="viewport_display_infos">
        <div class="fps noselect">
            <small>FPS</small> {{~~engine.fps}}<br>
        </div>
        <div class="camera-view noselect">
            <span v-if="camera">
                {{camera.currentView | capitalize}}
                {{camera.mode == 1 ? 'Orthographic' : 'Perspective'}}
            </span>
        </div>
        <div class="current-selection noselect" v-if="selection">{{selection.name}}</div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default
{
    name:'viewport_display',
    props: {
        selection: Object
    },
    computed: mapGetters({
        showViewportTools: 'isViewportToolsVisible',
        camera: 'getCurrentCamera',
        engine: 'getEngine'
    }),
    methods: mapActions({

    }),
    filters: {
        capitalize: value => value.charAt(0).toUpperCase() + value.slice(1)
    }
}
</script>
