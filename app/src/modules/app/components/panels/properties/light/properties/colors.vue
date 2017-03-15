<template>
    <div class="ui inverted accordion" v-if="object">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Colors
        </div>
        <div class="content active">
            <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="typeof object.diffuse != 'undefined'">
                <div class="ui black label fixed noselect" style="width: 50%">
                    Diffuse
                </div>
                <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('diffuse')">
                    <div
                        v-if="typeof object.diffuse.toHexString == 'function'"
                        style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                        :style="{background: object.diffuse.toHexString()}">
                    </div>
                </div>
                <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.diffuse" @click.stop.prevent>
                    <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                        <chrome-picker v-model="colors.diffuse" @change-color="onDiffuseColorChange"></chrome-picker>
                    </div>
                </div>
            </div>
            <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="typeof object.specular != 'undefined'">
                <div class="ui black label fixed noselect" style="width: 50%">
                    Specular
                </div>
                <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('specular')">
                    <div
                        v-if="typeof object.specular.toHexString == 'function'"
                        style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                        :style="{background: object.specular.toHexString()}">
                    </div>
                </div>
                <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.specular" @click.stop.prevent>
                    <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                        <chrome-picker v-model="colors.specular" @change-color="onSpecularColorChange"></chrome-picker>
                    </div>
                </div>
            </div>
            <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit" v-if="typeof object.ground != 'undefined'">
                <div class="ui black label fixed noselect" style="width: 50%">
                    Ground
                </div>
                <div style="display:block; width: 100%; height: 30px;position: relative;float: left;" @click.stop.prevent="showPicker('ground')">
                    <div
                        v-if="typeof object.ground.toHexString == 'function'"
                        style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
                        :style="{background: object.ground.toHexString()}">
                    </div>
                </div>
                <div style="position: relative;float: left; clear: left;z-index: 999" class="picker_container" v-show="show.ground" @click.stop.prevent>
                    <div class="colorPicker" style="position: absolute;top: 32px;right:0;">
                        <chrome-picker v-model="colors.ground" @change-color="onGroundColorChange"></chrome-picker>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
import path from 'path'
import {Chrome} from 'vue-color'
import {mapGetters, mapActions} from 'vuex'
export default{
    name: 'light_colors',
    data() {
        return {
            show: {
                diffuse: false,
                specular: false,
                ground: false
            },
            colors: {
                diffuse: {hex: '#194d33'},
                specular: {hex: '#194d33'},
                ground: {hex: '#194d33'}
            }
        }
    },
    props: {
        object: Object
    },
    created() {
        if(typeof this.object != 'undefined') {
            if(typeof this.object.diffuse != 'undefined')
                this.colors.diffuse.hex = this.object.diffuse.toHexString()
            if(typeof this.object.specular != 'undefined')
                this.colors.specular.hex = this.object.specular.toHexString()
            if(typeof this.object.ground != 'undefined')
                this.colors.ground.hex = this.object.ground.toHexString()
        }

        let self = this;
        window.document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
            self.show.diffuse = false;
            self.show.specular = false;
            self.show.ground = false;
        })
    },
    methods: {
        ...mapActions({
            setLightDiffuseColor: 'setLightDiffuseColor',
            setLightSpecularColor: 'setLightSpecularColor',
            setLightGroundColor: 'setLightGroundColor'
        }),
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
        onDiffuseColorChange(color) {
            this.setLightDiffuseColor({
                lightId: this.object.id,
                color: new BABYLON.Color3.FromHexString(color.hex)
            });
            this.colors.diffuse = color
        },
        onSpecularColorChange(color) {
            this.setLightSpecularColor({
                lightId: this.object.id,
                color: new BABYLON.Color3.FromHexString(color.hex)
            });
            this.colors.specular = color
        },
        onGroundColorChange(color) {
            this.setLightGroundColor({
                lightId: this.object.id,
                color: new BABYLON.Color3.FromHexString(color.hex)
            });
            this.colors.ground = color
        },
    },
    components: {
        'chrome-picker': Chrome
    }
}
</script>
