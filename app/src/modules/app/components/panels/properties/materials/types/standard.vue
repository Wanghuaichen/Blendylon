<template>
    <div >
        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Properties
            </div>
            <div class="content active">
                <div class="ui inverted mini fluid labeled input input-transform right">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Name deeznuts
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
            </div>
        </div>

        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Colors
            </div>
            <div class="content active">
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Diffuse
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('diffuse')">
                        <div
                            v-if="typeof object.material.diffuseColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.diffuseColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.diffuse" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.diffuse" @change-color="onDiffuseColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Specular
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('specular')">
                        <div
                            v-if="typeof object.material.specularColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.specularColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.specular" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.specular" @change-color="onSpecularColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Ambient
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('ambient')">
                        <div
                             v-if="typeof object.material.ambientColor != 'undefined'"
                             style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                             :style="{background: object.material.ambientColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.ambient" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.ambient" @change-color="onAmbientColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Emissive
                    </div>
                    <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('emissive')">
                        <div
                            v-if="typeof object.material.emissiveColor != 'undefined'"
                            style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                            :style="{background: object.material.emissiveColor.toHexString()}">
                        </div>
                    </div>
                    <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.emissive" @click.stop.prevent>
                        <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                            <chrome-picker v-model="colors.emissive" @change-color="onEmissiveColorChange" ></chrome-picker>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui inverted accordion">
            <div class="title active accordion-header noselect">
                <i class="dropdown icon"></i> Textures
            </div>
            <div class="content active">
                <div class="ui inverted segment">
                    <h4 class="ui horizontal inverted divider">
                        Diffuse
                    </h4>
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Texture <i class="icon texture-icon-right remove" v-show="hasDiffuse" @click="removeDiffuseTexture()"></i>
                        </div>
                        <div class="ui tiny floating dropdown inverted fluid button">
                            <div class="text" v-if="hasDiffuse">{{diffuseTextureName}}</div>
                            <div class="text" v-if="!hasDiffuse">Select</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <a class="item" v-for="texture in textures" :value="texture.name" @click="setDiffuseTexture(texture)">
                                    {{basename(texture.name)}}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasDiffuse">
                        <div class="ui black label fixed noselect" style="width:50%">
                            uScale
                        </div>
                        <input
                            type="number"
                            name="diffuseUScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.diffuseTexture.uScale"
                            @mousemove="setDiffuseUScale"
                            @input="setDiffuseUScale"
                            @mouseup="editing = false"
                            title="Set diffuse U axis scale">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasDiffuse">
                        <div class="ui black label fixed noselect" style="width:50%">
                            vScale
                        </div>
                        <input
                            type="number"
                            name="diffuseVScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.diffuseTexture.vScale"
                            @mousemove="setDiffuseVScale"
                            @input="setDiffuseVScale"
                            @mouseup="editing = false"
                            title="Set diffuse V axis scale">
                    </div>
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
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasBump">
                        <div class="ui black label fixed noselect" style="width:50%">
                            uScale
                        </div>
                        <input
                            type="number"
                            name="bumpUScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.bumpTexture.uScale"
                            @mousemove="setBumpUScale"
                            @input="setBumpUScale"
                            @mouseup="editing = false"
                            title="Set bump U axis scale">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasBump">
                        <div class="ui black label fixed noselect" style="width:50%">
                            vScale
                        </div>
                        <input
                            type="number"
                            name="bumpVScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.bumpTexture.vScale"
                            @mousemove="setBumpVScale"
                            @input="setBumpVScale"
                            @mouseup="editing = false"
                            title="Set bump V axis scale">
                    </div>
                    <h4 class="ui horizontal inverted divider">
                        Specular
                    </h4>
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Texture <i class="icon texture-icon-right remove" v-if="hasSpecular" @click="removeSpecularTexture()"></i>
                        </div>
                        <div class="ui tiny floating dropdown inverted fluid button">
                            <div class="text" v-if="hasSpecular">{{specularTextureName}}</div>
                            <div class="text" v-if="!hasSpecular">Select</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <a class="item" v-for="texture in textures" :value="texture.name" @click="setSpecularTexture(texture)">
                                    {{basename(texture.name)}}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasSpecular">
                        <div class="ui black label fixed noselect" style="width:50%">
                            uScale
                        </div>
                        <input
                            type="number"
                            name="specularUScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.specularTexture.uScale"
                            @mousemove="setSpecularUScale"
                            @input="setSpecularUScale"
                            @mouseup="editing = false"
                            title="Set specular U axis scale">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasSpecular">
                        <div class="ui black label fixed noselect" style="width:50%">
                            vScale
                        </div>
                        <input
                            type="number"
                            name="specularVScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.specularTexture.vScale"
                            @mousemove="setSpecularVScale"
                            @input="setSpecularVScale"
                            @mouseup="editing = false"
                            title="Set specular V axis scale">
                    </div>
                    <h4 class="ui horizontal inverted divider">
                        Ambient
                    </h4>
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Texture <i class="icon texture-icon-right remove" v-if="hasAmbient"  @click="removeAmbientTexture()"></i>
                        </div>
                        <div class="ui tiny floating dropdown inverted fluid button">
                            <div class="text" v-if="hasAmbient">{{ambientTextureName}}</div>
                            <div class="text" v-if="!hasAmbient">Select</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <a class="item" v-for="texture in textures" :value="texture.name" @click="setAmbientTexture(texture)">
                                    {{basename(texture.name)}}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasAmbient">
                        <div class="ui black label fixed noselect" style="width:50%">
                            uScale
                        </div>
                        <input
                            type="number"
                            name="ambientUScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.ambientTexture.uScale"
                            @mousemove="setAmbientUScale"
                            @input="setAmbientUScale"
                            @mouseup="editing = false"
                            title="Set ambient U axis scale">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasAmbient">
                        <div class="ui black label fixed noselect" style="width:50%">
                            vScale
                        </div>
                        <input
                            type="number"
                            name="ambientVScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.ambientTexture.vScale"
                            @mousemove="setAmbientVScale"
                            @input="setAmbientVScale"
                            @mouseup="editing = false"
                            title="Set ambient V axis scale">
                    </div>
                    <h4 class="ui horizontal inverted divider">
                        Emissive
                    </h4>
                    <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit">
                        <div class="ui black label fixed noselect" style="width: 50%">
                            Texture <i class="icon texture-icon-right remove" v-if="hasEmissive" @click.stop.prevent="removeEmissiveTexture()"></i>
                        </div>
                        <div class="ui tiny floating dropdown inverted fluid button">
                            <div class="text" v-if="hasEmissive">{{emissiveTextureName}}</div>
                            <div class="text" v-if="!hasEmissive">Select</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <a class="item" v-for="texture in textures" :value="texture.name" @click="setEmissiveTexture(texture)">
                                    {{basename(texture.name)}}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasEmissive">
                        <div class="ui black label fixed noselect" style="width:50%">
                            uScale
                        </div>
                        <input
                            type="number"
                            name="emissiveUScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.emissiveTexture.uScale"
                            @mousemove="setEmissiveUScale"
                            @input="setEmissiveUScale"
                            @mouseup="editing = false"
                            title="Set emissive U axis scale">
                    </div>
                    <div class="ui inverted mini right fluid labeled input input-transform" v-if="hasEmissive">
                        <div class="ui black label fixed noselect" style="width:50%">
                            vScale
                        </div>
                        <input
                            type="number"
                            name="emissiveVScale"
                            class="input-draggable"
                            min="0"
                            step="0.01"
                            v-input-draggable
                            v-model="object.material.emissiveTexture.vScale"
                            @mousemove="setEmissiveVScale"
                            @input="setEmissiveVScale"
                            @mouseup="editing = false"
                            title="Set emissive V axis scale">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
