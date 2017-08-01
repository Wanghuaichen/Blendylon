<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div class="ui one wide column">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Render
                </div>
                <div class="content active">
                    <div class="ui grid">
                        <div class="column">
                            <div class="two ui buttons">
                                <button class="ui labeled fluid inverted icon button">
                                    <i class="icon"><img src="assets/img/icons/rendering.png" style="margin-top:5px"></i>
                                    Render
                                </button>
                                <button class="ui labeled fluid inverted icon button" >
                                    <i class="icon"><img src="assets/img/icons/rendering.png" style="margin-top:5px"></i>
                                    Animation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Dimensions
                </div>
                <div class="content active">
                    <div class="ui two column grid">
                        <div class="column">
                            <div class="text-center accordion-title noselect">Resolution</div>
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui red label noselect">X</div>
                                <input
                                    type="number"
                                    name="rendering_resolution_x"
                                    class="input-draggable"
                                    v-input-draggable
                                    step="1"
                                    min="0"
                                    :value="coreOptions.rendering.resolution.x"
                                    @inputDrag.prevent="updateRenderingResolutionX"
                                    @keyup.enter.prevent="updateRenderingResolutionX"
                                    title="Update rendering width">
                            </div>
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui green label noselect">Y</div>
                                <input
                                    type="number"
                                    name="rendering_resolution_y"
                                    class="input-draggable"
                                    v-input-draggable
                                    step="1"
                                    min="0"
                                    :value="coreOptions.rendering.resolution.y"
                                    @inputDrag.prevent="updateRenderingResolutionY"
                                    @keyup.enter.prevent="updateRenderingResolutionY"
                                    title="Update rendering height">
                            </div>
                        </div>

                        <div class="column">
                            <div class="text-center accordion-title noselect">Frame Range</div>
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui grey label noselect" style="width: 33.3%">Start</div>
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
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui grey label noselect" style="width: 33.3%">End</div>
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
                        </div>
                    </div>
                    <br>
                </div>

            </div>
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Output
                </div>
                <div class="content active">
                    <div class="ui column grid">
                        <div class="column">
                            <div class="ui inverted mini fluid input input-transform right">
                                <input type="text" class="folder_selector"  readonly>
                                <input type="file" webkitdirectory directory multiple style="display:none">
                                <div class="ui icon button">
                                    <i class="attach icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--<div class="ui inverted accordion">-->
                <!--<div class="title active accordion-header noselect">-->
                    <!--<i class="dropdown icon"></i> Mobile Device Orientation-->
                <!--</div>-->
                <!--<div class="content active">-->
                    <!--<div class="ui inverted mini fluid labeled input input-transform slider checkbox right input-slider" @click="toggleServer()">-->
                        <!--<div class="ui black label fixed noselect" style="width: 50%">-->
                            <!--Server status-->
                        <!--</div>-->
                        <!--<div class="ui label" style="border-radius:0;"-->
                             <!--:class="{-->
                                <!--'red': server.started == false,-->
                                <!--'olive': server.started == true-->
                            <!--}">-->
                            <!--<i class="icon" :class="{-->
                                <!--'remove': server.started == false,-->
                                <!--'checkmark': server.started == true-->
                            <!--}"></i>-->
                            <!--<span v-if="server.started">STARTED</span>-->
                            <!--<span v-if="!server.started">STOPPED</span>-->
                        <!--</div>-->
                        <!--<input-->
                            <!--type="checkbox"-->
                            <!--name="server_status"-->
                            <!--:value="server.started">-->
                    <!--</div>-->
                    <!--<InputText-->
                        <!--:attr="server.address"-->
                        <!--label="Server address"-->
                        <!--@submitted="setServerAddress">-->
                    <!--</InputText>-->
                    <!--<div class="ui inverted mini right fluid labeled input input-transform">-->
                        <!--<div class="ui black label fixed noselect" style="width: 50%">-->
                            <!--Server port-->
                        <!--</div>-->
                        <!--<input-->
                            <!--type="number"-->
                            <!--name="server_port"-->
                            <!--class="input-draggable"-->
                            <!--min="1000"-->
                            <!--step="1"-->
                            <!--v-input-draggable-->
                            <!--:value="server.port"-->
                            <!--@mousemove="setServerPort"-->
                            <!--@input="setServerPort"-->
                            <!--title="Set server port">-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>

    </div>
