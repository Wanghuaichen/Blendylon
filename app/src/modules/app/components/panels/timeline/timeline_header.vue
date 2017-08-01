<template>
    <div class="ui grid" style="margin:0">
        <div class="column" style="padding:0">
            <div class="ui inverted black tiny menu" >
                <div class="ui bottom dropdown item">
                    View <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item">
                            Deselect
                        </a>
                    </div>
                </div>
                <div class="ui bottom pointing dropdown item">
                    Marker <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item">
                            Delete
                        </a>
                    </div>
                </div>
                <div class="ui bottom pointing dropdown item">
                    Frame <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item">
                            Delete
                        </a>
                    </div>
                </div>
                <div class="ui bottom pointing dropdown item">
                    Playback <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item">
                            Delete
                        </a>
                    </div>
                </div>
                <div class="ui inverted mini labeled input input-transform" style="margin: 3px -1px 3px 3px;">
                    <div class="mini ui black label noselect" style="width: 33.3%">Start</div>
                    <input
                            type="number"
                            name="rendering_frame_range_start"
                            class="input-draggable"
                            v-input-draggable
                            step="1"
                            min="0"
                            :value="coreOptions.rendering.frameRange.start"
                            @inputDrag.prevent="updateRenderingFrameRangeStart"
                            @keyup.enter.prevent="updateRenderingFrameRangeStart"
                            title="Update rendering start frame">
                </div>
                <div class="ui inverted mini labeled input input-transform" style="margin: 3px -1px 3px 3px;">
                    <div class="mini ui black label noselect" style="width: 33.3%">End</div>
                    <input
                            type="number"
                            name="rendering_frame_range_end"
                            class="input-draggable"
                            v-input-draggable
                            step="1"
                            min="0"
                            :value="coreOptions.rendering.frameRange.end"
                            @inputDrag.prevent="updateRenderingFrameRangeEnd"
                            @keyup.enter.prevent="updateRenderingFrameRangeEnd"
                            title="Update rendering end frame">
                </div>
                <div class="ui inverted mini labeled input input-transform" style="margin: 3px -1px 3px 3px;">
                    <input
                            type="number"
                            name="timeline_time"
                            class="input-draggable"
                            v-input-draggable
                            step="1"
                            min="0"
                            max="1000"
                            :value="parseInt(timeline.time * 60)"
                            @inputDrag.prevent="updateTimelineTime"
                            @keyup.enter.prevent="updateTimelineTime"
                            title="Update timeline frame">
                </div>
                <div class="ui bottom pointing dropdown item" style="padding: 0 4px">
                    <div class="mini ui icon buttons">
                        <button class="mini ui black button" @click="goToStart()">
                            <i class="fast backward icon"></i>
                        </button>
                        <button class="mini ui black  button" @click="play(true)" v-show="!playing">
                            <i class="horizontally flipped play icon"></i>
                        </button>
                        <button class="mini ui black  button" @click="play(false)" v-show="!playing">
                            <i class="play icon"></i>
                        </button>
                        <button class="mini ui black  button" style="width: 62.94px" @click="pause()" v-show="playing">
                            <i class="pause icon"></i>
                        </button>
                        <button class="mini ui black  button" @click="goToEnd()">
                            <i class="fast forward icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            coreOptions: 'getCoreOptions'
        }),
    },
    data() {
        return {
            time: 0,
            playing: false,
            timeline: {}
        }
    },
}
</script>