import path from 'path'
import {Chrome} from 'vue-color'
export default
{
    name:'standard-material',
    data()
    {
        return {
            editing: false,
            hasDiffuse: false,
            hasAmbient: false,
            hasBump: false,
            hasSpecular: false,
            hasEmissive: false,
            diffuseTextureName: '',
            ambientTextureName: '',
            bumpTextureName: '',
            specularTextureName: '',
            emissiveTextureName: '',
            show: {
                diffuse: false,
                specular: false,
                ambient: false,
                emissive: false
            },
            colors: {
                diffuse: {hex: '#194d33'},
                specular: {hex: '#194d33'},
                ambient: {hex: '#194d33'},
                emissive: {hex: '#194d33'}
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
    created()
    {
        if(this.object) {
            if(this.object.material && typeof this.object.material.diffuseColor != 'undefined') {

                this.colors.diffuse.hex = this.object.material.diffuseColor.toHexString()
                this.colors.specular.hex = this.object.material.specularColor.toHexString()
                this.colors.ambient.hex = this.object.material.ambientColor.toHexString()
                this.colors.emissive.hex = this.object.material.emissiveColor.toHexString()
            }
        }

        let self = this;
        window.document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
            self.show.diffuse = false;
            self.show.specular = false;
            self.show.ambient = false;
            self.show.emissive = false;
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
        setDiffuseTexture(texture) {
            this.object.material.diffuseTexture = texture.data;
            this.diffuseName = path.basename(texture.data.url);
            this.hasDiffuse = true;
        },
        setDiffuseUScale() {
            this.editing = true;
            this.object.material.diffuseTexture.uScale = parseFloat(window.$('input[name="diffuseUScale"]').val())
        },
        setDiffuseVScale() {
            this.editing = true;
            this.object.material.diffuseTexture.vScale = parseFloat(window.$('input[name="diffuseVScale"]').val())
        },
        setBumpTexture(texture) {
            this.object.material.bumpTexture = texture.data;
            console.log(texture)
            this.bumpName = path.basename(texture.data.url);
            this.hasBump = true
        },
        setBumpUScale() {
            this.editing = true;
            this.object.material.bumpTexture.uScale = parseFloat(window.$('input[name="bumpUScale"]').val())
        },
        setBumpVScale() {
            this.editing = true;
            this.object.material.bumpTexture.vScale = parseFloat(window.$('input[name="bumpVScale"]').val())
        },
        setSpecularTexture(texture) {
            this.object.material.specularTexture = texture.data;
            this.specularName = path.basename(texture.data.url);
            this.hasSpecular = true;
        },
        setSpecularUScale() {
            this.editing = true;
            this.object.material.specularTexture.uScale = parseFloat(window.$('input[name="specularUScale"]').val())
        },
        setSpecularVScale() {
            this.editing = true;
            this.object.material.specularTexture.vScale = parseFloat(window.$('input[name="specularVScale"]').val())
        },
        setAmbientTexture(texture) {
            this.object.material.ambientTexture = texture.data;
            this.ambientName = path.basename(texture.data.url);
            this.hasAmbient = true;
        },
        setAmbientUScale() {
            this.editing = true;
            this.object.material.ambientTexture.uScale = parseFloat(window.$('input[name="ambientUScale"]').val())
        },
        setAmbientVScale() {
            this.editing = true;
            this.object.material.ambientTexture.vScale = parseFloat(window.$('input[name="ambientVScale"]').val())
        },
        setEmissiveTexture(texture) {
            this.object.material.emissiveTexture = texture.data;
            this.emissiveName = path.basename(texture.data.url);
            this.hasEmissive = true;
        },
        setEmissiveUScale() {
            this.editing = true;
            this.object.material.emissiveTexture.uScale = parseFloat(window.$('input[name="emissiveUScale"]').val())
        },
        setEmissiveVScale() {
            this.editing = true;
            this.object.material.emissiveTexture.vScale = parseFloat(window.$('input[name="emissiveVScale"]').val())
        },
        removeDiffuseTexture() {
            this.object.material.diffuseTexture = undefined;
            this.hasDiffuse = false;
            this.diffuseTextureName = '';
        },
        removeSpecularTexture() {
            this.object.material.specularTexture = undefined;
            this.hasSpecular = false;
            this.specularTextureName = '';
        },
        removeBumpTexture() {
            this.object.material.bumpTexture = undefined;
            this.hasBump = false;
            this.bumpTextureName = '';
        },
        removeAmbientTexture() {
            this.object.material.ambientTexture = undefined;
            this.hasAmbient = false;
            this.ambientTextureName = '';
        },
        removeEmissiveTexture() {
            this.object.material.emissiveTexture = undefined;
            this.hasEmissive = false;
            this.emissiveTextureName = '';
        },
        toggleBackFaceCulling() {
            if(this.object.material.backFaceCulling == 0)
                this.object.material.backFaceCulling = 1;
            else
                this.object.material.backFaceCulling = 0;
        },
        onDiffuseColorChange(color) {
            this.object.material.diffuseColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.diffuse = color
        },
        onSpecularColorChange(color) {
            this.object.material.specularColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.specular = color
        },
        onAmbientColorChange(color) {
            this.object.material.ambientColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.ambient = color
        },
        onEmissiveColorChange(color) {
            this.object.material.emissiveColor = BABYLON.Color3.FromHexString(color.hex);
            this.colors.emissive = color
        }
    },
    watch:
    {
        'object.name': function(v)
        {
            this.closePickers();
            this.hasDiffuse = false;
            this.hasBump = false;
            this.hasSpecular = false;
            this.hasEmissive = false;
            this.hasAmbient = false;
            this.diffuseTextureName = '';
            this.bumpTextureName = '';
            this.specularTextureName = '';
            this.ambientTextureName = '';
            this.emissiveTextureName = '';

            if(this.object.material)
            {
                this.hasDiffuse = typeof this.object.material.diffuseTexture != 'undefined';
                this.hasBump = typeof this.object.material.bumpTexture != 'undefined';
                this.hasSpecular = typeof this.object.material.specularTexture != 'undefined';
                this.hasEmissive = typeof this.object.material.emissiveTexture != 'undefined';
                this.hasAmbient = typeof this.object.material.ambientTexture != 'undefined';

                if(this.hasDiffuse)
                    this.diffuseTextureName = path.basename(this.object.material.diffuseTexture.url);
                if(this.hasBump)
                    this.bumpTextureName = path.basename(this.object.material.bumpTexture.url);
                if(this.hasSpecular)
                    this.specularTextureName = path.basename(this.object.material.specularTexture.url);
                if(this.hasEmissive)
                    this.emissiveTextureName = path.basename(this.object.material.emissiveTexture.url);
                if(this.hasAmbient)
                    this.ambientTextureName = path.basename(this.object.material.ambientTexture.url);
            }
        },
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
