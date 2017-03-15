<template>
    <div v-if="object.materialType == 'water-material' && object.material">
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Properties
            </div>
            <div class="content active">
                <div class="ui inverted mini fluid labeled input input-transform right">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Name
                    </div>
                    <input
                        type="text"
                        v-model="object.material.name"
                        title="Object name">
                </div>

                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Alpha
                    </div>
                    <input
                        type="number"
                        name="alpha"
                        class="input-draggable"
                        min="0"
                        max="1"
                        step="0.01"
                        v-input-draggable
                        v-model="object.material.alpha"
                        @mousemove="setAlpha"
                        @input="setAlpha"
                        @mouseup="editing = false"
                        title="Set material alpha">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Specular power
                    </div>
                    <input
                            type="number"
                            name="specularPower"
                            class="input-draggable"
                            min="0"
                            step="1"
                            v-input-draggable
                            v-model="object.material.specularPower"
                            @mousemove="setSpecularPower"
                            @input="setSpecularPower"
                            @mouseup="editing = false"
                            title="Set specular power">
                </div>
                <div class="ui inverted mini fluid labeled input input-transform checkbox"
                     v-if="typeof object.material.backFaceCulling != 'undefined'"
                     @click.stop="toggleBackFaceCulling()">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Back faces culling
                    </div>
                    <span class="input-slider-text noselect" style="width: 68px"></span>
                    <input type="checkbox" tabindex="0" class="hidden" :checked="object.material.backFaceCulling == 1" title="Toggle back faces culling">
                </div>
                <div class="ui inverted mini fluid labeled input input-transform checkbox"
                     v-if="typeof object.material.disableLighting != 'undefined'"
                     @click.stop="toggleLighting()">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Toggle lighting
                    </div>
                    <span class="input-slider-text noselect" style="width: 68px"></span>
                    <input type="checkbox" tabindex="0" class="hidden" :checked="object.material.disableLighting == 1" title="Toggle lighting">
                </div>
                <div class="ui inverted mini fluid labeled input input-transform checkbox"
                     v-if="typeof object.material.fresnelSeparate != 'undefined'"
                     @click.stop="toggleFresnelSeparate()">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Toggle fresnel separate
                    </div>
                    <span class="input-slider-text noselect" style="width: 68px"></span>
                    <input type="checkbox" tabindex="0" class="hidden" :checked="object.material.fresnelSeparate == 1" title="Toggle fresnel separate">
                </div>
            </div>
        </div>
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Wind
            </div>
            <div class="content active">
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Force
                    </div>
                    <input
                        type="number"
                        name="windForce"
                        class="input-draggable"
                        min="0"
                        step="1"
                        v-input-draggable
                        v-model="object.material.windForce"
                        @mousemove="setWindForce"
                        @input="setWindForce"
                        @mouseup="editing = false"
                        title="Set wind force">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Direction
                    </div>
                    <div class="row full-width">
                        <div class="column" v-if="object.material.windDirection">
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui red label noselect">X</div>
                                <input
                                    type="number"
                                    class="input-draggable"
                                    v-input-draggable
                                    step="0.01"
                                    v-model="object.material.windDirection.x"
                                    title="Wind direction X">
                            </div>
                            <div class="ui inverted mini right fluid labeled input input-transform">
                                <div class="ui green label noselect">Y</div>
                                <input
                                    type="number"
                                    class="input-draggable"
                                    v-input-draggable
                                    step="0.01"
                                    v-model="object.material.windDirection.y"
                                    title="Wind direction Y">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Wave
            </div>
            <div class="content active">
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Speed
                    </div>
                    <input
                        type="number"
                        name="waveSpeed"
                        class="input-draggable"
                        step="0.1"
                        v-input-draggable
                        v-model="object.material.waveSpeed"
                        @mousemove="setWaveSpeed"
                        @input="setWaveSpeed"
                        @mouseup="editing = false"
                        title="Set wave speed">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Height
                    </div>
                    <input
                        type="number"
                        name="waveHeight"
                        class="input-draggable"
                        step="0.1"
                        v-input-draggable
                        v-model="object.material.waveHeight"
                        @mousemove="setWaveHeight"
                        @input="setWaveHeight"
                        @mouseup="editing = false"
                        title="Set wave height">
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Length
                    </div>
                    <input
                        type="number"
                        name="waveLength"
                        class="input-draggable"
                        min="0"
                        step="0.1"
                        v-input-draggable
                        v-model="object.material.waveLength"
                        @mousemove="setWaveLength"
                        @input="setWaveLength"
                        @mouseup="editing = false"
                        title="Set wave length">
                </div>
            </div>
        </div>
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Colors
            </div>
            <div class="content active">
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="object.material.diffuseColor">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Diffuse
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('waterDiffuse')">
                        <div
                            v-if="typeof object.material.diffuseColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.diffuseColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.waterDiffuse" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.waterDiffuse" @change-color="onWaterDiffuseColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="object.material.specularColor">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Specular
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('waterSpecular')">
                        <div
                            v-if="typeof object.material.specularColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.specularColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.waterSpecular" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.waterSpecular" @change-color="onWaterSpecularColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="object.material.waterColor">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Water primary
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('waterPrimary')">
                        <div
                            v-if="object.material.waterColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.waterColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.waterPrimary" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.waterPrimary" @change-color="onWaterPrimaryColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="object.material.waterColor2">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Water secondary
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('waterSecondary')">
                        <div
                            v-if="object.material.waterColor2 != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.waterColor2.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.waterSecondary" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.waterSecondary" @change-color="onWaterSecondaryColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Blend factor
                    </div>
                    <input
                        type="number"
                        name="colorBlendFactor"
                        class="input-draggable"
                        step="0.1"
                        v-input-draggable
                        v-model="object.material.colorBlendFactor"
                        @mousemove="setColorBlendFactor"
                        @input="setColorBlendFactor"
                        @mouseup="editing = false"
                        title="Set color blend factor">
                </div>
            </div>
        </div>
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Textures
            </div>
            <div class="content active">
                <h4 class="ui horizontal inverted divider">
                    Bump
                </h4>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Texture <i class="icon texture-icon-right remove" v-if="hasBump" @click="removeBumpTexture()"></i>
                    </div>
                    <div class="ui tiny floating dropdown inverted fluid button">
                        <div class="text" v-if="hasBump">{{bumpTextureName}}</div>
                        <div class="text" v-if="!hasBump">Select</div>
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <a class="item" v-for="texture in textures" :value="texture.name" @click="setBumpTexture(texture)">
                                {{basename(texture.name)}}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini right fluid labeled input input-transform">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Height
                    </div>
                    <input
                        type="number"
                        name="bumpHeight"
                        class="input-draggable"
                        step="0.1"
                        v-input-draggable
                        v-model="object.material.bumpHeight"
                        @mousemove="setBumpHeight"
                        @input="setBumpHeight"
                        @mouseup="editing = false"
                        title="Set bump height">
                </div>
                <div class="ui inverted mini fluid labeled input input-transform checkbox"
                     v-if="typeof object.material.bumpSuperimpose != 'undefined'"
                     @click.stop="toggleBumpSuperimpose()">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Superimpose
                    </div>
                    <span class="input-slider-text noselect" style="width: 68px"></span>
                    <input type="checkbox" tabindex="0" class="hidden" :checked="object.material.bumpSuperimpose == 1" title="Toggle bump superimpose">
                </div>

            </div>
        </div>
    </div>
