<template>
    <div class="viewport_options scrollable-y" v-show="showViewportOptions">
        <form class="ui inverted form">
            <div class="ui inverted accordion mini" v-if="camera && cursor">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> View
                </div>
                <div class="content active">
                    <div
                            class="ui inverted mini fluid labeled input input-transform slider checkbox right input-slider"
                            v-if="camera"
                            @click.stop="setCameraMode()">
                        <div class="ui black label fixed noselect">
                            Mode
                        </div>
                        <span class="input-slider-text noselect">
                                {{camera.mode == 1 ? 'Orthographic' : 'Perspective'}}
                            </span>
                        <input
                                type="checkbox"
                                name="newsletter"
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
                                name="viewport_fov"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                min="0"
                                :value="camera.fov"
                                @inputDrag.prevent="updateViewportCameraFov"
                                @keyup.enter.prevent="updateViewportCameraFov"
                                title="Update viewport camera fov">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            MinZ
                        </div>
                        <input
                                type="number"
                                name="viewport_min_z"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                min="0"
                                :value="camera.minZ"
                                @inputDrag.prevent="updateViewportCameraMinZ"
                                @keyup.enter.prevent="updateViewportCameraMinZ"
                                title="Update viewport camera minimum view distance">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            MaxZ
                        </div>
                        <input
                                type="number"
                                name="viewport_max_z"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                min="0"
                                :value="camera.maxZ"
                                @inputDrag.prevent="updateViewportCameraMaxZ"
                                @keyup.enter.prevent="updateViewportCameraMaxZ"
                                title="Update viewport camera maximum view distance">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            Inertia
                        </div>
                        <input
                                type="number"
                                name="viewport_inertia"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                min="0"
                                max="1"
                                :value="camera.inertia"
                                @inputDrag.prevent="updateViewportCameraInertia"
                                @keyup.enter.prevent="updateViewportCameraInertia"
                                title="Update viewport camera inertia">
                    </div>
                </div>

                <div class="title accordion-header noselect active" v-if="typeof cursorVisibility != 'undefined'">
                    <i class="dropdown icon"></i> Cursor
                    <span class="checkbox-right" @click.stop>
                             <InputCheckbox
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
                    <div class="inline right-checkbox field" v-if="grid" @click.stop="toggleGrid()">
                        <div class="ui inverted checkbox">
                            <input type="checkbox" class="hidden" :checked="grid.isVisible == true"
                                   title="Enable grid">
                        </div>
                    </div>
                </div>
                <div class="content active">
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            Ratio
                        </div>
                        <input
                                type="number"
                                name="grid_ratio"
                                class="input-draggable"
                                v-input-draggable
                                step="0.01"
                                min="0"
                                :value="grid.material.gridRatio"
                                @inputDrag.prevent="updateGridRatio"
                                @keyup.enter.prevent="updateGridRatio"
                                title="Update grid ratio">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            Opacity
                        </div>
                        <input
                                type="number"
                                name="grid_opacity"
                                class="input-draggable"
                                v-input-draggable
                                step="0.001"
                                min="0"
                                max="1"
                                :value="grid.material.opacity"
                                @inputDrag.prevent="updateGridOpacity"
                                @keyup.enter.prevent="updateGridOpacity"
                                title="Update grid opacity">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect">
                            Frequency
                        </div>
                        <input
                                type="number"
                                name="grid_frequency"
                                class="input-draggable"
                                v-input-draggable
                                step="1"
                                min="0"
                                :value="grid.material.majorUnitFrequency"
                                @inputDrag.prevent="updateGridFrequency"
                                @keyup.enter.prevent="updateGridFrequency"
                                title="Update grid frequency">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import InputCheckbox from '../../../../../core/fields/checkbox.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default
    {
        name       : 'viewport_options',
        components : {
            InputCheckbox
        },
        data() {
            return {
                fov      : 0,
                minZ     : 0,
                maxZ     : 0,
                inertia  : 0,
                gridSize : 0,
                editing  : false
            }
        },
        computed   : mapGetters({
            grid                : 'getCurrentGrid',
            currentScene        : 'getCurrentScene',
            cursor              : 'getCurrentCursor',
            camera              : 'getCurrentCamera',
            cursorPosition      : 'getCurrentCursorPosition',
            cursorVisibility    : 'getCurrentCursorVisibility',
            showViewportOptions : 'isViewportOptionsVisible'
        }),
        methods    : {
            ...mapActions({
                showCursor               : 'showCursor',
                hideCursor               : 'hideCursor',
                setCursorPositionX       : 'setCursorPositionX',
                setCursorPositionY       : 'setCursorPositionY',
                setCursorPositionZ       : 'setCursorPositionZ',
                setViewportCameraFov     : 'setViewportCameraFov',
                setViewportCameraMinZ    : 'setViewportCameraMinZ',
                setViewportCameraMaxZ    : 'setViewportCameraMaxZ',
                setViewportCameraInertia : 'setViewportCameraInertia',
                setGridRatio             : 'setGridRatio',
                setGridOpacity           : 'setGridOpacity',
                setGridFrequency         : 'setGridFrequency',
                toggleCameraMode         : 'toggleCameraMode'
            }),
            setCameraMode() {
                if(this.currentScene && this.camera) {
                    this.toggleCameraMode({
                        sceneId : this.currentScene.id
                    });
                }
            },
            updateCursorPositionX() {
                if(this.currentScene && this.camera) {
                    this.setCursorPositionX({
                        x       : parseFloat(window.$('input[name="cursor_position_x"]').val()),
                        radius  : parseFloat(this.camera.radius),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateCursorPositionY() {
                if(this.currentScene && this.camera) {
                    this.setCursorPositionY({
                        y       : parseFloat(window.$('input[name="cursor_position_y"]').val()),
                        radius  : parseFloat(this.camera.radius),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateCursorPositionZ() {
                if(this.currentScene && this.camera) {
                    this.setCursorPositionZ({
                        z       : parseFloat(window.$('input[name="cursor_position_z"]').val()),
                        radius  : parseFloat(this.camera.radius),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateViewportCameraFov() {
                if(this.currentScene && this.camera) {
                    this.setViewportCameraFov({
                        fov     : parseFloat(window.$('input[name="viewport_fov"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateViewportCameraMinZ() {
                if(this.currentScene && this.camera) {
                    this.setViewportCameraMinZ({
                        minZ    : parseFloat(window.$('input[name="viewport_min_z"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateViewportCameraMaxZ() {
                if(this.currentScene && this.camera) {
                    this.setViewportCameraMaxZ({
                        maxZ    : parseFloat(window.$('input[name="viewport_max_z"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateViewportCameraInertia() {
                if(this.currentScene && this.camera) {
                    this.setViewportCameraInertia({
                        inertia : parseFloat(window.$('input[name="viewport_inertia"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateGridRatio() {
                if(this.grid) {
                    this.setGridRatio({
                        ratio : parseFloat(window.$('input[name="grid_ratio"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateGridOpacity() {
                if(this.grid) {
                    this.setGridOpacity({
                        opacity : parseFloat(window.$('input[name="grid_opacity"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            updateGridFrequency() {
                if(this.grid) {
                    this.setGridFrequency({
                        frequency : parseInt(window.$('input[name="grid_frequency"]').val()),
                        sceneId : this.currentScene.id
                    })
                }
            },
            toggleGrid() {
                if(this.grid) {
//                    this.setGridRatio({
//                        ratio : parseFloat(window.$('grid_ratio"]').val())
//                    })
                }
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
