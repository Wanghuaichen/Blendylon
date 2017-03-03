<template>
    <div style="padding: 0" class="scrollable-y full-height" v-if="scene">
        <div style="padding: 15px">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Colors
                </div>
                <div class="content active">
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Clear
                        </div>
                        <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('clear')">
                            <div
                                    v-if="typeof scene.clearColor != 'undefined'"
                                    style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                                    :style="{background: scene.clearColor.toHexString()}">
                            </div>
                        </div>
                        <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.clear" @click.stop.prevent>
                            <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                                <chrome-picker v-model="colors.clear" @change-color="onClearColorChange" ></chrome-picker>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Ambient
                        </div>
                        <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('ambient')">
                            <div
                                    v-if="typeof scene.ambientColor != 'undefined'"
                                    style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                                    :style="{background: scene.ambientColor.toHexString()}">
                            </div>
                        </div>
                        <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.ambient" @click.stop.prevent>
                            <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                                <chrome-picker v-model="colors.ambient" @change-color="onAmbientColorChange" ></chrome-picker>
                            </div>
                        </div>
                    </div>
                    <br>
                </div>

            </div>


            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Fog
                    <div class="inline right-checkbox field" @click.stop.prevent="toggleFog()">
                        <div class="ui inverted checkbox" >
                            <input type="checkbox" tabindex="0" class="hidden" :model="fogMode" title="Enable world sky">
                        </div>
                    </div>
                </div>
                <div class="content active">
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Color
                        </div>
                        <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('fog')">
                            <div
                                v-if="typeof scene.fogColor != 'undefined'"
                                style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                                :style="{background: scene.fogColor.toHexString()}">
                            </div>
                        </div>
                        <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.fog" @click.stop.prevent>
                            <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                                <chrome-picker v-model="colors.fog" @change-color="onFogColorChange" ></chrome-picker>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform">
                        <div class="ui black label fixed noselect" style="width:50%">
                            Density
                        </div>
                        <input
                            :disabled="!fogMode"
                            type="number"
                            name="fogDensity"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="scene.fogDensity"
                            @mousemove="setFogDensity"
                            @input="setFogDensity"
                            @mouseup="editing = false"
                            title="Set dog density">
                    </div>
                    <br>
                </div>
            </div>

            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Sky
                    <div class="inline right-checkbox field" @click.stop.prevent="toggleSky()">
                        <div class="ui inverted checkbox" >
                            <input type="checkbox" tabindex="0" class="hidden" :model="enabled" title="Enable world sky">
                        </div>
                    </div>
                </div>
                <div class="content active">
                    <form class="ui inverted form">

                        <div class="ui inverted mini fluid labeled input input-transform checkbox" @click.stop.prevent="toggleAnimation()">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Animated
                            </div>
                            <span class="input-slider-text noselect" style="width: 68px"></span>
                            <input type="checkbox" tabindex="0" class="hidden" :model="animated" title="Animate world sky" :disabled="!enabled">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Speed
                            </div>
                            <input
                                    :disabled="!enabled || !animated"
                                    type="number"
                                    name="animationSpeed"
                                    class="input-draggable"
                                    min="0"
                                    step="0.00001"
                                    v-input-draggable
                                    v-model="animationSpeed"
                                    @mousemove="setAnimationSpeed"
                                    @input="setAnimationSpeed"
                                    @mouseup="editing = false"
                                    title="Set sky animation speed">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Turbidity
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="turbidity"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="turbidity"
                                    @mousemove="setTurbidity"
                                    @input="setTurbidity"
                                    @mouseup="editing = false"
                                    title="Set sky turbidity">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Inclination
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="inclination"
                                    class="input-draggable"
                                    step="0.001"
                                    v-input-draggable
                                    v-model="inclination"
                                    @mousemove="setInclination"
                                    @input="setInclination"
                                    @mouseup="editing = false"
                                    title="Set sky inclination">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Azimuth
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="azimuth"
                                    class="input-draggable"
                                    min="0"
                                    step="0.001"
                                    v-input-draggable
                                    v-model="azimuth"
                                    @mousemove="setAzimuth"
                                    @input="setAzimuth"
                                    @mouseup="editing = false"
                                    title="Set sky azimuth">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Luminance
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="luminance"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="luminance"
                                    @mousemove="setLuminance"
                                    @input="setLuminance"
                                    @mouseup="editing = false"
                                    title="Set sky luminance">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Rayleigh
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="rayleigh"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="rayleigh"
                                    @mousemove="setRayleigh"
                                    @input="setRayleigh"
                                    @mouseup="editing = false"
                                    title="Set sky rayleigh">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Distance
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="distance"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="distance"
                                    @mousemove="setDistance"
                                    @input="setDistance"
                                    @mouseup="editing = false"
                                    title="Set sky distance">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Mie coefficient
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="mieCoefficient"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="mieCoefficient"
                                    @mousemove="setMieCoefficient"
                                    @input="setMieCoefficient"
                                    @mouseup="editing = false"
                                    title="Set sky mie coefficient">
                        </div>

                        <div class="ui inverted mini right fluid labeled input input-transform">
                            <div class="ui black label fixed noselect" style="width:50%">
                                Mie directional G
                            </div>
                            <input
                                    :disabled="!enabled"
                                    type="number"
                                    name="mieDirectionalG"
                                    class="input-draggable"
                                    min="0"
                                    step="0.01"
                                    v-input-draggable
                                    v-model="mieDirectionalG"
                                    @mousemove="setMieDirectionalG"
                                    @input="setMieDirectionalG"
                                    @mouseup="editing = false"
                                    title="Set sky mie directional G">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Chrome} from 'vue-color'
