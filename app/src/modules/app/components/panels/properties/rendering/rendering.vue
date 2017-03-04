<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div class="ui two wide column" style="padding: 15px;">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Mobile Device Orientation
                </div>
                <div class="content active">
                    <div class="ui inverted mini fluid labeled input input-transform slider checkbox right input-slider" @click="toggleServer()">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Server status
                        </div>
                        <div class="ui label" style="border-radius:0;"
                             :class="{
                                'red': server.started == false,
                                'olive': server.started == true
                            }">
                            <i class="icon" :class="{
                                'remove': server.started == false,
                                'checkmark': server.started == true
                            }"></i>
                            <span v-if="server.started">STARTED</span>
                            <span v-if="!server.started">STOPPED</span>
                        </div>
                        <input
                            type="checkbox"
                            name="server_status"
                            :value="server.started">
                    </div>
                    <InputText
                        :attr="server.address"
                        label="Server address"
                        @submitted="setServerAddress">
                    </InputText>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Server port
                        </div>
                        <input
                            type="number"
                            name="server_port"
                            class="input-draggable"
                            min="1000"
                            step="1"
                            v-input-draggable
                            :value="server.port"
                            @mousemove="setServerPort"
                            @input="setServerPort"
                            title="Set server port">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import path from 'path'
import cp from 'child_process'
import Utility from '../../../../../../utils/Utility'
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
        currentCamera: 'getCurrentCamera'
    }),
    created() {
        require('dns').lookup(require('os').hostname(), (err, addr, fam) => {
            this.server.address = addr;
        })
    },
    methods: {
        toggleServer()
        {
            if(!this.server.started)
            {
                this.instance = cp.fork('C:\\wamp\\www\\Warlight\\Tools\\Editor\\app\\src\\servers\\mobile\\server.js')

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
