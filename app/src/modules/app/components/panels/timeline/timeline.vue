<template>
    <div id="entities_list" class="noselect" style="position: relative;padding: 0;height:100%">
        <div style="position:relative; width:100%;height: 100%;">
            <canvas :id="'timeline_'+model.id" style="height: 100%; width: 100%;" class="noselect"></canvas>
        </div>
    </div>
</template>
<script>
import Timeline from './timeline'
import {mapGetters, mapActions} from 'vuex'

export default {
    props: {
        model: Object
    },
    data() {
        return {
            time: 0,
            playing: false,
            timeline: {}
        }
    },
    created() {
        this.timeline = new Timeline('timeline_'+this.model.id);
    },
    computed: {
        ...mapGetters({
            coreOptions: 'getCoreOptions'
        }),
        getTime() {
            var seconds = this.timeline.time % 60
            var sign = seconds < 0 ? '-' : ''
            var s = seconds.toFixed(2).toString().split('.')
            var millis = Math.abs(s[1])
            return sign + (seconds < 10 ? '0' : '') + Math.abs(s[0]) + '+' + millis + (millis < 10 ? '0' : '')
        }
    },
    methods: {
        ...mapActions({
            setRenderingFrameRangeStart : 'setRenderingFrameRangeStart',
            setRenderingFrameRangeEnd   : 'setRenderingFrameRangeEnd'
        }),
        updateRenderingFrameRangeStart() {
            this.setRenderingFrameRangeStart({
                start: parseFloat(window.$('input[name="rendering_frame_range_start"]').val())
            })
        },
        updateRenderingFrameRangeEnd() {
            this.setRenderingFrameRangeEnd({
                end: parseFloat(window.$('input[name="rendering_frame_range_end"]').val())
            })
        },
        updateTimelineTime() {
            this.timeline.time = parseFloat(window.$('input[name="timeline_time"]').val())
        },
        play(reversed) {
            this.playing = true
            this.timeline.play(reversed)
        },
        pause() {
            this.playing = false
            this.timeline.pause()
        },
        goToStart() {
            this.timeline.goToStart()
        },
        goToEnd() {
            this.timeline.goToEnd()
        }
    }
}
</script>