import CST from '../../../../../../utils/CST'
import Utility from '../../../../../../utils/Utility'
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            fogMode: BABYLON.Scene.FOGMODE_NONE,
            fogModes: {
                NONE: BABYLON.Scene.FOGMODE_NONE,
                EXP: BABYLON.Scene.FOGMODE_EXP,
                EXP2: BABYLON.Scene.FOGMODE_EXP2,
                LINEAR: BABYLON.Scene.FOGMODE_LINEAR
            },
            skybox: {},
            enabled: false,
            animated: false,
            editing: false,
            useSunPosition:false,
            sunPosition: new BABYLON.Vector3(0, 100, 0),
            animationSpeed: 0.00001,
            rayleigh: 2.0,
            distance: 500,
            turbidity: 10.0,
            inclination: 0.49,
            azimuth: 0.25,
            luminance: 1.0,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            show: {
                fog: false,
                clear: false,
                ambient: false
            },
            colors: {
                fog: {hex: '#194d33'},
                clear: {hex: '#194d33'},
                ambient: {hex: '#194d33'}
            }
        }
    },
    computed: mapGetters({
        scene: 'getCurrentScene'
    }),
    created() {
        if(typeof this.scene != 'undefined')
        {
            if(typeof this.scene.ambientColor != 'undefined')
                this.colors.ambient.hex = this.scene.ambientColor.toHexString();

            if(typeof this.scene.clearColor != 'undefined')
                this.colors.clear.hex = this.scene.clearColor.toHexString()

            if(typeof this.scene.fogColor != 'undefined')
                this.colors.fog.hex = this.scene.fogColor.toHexString()

            if(typeof this.scene.fogMode != 'undefined')
                this.fogMode = this.scene.fogMode;
        }

        let self = this;
        window.document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
            self.show.fog = false;
            self.show.clear = false;
            self.show.ambient = false;
        })
    },
    components: {
        'chrome-picker': Chrome
    },
    methods: {
        closePickers() {
            for(let s in this.show)
                this.show[s] = false;
        },
        showPicker(type) {
            if(typeof this.show[type] != 'undefined') {
                this.closePickers();
                this.show[type] = true;
            }
        },
        setTurbidity() {
            this.editing = true;
            this.skybox.material.turbidity = parseFloat(window.$('input[name="turbidity"]').val())
        },
        setInclination() {
            this.editing = true;
            this.skybox.material.inclination = parseFloat(window.$('input[name="inclination"]').val())
        },
        setAzimuth() {
            this.editing = true;
            this.skybox.material.azimuth = parseFloat(window.$('input[name="azimuth"]').val())
        },
        setLuminance() {
            this.editing = true;
            this.skybox.material.luminance = parseFloat(window.$('input[name="luminance"]').val())
        },
        setRayleigh() {
            this.editing = true;
            this.skybox.material.rayleigh = parseFloat(window.$('input[name="luminance"]').val());
        },
        setDistance() {
            this.editing = true;
            this.skybox.material.distance = parseFloat(window.$('input[name="distance"]').val());
        },
        setMieCoefficient() {
            this.editing = true;
            this.skybox.material.mieCoefficient = parseFloat(window.$('input[name="mieCoefficient"]').val());
        },
        setMieDirectionalG() {
            this.editing = true;
            this.skybox.material.mieDirectionalG = parseFloat(window.$('input[name="mieDirectionalG"]').val());
        },
        setAnimationSpeed() {
            this.editing = true;
            this.animationSpeed = parseFloat(window.$('input[name="animationSpeed"]').val())
        },
        toggleAnimation() {
            this.animated = this.animated == false;

            this.scene.registerBeforeRender(() => {
                if(this.animated && this.enabled) {
                    this.skybox.material.inclination += this.animationSpeed;
                    if(this.skybox.material.inclination > 1)
                        this.skybox.material.inclination = -1;
                    this.inclination = this.skybox.material.inclination;
                }
            });
        },
        toggleSky()
        {
            return this.enabled == false
                ? this.enableSkybox()
                : this.disableSkybox();
        },
        enableSkybox()
        {
            this.skybox.material = new BABYLON.SkyMaterial('skybox', this.scene);
            this.skybox.material.backFaceCulling = false;
            this.skybox.material._cachedDefines.FOG = false;
            this.skybox.material.disableLighting = true;
            this.skybox.material.fogEnabled = false
            this.skybox.material.useSunPosition = false;

            this.skybox.material.turbidity = this.turbidity;
            this.skybox.material.inclination =  this.inclination; // [0, 1]
            this.skybox.material.azimuth = this.azimuth;
            this.skybox.material.luminance = this.luminance;

            this.skybox.mesh = BABYLON.Mesh.CreateBox('skybox', 1500.0, this.scene);
            this.skybox.mesh.type = CST.OBJECTS.VIEWPORT_MESH;
            this.skybox.mesh.infiniteDistance = true;
            this.skybox.mesh.material = this.skybox.material;
            this.enabled = true;

            this.scene.meshes.forEach(mesh => {
                if(mesh.materialType == 'water-material' && typeof mesh.material != 'undefined') {
                    mesh.material.addToRenderList(this.skybox.mesh);
                }
            })
        },
        onClearColorChange(color) {
            this.scene.clearColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.clear = color
        },
        onAmbientColorChange(color) {
            this.scene.ambientColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.ambient = color
        },
        onFogColorChange(color) {
            this.scene.fogColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.fog = color
        },
        disableSkybox() {
            this.skybox.material.dispose();
            this.skybox.mesh.dispose();
            this.enabled = false;
        },
        toggleFog() {
            if(this.scene.fogMode == this.fogModes.NONE) {
                this.scene.fogMode = this.fogModes.EXP;
                this.fogMode = true;
            }
            else {
                this.fogMode = false;
                this.scene.fogMode = this.fogModes.NONE;
            }
        },
        setFogDensity() {
            this.editing = true;
            this.scene.fogDensity = parseFloat(window.$('input[name="fogDensity"]').val())
        }
    }
}
</script>
