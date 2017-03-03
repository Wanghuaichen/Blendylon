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
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.position.x"
                        title="Position X">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui green label noselect">Y</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.position.y"
                        title="Position Y">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui blue label noselect">Z</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.position.z"
                        title="Position Z">
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
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.direction.x"
                        title="Direction X">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui green label noselect">Y</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.direction.y"
                        title="Direction Y">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui blue label noselect">Z</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.direction.z"
                        title="Direction Z">
                </div>
            </div>

            <div class="column" v-if="object.scaling">
                <div class="text-center accordion-title noselect">Scale</div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui red label noselect">X</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.scaling.x"
                        title="Scaling X">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui green label noselect">Y</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.scaling.y"
                        title="Scaling Y">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui blue label noselect">Z</div>
                    <input
                        type="number"
                        class="input-draggable"
                        v-input-draggable
                        step="0.01"
                        v-model="object.scaling.z"
                        title="Scaling Z">
                </div>
            </div>
        </div>
        <br>
    </div>
</div>
</template>
<script>
import Utility from '../../../../../../../utils/Utility';

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
        rotateX() { this.object.rotation.x = Utility.toRadians(this.$refs.rotationX.value) },
        rotateY() { this.object.rotation.y = Utility.toRadians(this.$refs.rotationY.value) },
        rotateZ() { this.object.rotation.z = Utility.toRadians(this.$refs.rotationZ.value) }
    }
}
</script>
