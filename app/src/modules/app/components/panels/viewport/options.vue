<template>
    <transition name="slide-fade-left" mode="in-out">
        <div class="viewport_options scrollable-y" v-show="showViewportOptions">
            <form class="ui inverted form">
                <div class="ui inverted accordion mini" v-if="camera && cursor">
                    <div class="title active accordion-header noselect">
                        <i class="dropdown icon"></i> View
                    </div>
                    <div class="content active">
                        <div class="ui inverted mini fluid labeled input input-transform slider checkbox right input-slider" v-if="camera">
                            <div class="ui black label fixed noselect">
                                Mode
                            </div>
                            <span class="input-slider-text noselect">
                                {{camera.mode == 1 ? 'Orthographic' : 'Perspective'}}
                            </span>
                            <input
                                type="checkbox"
                                name="newsletter"
                                :value="camera.mode"
                                :true-value="1"
                                :false-value="0"
                                title="Change viewport mode">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect">
                                Fov
                            </div>
                            <input
                                type="number"
                                name="fov"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="fov"
                                @mousemove="setFov"
                                @input="setFov"
                                @mouseup="editing = false"
                                title="Set viewport field of view">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect">
                                MinZ
                            </div>
                            <input
                                type="number"
                                name="minZ"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="minZ"
                                @input="setMinZ"
                                @mousemove="setMinZ"
                                @mouseup="editing = false"
                                title="Set minimum viewport camera distance">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect">
                                MaxZ
                            </div>
                            <input
                                type="number"
                                name="maxZ"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="maxZ"
                                @input="setMaxZ"
                                @mousemove="setMaxZ"
                                @mouseup="editing = false"
                                title="Set maximum viewport camera distance">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect">
                                Inertia
                            </div>
                            <input
                                type="number"
                                name="inertia"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="inertia"
                                @input="setInertia"
                                @mousemove="setInertia"
                                @mouseup="editing = false"
                                title="Set viewport camera inertia">
                        </div>
                    </div>

                    <div class="title accordion-header noselect active" v-if="typeof cursorVisibility != 'undefined'">
                        <i class="dropdown icon"></i> Cursor
                        <span class="checkbox-right">
                             <InputCheckbox
                                 @click.stop
                                 :attr="cursorVisibility"
                                 :inline="true"
                                 @submitted="toggleCursor">
                            </InputCheckbox>
                        </span>
                    </div>
                    <div class="content active" v-if="cursorPosition">
                        <div class="accordion-title noselect">Position</div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui red label noselect">X</div>
                            <input
                                type="number"
                                name="cursor_position_x"
                                id="cursor_position_x"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                :value="cursorPosition.x"
                                @inputDrag.prevent="updateCursorPositionX"
                                @keyup.enter.prevent="updateCursorPositionX"
                                title="Cursor Position X">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui green label noselect">Y</div>
                            <input
                                type="number"
                                name="cursor_position_y"
                                id="cursor_position_y"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                :value="cursorPosition.y"
                                @inputDrag.prevent="updateCursorPositionY"
                                @keyup.enter.prevent="updateCursorPositionY"
                                title="Cursor Position Y">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui blue label noselect">Z</div>
                            <input
                                type="number"
                                id="cursor_position_z"
                                name="cursor_position_z"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                :value="cursorPosition.z"
                                @inputDrag="updateCursorPositionZ"
                                @keyup.enter.prevent="updateCursorPositionZ"
                                title="Cursor Position Z">
                        </div>
                    </div>

                    <div class="title accordion-header noselect" v-if="grid">
                        <i class="dropdown icon"></i> Grid
                        <div class="inline right-checkbox field" v-if="grid"  @click.stop="toggleGrid()">
                            <div class="ui inverted checkbox" >
                                <input type="checkbox" class="hidden" :checked="grid.isVisible == true" title="Enable grid">
                            </div>
                        </div>
                    </div>
                    <div class="content active">
                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect">
                                Size
                            </div>
                            <input
                                type="number"
                                name="grid_size"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="gridSize"
                                @mousemove="resizeGrid"
                                @input="resizeGrid"
                                @mouseup="editing = false"
                                title="Set grid size">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </transition>
</template>
<script>
import InputCheckbox from '../../../../../core/fields/checkbox.vue'
import {mapGetters, mapActions} from 'vuex'
export default
{
    name:'viewport_options',
    props: {
        selection : Object
    },
    components: {
        InputCheckbox
    },
    data() {
        return {
            fov: 0,
            minZ: 0,
            maxZ: 0,
            inertia: 0,
            gridSize: 0,
            editing: false
        }
    },
    computed: mapGetters({
        grid             : 'getCurrentGrid',
        currentScene     : 'getCurrentScene',
        cursor           : 'getCurrentCursor',
        camera           : 'getCurrentCamera',
        cursorPosition   : 'getCurrentCursorPosition',
        cursorVisibility : 'getCurrentCursorVisibility',
        showViewportOptions: 'isViewportOptionsVisible'
    }),
    methods: {
        ...mapActions({
            showCursor         : 'showCursor',
            hideCursor         : 'hideCursor',
            setCursorPositionX : 'setCursorPositionX',
            setCursorPositionY : 'setCursorPositionY',
            setCursorPositionZ : 'setCursorPositionZ',
        }),
        updateCursorPositionX() {
            if(this.currentScene && this.camera) {
                this.setCursorPositionX({
                    x: parseFloat(window.$('input[name="cursor_position_x"]').val()),
                    radius: parseFloat(this.camera.radius),
                    sceneId: this.currentScene.id
                })
            }
        },
        updateCursorPositionY() {
            if(this.currentScene && this.camera) {
                this.setCursorPositionY({
                    y: parseFloat(window.$('input[name="cursor_position_y"]').val()),
                    radius: parseFloat(this.camera.radius),
                    sceneId: this.currentScene.id
                })
            }
        },
        updateCursorPositionZ() {
            if(this.currentScene && this.camera) {
                this.setCursorPositionZ({
                    z: parseFloat(window.$('input[name="cursor_position_z"]').val()),
                    radius: parseFloat(this.camera.radius),
                    sceneId: this.currentScene.id
                })
            }
        },
        setFov() {
//            this.editing = true;
//            this.camera.fov = window.$('input[name="fov"]').val();
        },
        setMinZ() {
//            this.editing = true;
//            this.camera.minZ = window.$('input[name="minZ"]').val();
        },
        setMaxZ() {
//            this.editing = true;
//            this.camera.maxZ = window.$('input[name="maxZ"]').val();
        },
        setInertia() {
//            this.editing = true;
//            this.camera.inertia = window.$('input[name="inertia"]').val();
        },
        resizeGrid()
        {

        },
        toggleGrid() {

        },
        toggleCursor(payload) {
            if(payload.value === false)
                this.hideCursor(this.currentScene.id)
            else
                this.showCursor(this.currentScene.id);
        }
    }
}
</script>