</template>
<script>
import path from 'path'
//import cp from 'child_process'
import Utility from '../../../../../../core/utils/Utility'
import InputText from '../../../../../../core/fields/text.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
    data(){
        return {
            instance: {},
            server: {
                started: false,
                address: null,
                port: 3500
            }
        }
    },
    computed: mapGetters({
        currentCamera: 'getCurrentCamera',
        coreOptions: 'getCoreOptions'
    }),
    created() {
//        require('dns').lookup(require('os').hostname(), (err, addr, fam) => {
//            this.server.address = addr;
//        })
    },
    methods: {
        ...mapActions({
            setRenderingResolutionX     : 'setRenderingResolutionX',
            setRenderingResolutionY     : 'setRenderingResolutionY',
            setRenderingFrameRangeStart : 'setRenderingFrameRangeStart',
            setRenderingFrameRangeEnd   : 'setRenderingFrameRangeEnd'
        }),
        updateRenderingResolutionX() {
            this.setRenderingResolutionX({
                x: parseFloat(window.$('input[name="rendering_resolution_x"]').val())
            })
        },
        updateRenderingResolutionY() {
            this.setRenderingResolutionY({
                y: parseFloat(window.$('input[name="rendering_resolution_y"]').val())
            })
        },
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
        toggleServer()
        {
            if(!this.server.started)
            {
//                this.instance = cp.fork('C:\\wamp\\www\\Warlight\\Tools\\Editor\\app\\src\\servers\\mobile\\server.js')

                this.instance.on('error', (err) => {
                    console.log(err)
                });
                let speed = 0.01;
                let scale = 1;
                let initialOrientationGamma = 0;
                let initialOrientationBeta = 0;
                let direction = new BABYLON.Vector3.Zero();

                this.currentCamera.position.x = 0;
                this.currentCamera.position.z = -5;
                this.currentCamera.position.y = 0.5;

                this.instance.on('message', (payload) =>
                {
                    switch (payload.type)
                    {
                        case 'device:orientation':
                            var z = (initialOrientationBeta - payload.data.beta) * 0.05;
                            var x = (initialOrientationGamma - payload.data.gamma) * -0.05;


                            direction = new BABYLON.Vector3(
                                x * speed * scale,
                                0,
                                z * speed * scale
                            );

                            let dz = direction.z * 1.5;
                            let dx = -direction.x * 1.5;

                            dz = Utility.clamp(dz, -0.002, 0.002);
                            dx = Utility.clamp(dx, -0.002, 0.002);

                            this.currentCamera.position.addInPlace(direction.multiplyByFloats(10, 10, 10))
                            var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(0, dz, dx);

//                            if(rotationToApply.z < 0.003)
//                                rotationToApply.z = 0.003

                            this.currentCamera.rotationQuaternion = rotationToApply.multiply(this.currentCamera.rotationQuaternion);
//                            direction.scaleInPlace(5);

                            break;
                        case 'device:motion':
                            break;
                        case 'device:move':
                            if(payload.data.direction == 'left') {
                                this.currentCamera.rotationQuaternion = new BABYLON.Quaternion.RotationYawPitchRoll(-0.01, 0, 0)
                                        .multiply(this.currentCamera.rotationQuaternion);
                            }
                            if(payload.data.direction == 'right') {
                                this.currentCamera.rotationQuaternion = new BABYLON.Quaternion.RotationYawPitchRoll(0.01, 0, 0)
                                        .multiply(this.currentCamera.rotationQuaternion);
                            }
                            if(payload.data.direction == 'up')
                                this.currentCamera.position.y += speed
                            if(payload.data.direction == 'down')
                                this.currentCamera.position.y -= speed
                            break
                    }
                });

                this.instance.on('exit', (data) => {
                    console.log('Server exited', data);
                    this.server.started = false;
                })

                this.server.started = true;
            }
            else {
                if(typeof this.instance.kill == 'function')
                    this.instance.kill('SIGINT');

                this.server.started = false;
            }
        },
        setServerAddress(payload) {
            this.server.address = payload.value
        },
        setServerPort() {
            this.server.port = window.$('input[name="server_port"]').val();
        }
    },
    components: {
        InputText
    }
}
</script>
