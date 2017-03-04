<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div style="padding: 15px;">
            <button class="ui labeled fluid inverted icon button" style="margin-bottom: 15px;" @click.prevent="addTexture()"  id="add_texture">
                <i class="plus icon"></i>
                Add texture
            </button>

            <div class="ui inverted segment textures-list">
                <div class="ui inverted relaxed divided list">
                    <div class="item texture-item-list"
                         v-for="(texture, index) in textures"
                         @click="setCurrent(index)"
                         :class="{active: current == index}">
                        <div class="content">
                            <div class="header">
                                <div class="ui transparent inverted input texture-name">
                                    <input type="text" v-model="texture.name">
                                </div>
                                <button class="mini ui inverted icon button"
                                        @click.stop.prevent="removeTexture(index)"
                                        style="display: inline-block;padding: 0.3em 0.2em;float:right">
                                    <i class="remove grey floated right icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form class="ui inverted form" v-if="currentTexture">
                <div class="ui inverted segment grid">
                    <div class="eleven wide column" style="padding:0;background:black;overflow: hidden;">
                        <div style="width: 100%;position: relative;">
                            <img :src="currentTextureData" style="width: 100%;margin: 0 auto;display:block;border-top-left-radius: 3px;border-bottom-left-radius: 3px;" class="noselect">
                        </div>
                        <div class="ui dimmer" :class="{active: loading}">
                            <div class="ui loader"></div>
                        </div>
                    </div>
                    <div class="one wide column" style="margin-left: 10px;">
                        <div class="ui icon vertical buttons">
                            <button class="ui inverted button" @click.stop.prevent>
                                <i class="zoom icon" style="margin:0"></i>
                            </button>
                            <button class="ui inverted button" @click.stop.prevent>
                                <i class="zoom out icon" style="margin:0"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="ui inverted mini fluid labeled input input-transform right">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Size
                    </div>
                    <input
                        type="text"
                        readonly
                        :value="currentTexture.data._texture._width+'x'+currentTexture.data._texture._height"
                        title="Object name">
                </div>
                <div class="ui inverted mini fluid labeled input input-transform checkbox"
                     v-if="typeof currentTexture.data.hasAlpha  != 'undefined'"
                     @click.stop="toggleDiffuseAlpha()">
                    <div class="ui black label fixed noselect" style="width:50%">
                        Use alpha
                    </div>
                    <span class="input-slider-text noselect" style="width: 68px"></span>
                    <input type="checkbox" tabindex="0" class="hidden" :checked="currentTexture.data.hasAlpha  == 1" title="Toggle back faces culling">
                </div>
            </form>
        </div>
    </div>
</template>
<script type="text/babel">
import path from 'path'
//const {dialog} = require('electron').remote;
export default {
    name: 'Texture',
    data(){
        return {
            current: null,
            loading: false,
            currentTextureData: null
        }
    },
    computed: {
        currentTexture() {
            if(typeof this.textures[this.current] != 'undefined')
                return this.textures[this.current];
            return null;
        },
    },
    updated() {
        window.refreshSemanticUi()
    },
    methods:
    {
        toggleDiffuseAlpha() {
            if(this.currentTexture.data.hasAlpha  == 1)
                this.currentTexture.data.hasAlpha  = 0;
            else
                this.currentTexture.data.hasAlpha  = 1;
        },
        setCurrent(index) {
            this.current = index;
            let self = this;
            let image = new Image();
            self.loading = true;
            image.onload = function() {
                self.loading = false;
                self.currentTextureData = this.src;
            };
            image.src = this.textures[this.current].data.url
        },
        removeTexture(index)
        {
            let url = this.textures[index].data.url;
            let toRemove = this.scene.textures.find(t => t.url == url);

            if(toRemove)
            {
                toRemove.dispose();
                this.textures.splice(index, 1);

                if(this.current == index)
                    this.currentTextureData = null;
                if(this.textures.length > 0)
                    this.setCurrent(this.textures.length - 1)
                else
                    this.current = null;
            }
        },
        addTexture() {
            $('#add_texture').blur()
//            dialog.showOpenDialog(
//            {
//                properties: ['openFile'],
//                filters: [
//                    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
//                    {name: 'All Files', extensions: ['*']}
//                ]
//            },
//            file =>
//            {
//                if(typeof file != 'undefined')
//                {
//                    let texture = new BABYLON.Texture(file[0], this.scene);
//                    let index = this.textures.push({
//                        name: path.basename(texture.name),
//                        data: texture
//                    });
//
//                    this.setCurrent(index - 1);
//                }
//            })
        }
    },
    props: {
        scene: Object,
        textures:
        {
            type: Array,
            default: () => []
        }
    }
}
</script>
