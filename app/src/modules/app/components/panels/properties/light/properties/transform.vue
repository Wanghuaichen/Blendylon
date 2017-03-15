<template>
<div class="ui inverted accordion" v-if="object ">
    <div class="title active accordion-header noselect">
        <i class="dropdown icon"></i> Transform
    </div>
    <div class="content active">
        <div class="ui three column grid">
            <div class="column" v-if="object.position">
                <div class="text-center accordion-title noselect">Location</div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui red label noselect">X</div>
                    <input
                        type="number"
                        name="light_position_x"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.position.x"
                        @inputDrag.prevent="setObjectPositionX"
                        @keyup.enter.prevent="setObjectPositionX"
                        title="Set light x position">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui green label noselect">Y</div>
                    <input
                        type="number"
                        name="light_position_y"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.position.y"
                        @inputDrag.prevent="setObjectPositionY"
                        @keyup.enter.prevent="setObjectPositionY"
                        title="Set light y position">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui blue label noselect">Z</div>
                    <input
                        type="number"
                        name="light_position_z"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.position.z"
                        @inputDrag.prevent="setObjectPositionZ"
                        @keyup.enter.prevent="setObjectPositionZ"
                        title="Set light z position">
                </div>
            </div>

            <div class="column" v-if="object.rotation">
                <div class="text-center accordion-title noselect">Rotation</div>
                <form @submit.prevent="rotateX">
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui red label noselect">X</div>
                        <input
                            type="number"
                            class="input-draggable"
                            name="rotationX"
                            title="Rotation X"
                            ref="rotationX"
                            v-input-draggable
                            v-model="rotationX"
                            @input="rotateX"
                            @mousemove="rotateX">
                        <span class="transform-unit noselect">°</span>
                    </div>
                </form>
                <form @submit.prevent="rotateY">
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui green label noselect">Y</div>
                        <input
                            type="number"
                            class="input-draggable"
                            name="rotationY"
                            ref="rotationY"
                            v-input-draggable
                            v-model="rotationY"
                            @input="rotateY"
                            @mousemove="rotateY"
                            title="Rotation Y">
                        <span class="transform-unit noselect">°</span>
                    </div>
                </form>
                <form @submit.prevent="rotateZ">
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui blue label noselect">Z</div>
                        <input
                            type="number"
                            class="input-draggable"
                            name="rotationZ"
                            ref="rotationZ"
                            v-input-draggable
                            v-model="rotationZ"
                            @input="rotateZ"
                            @mousemove="rotateZ"
                            title="Rotation Z">
                        <span class="transform-unit noselect">°</span>
                    </div>
                </form>
            </div>

            <div class="column" v-if="object.direction">
                <div class="text-center accordion-title noselect">Direction</div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui red label noselect">X</div>
                    <input
                        type="number"
                        name="light_direction_x"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.direction.x"
                        @inputDrag.prevent="setObjectDirectionX"
                        @keyup.enter.prevent="setObjectDirectionX"
                        title="Set light x direction">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui green label noselect">Y</div>
                    <input
                        type="number"
                        name="light_direction_y"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.direction.y"
                        @inputDrag.prevent="setObjectDirectionY"
                        @keyup.enter.prevent="setObjectDirectionY"
                        title="Set light y position">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui blue label noselect">Z</div>
                    <input
                        type="number"
                        name="light_direction_z"
                        class="input-draggable"
                        step="0.01"
                        v-input-draggable
                        :value="object.direction.z"
                        @inputDrag.prevent="setObjectDirectionZ"
                        @keyup.enter.prevent="setObjectDirectionZ"
                        title="Set light z position">
                </div>
            </div>
        </div>
        <br>
    </div>
</div>
</template>
<script>
import Utility from '../../../../../../../core/utils/Utility';
import {mapGetters, mapActions} from 'vuex'
export default
{
    name: 'Transform',
    data()
    {
        return {
        }
    },
    props: {
        object : Object
    },
    mounted() {
        window.refreshSemanticUi();
    },
    computed: {
        rotationX: function() { return Utility.toDegrees(this.object.rotation.x) },
        rotationY: function() { return Utility.toDegrees(this.object.rotation.y) },
        rotationZ: function() { return Utility.toDegrees(this.object.rotation.z) }
    },
    methods: {
        ...mapActions({
            setLightPositionX  : 'setLightPositionX',
            setLightPositionY  : 'setLightPositionY',
            setLightPositionZ  : 'setLightPositionZ',
            setLightDirectionX : 'setLightDirectionX',
            setLightDirectionY : 'setLightDirectionY',
            setLightDirectionZ : 'setLightDirectionZ'
        }),
        setObjectPositionX() {
            this.setLightPositionX({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_position_x"]').val())
            })
        },
        setObjectPositionY() {
            this.setLightPositionY({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_position_y"]').val())
            })
        },
        setObjectPositionZ() {
            this.setLightPositionZ({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_position_z"]').val())
            })
        },
        setObjectDirectionX() {
            this.setLightDirectionX({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_direction_x"]').val())
            })
        },
        setObjectDirectionY() {
            this.setLightDirectionY({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_direction_y"]').val())
            })
        },
        setObjectDirectionZ() {
            this.setLightDirectionZ({
                lightId: this.object.id,
                value: parseFloat($('input[name="light_direction_z"]').val())
            })
        },
        rotateX() { this.object.rotation.x = Utility.toRadians(this.$refs.rotationX.value) },
        rotateY() { this.object.rotation.y = Utility.toRadians(this.$refs.rotationY.value) },
        rotateZ() { this.object.rotation.z = Utility.toRadians(this.$refs.rotationZ.value) }
    }
}
</script>
