<template>
    <div class="ui inverted accordion" style="padding: 15px;">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Scenes
        </div>
        <div class="content active">
            <button class="ui labeled fluid inverted icon button" style="margin-bottom: 15px;"  @click="addNewScene" id="add_scene">
                <i class="plus icon"></i>
                Add scene
            </button>

            <div class="ui inverted segment textures-list">
                <div class="ui inverted relaxed divided list">
                    <div class="item texture-item-list"
                         v-for="(scn, index) in scenes" v-if="scenes.length > 0">
                        <div class="content">
                            <div class="header">
                                <button
                                    @click="switchCurrentScene(scn.id)"
                                    class="mini ui inverted icon button"
                                    style="display: inline;padding: 5px;float:left;width: 9%;margin-right:10px;min-width:27px;">
                                    <i class="eye floated left icon" :class="{
                                        blue: scn.id == currentSceneId,
                                        grey: scn.id != currentSceneId
                                    }"></i>
                                </button>
                                <div class="ui transparent inverted input texture-name" style="display: inline-block;width: 70%;">
                                    <input
                                        type="text"
                                        :value="scn.name"
                                        class="full-width"
                                        :class="{'input-blue-text': scn.id == currentSceneId}">
                                </div>
                                <button
                                    class="mini ui inverted icon button"
                                    @click="deleteSelectedScene(scn.id)"
                                    style="display: inline;padding: 5px;float:right;width: 9%;min-width:27px;">
                                        <i class="remove grey floated right icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Layers
        </div>
        <div class="content active">
            <button class="ui labeled fluid inverted icon button" style="margin-bottom: 15px;">
                <i class="plus icon"></i> Add layer
            </button>
            <div class="ui transparent segment fluid inverted left icon input mini" style="padding: 8px 6px;margin:0">
                <input type="text" value="Layer 1">
                <i class="eye icon" style="margin-left: 10px;"></i>
            </div>
            <div class="ui transparent segment fluid inverted left icon input mini" style="padding: 8px 6px;margin:0">
                <input type="text" value="Layer 1">
                <i class="eye icon" style="margin-left: 10px;"></i>
            </div>
        </div>

        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Statistics
        </div>
        <div class="content active">
            <div class="ui two column grid" >
                <div class="column">
                    <table border="0" style="width: 100%">
                        <tr>
                            <td>Vertices</td>
                            <td style="text-align:right">{{stats.vertices - 2}}</td>
                        </tr>
                        <tr>
                            <td>Meshes</td>
                            <td style="text-align:right">{{stats.meshes}}</td>
                        </tr>
                        <tr>
                            <td>Materials</td>
                            <td style="text-align:right">{{stats.materials}}</td>
                        </tr>
                    </table>
                </div>
                <div class="column">
                    <table border="0" style="width: 100%">
                        <tr>
                            <td>Lights</td>
                            <td style="text-align:right">{{stats.lights}}</td>
                        </tr>
                        <tr>
                            <td>Cameras</td>
                            <td style="text-align:right">{{stats.cameras}}</td>
                        </tr>
                        <tr>
                            <td>Textures</td>
                            <td style="text-align:right">{{stats.textures}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            stats: {}
        }
    },
    methods: {
        ...mapActions({
            addScene: 'addScene',
            deleteScene: 'deleteScene',
            deleteCamera: 'deleteCamera',
            setActiveCamera: 'setActiveCamera',
            switchScene: 'switchScene'
        }),
        addNewScene() {
            this.addScene({
                engine: this.engine,
                canvas: this.canvas
            });
            console.log(this.lastCamera)
            this.setActiveCamera(this.lastCamera);
        },
        deleteSelectedScene(sceneId) {
            this.deleteCamera({sceneId: sceneId});
            this.deleteScene({sceneId: sceneId});
        },
        switchCurrentScene(id) {
            this.switchScene(id)
        }
    },
    computed: mapGetters({
        canvas: 'getCanvas',
        engine: 'getEngine',
        scenes: 'getScenes',
        currentCamera: 'getCurrentCamera',
        lastCamera: 'getLastCamera',
        beforeLastCamera: 'getBeforeLastCamera',
        currentSceneId: 'getCurrentSceneId'
    })
}
</script>