</template>
<script type="text/babel">
import path from 'path'
import {Chrome} from 'vue-color'
export default{
    name: 'water-material',
    data(){
        return {
            editing: false,
            hasBump: false,
            show: {
                waterPrimary: false,
                waterSecondary: false,
                waterDiffuse: false,
                waterSpecular: false
            },
            colors: {
                waterPrimary:   {hex: '#FFFFFF'},
                waterSecondary: {hex: '#FFFFFF'},
                waterDiffuse:   {hex: '#FFFFFF'},
                waterSpecular:  {hex: '#FFFFFF'}
            },
            bumpTextureName: '',
        }
    },
    created() {
        if(this.object) {
            if(this.object.material) {

                this.colors.waterPrimary.hex = this.object.material.waterColor.toHexString()
                this.colors.waterSecondary.hex = this.object.material.waterColor2.toHexString()
                this.colors.waterDiffuse.hex = this.object.material.diffuseColor.toHexString()
                this.colors.waterSpecular.hex = this.object.material.specularColor.toHexString()
            }
        }

        let self = this;
        window.document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
            self.show.waterPrimary = false;
            self.show.waterSecondary = false;
            self.show.waterDiffuse = false;
            self.show.waterSpecular = false;
        })
    },
    methods:
    {
        basename(name) {
            return path.basename(name);
        },
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
        setAlpha() {
            this.editing = true;
            this.object.material.alpha = parseFloat(window.$('input[name="alpha"]').val())
        },
        setSpecularPower() {
            this.editing = true;
            this.object.material.specularPower = parseFloat(window.$('input[name="specularPower"]').val())
        },
        setBumpTexture(texture) {
            this.object.material.bumpTexture = texture.data;
            console.log(this.object.material)
            this.bumpName = path.basename(texture.data.url);
            this.hasBump = true
        },
        removeBumpTexture() {
            this.object.material.bumpTexture = undefined;
            this.hasBump = false;
            this.bumpTextureName = '';
        },
        toggleBackFaceCulling() {
            if(this.object.material.backFaceCulling == 0)
                this.object.material.backFaceCulling = 1;
            else
                this.object.material.backFaceCulling = 0;
        },
        toggleLighting() {
            if(this.object.material.disableLighting == 0)
                this.object.material.disableLighting = 1;
            else
                this.object.material.disableLighting = 0;
        },
        toggleBumpSuperimpose() {
            if(this.object.material.bumpSuperimpose == 0)
                this.object.material.bumpSuperimpose = 1;
            else
                this.object.material.bumpSuperimpose = 0;
        },
        toggleFresnelSeparate() {
            if(this.object.material.fresnelSeparate == 0)
                this.object.material.fresnelSeparate = 1;
            else
                this.object.material.fresnelSeparate = 0;
        },
        toggleBumpAffectsReflection() {
            if(this.object.material.bumpAffectsReflection == 0)
                this.object.material.bumpAffectsReflection = 1;
            else
                this.object.material.bumpAffectsReflection = 0;
        },
        onWaterPrimaryColorChange(color) {
            this.object.material.waterColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.waterPrimary = color
        },
        onWaterSecondaryColorChange(color) {
            this.object.material.waterColor2 = BABYLON.Color3.FromHexString(color.hex);
            this.colors.waterSecondary = color
        },
        onWaterDiffuseColorChange(color) {
            this.object.material.diffuseColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.waterDiffuse = color
        },
        onWaterSpecularColorChange(color) {
            this.object.material.specularColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.waterSpecular = color
        },
        setWindForce() {
            this.editing = true;
            this.object.material.windForce = parseFloat(window.$('input[name="windForce"]').val());
        },
        setWaveHeight() {
            this.editing = true;
            this.object.material.waveHeight = parseFloat(window.$('input[name="waveHeight"]').val());
        },
        setWaveLength() {
            this.object.material.waveLength = parseFloat(window.$('input[name="waveLength"]').val());
        },
        setWaveSpeed() {
            this.object.material.waveSpeed = parseFloat(window.$('input[name="waveSpeed"]').val());
        },
        setBumpHeight() {
            this.editing = true;
            this.object.material.bumpHeight = parseFloat(window.$('input[name="bumpHeight"]').val())
        },
        setColorBlendFactor() {
            this.editing = true;
            this.object.material.colorBlendFactor = parseFloat(window.$('input[name="colorBlendFactor"]').val())
        }
    },
    watch:
    {
        'object.name': function(v)
        {
            this.closePickers();
            this.hasBump = false;
            this.bumpTextureName = '';

            if(this.object.material)
            {
                this.hasBump = typeof this.object.material.bumpTexture != 'undefined';
                if(this.hasBump)
                    this.bumpTextureName = path.basename(this.object.material.bumpTexture.url);
            }
        }
    },
    props:
    {
        object:
        {
            type: Object,
            default: () => {}
        },
        scene:
        {
            type: Object,
            default: () => {}
        },
        textures:
        {
            type: Array,
            default: () => []
        }
    },
    updated() {
        this.$nextTick(function() {
            window.refreshSemanticUi();
        })
    },
    components: {
        'chrome-picker': Chrome
    }
}
</script>
