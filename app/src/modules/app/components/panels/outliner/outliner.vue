<template>
    <div class="row full-height">



        <!--<div class="ui inverted accordion" id="outliner_list" style="padding-bottom: 15px;height:calc(100% - 35px);border-bottom: 1px solid rgba(255,255,255,0.1);" v-if="currentScene">-->
            <!--<div class="title active noselect">-->
                <!--<i class="dropdown icon"></i> {{currentScene.name}}-->
            <!--</div>-->
            <!--<div class="content active">-->
                <!--<div class="ui list inverted" style="margin-left:23px;">-->
                    <!--<div class="item" v-for="camera in actors.cameras" v-if="!camera.type.match(/viewport/)">-->
                        <!--<div class="content">-->
                            <!--<div class="header noselect">-->
                                <!--<i class="icon"><img src="assets/img/primitives/camera.png" class="light-icon"></i>-->
                                <!--<span class="ui header noselect" v-bind:class="{orange : selection.name == camera.name}" @click="select(camera)">{{camera.name}}</span>-->
                                <!--<span style="float:right">-->
                                        <!--<i class="eye icon"></i>-->
                                        <!--<i class="photo icon"></i>-->
                                    <!--</span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item" v-for="light in currentScene.lights" v-if="!light.type.match(/viewport/)">-->
                        <!--<div class="content">-->
                            <!--<div class="header noselect">-->
                                <!--<i class="icon"><img src="assets/img/primitives/light.png" class="light-icon"></i>-->
                                <!--<span class="ui header noselect" v-bind:class="{orange : selection !== {} && selection.name == light.name}" @click="select(light)">{{light.name}}</span>-->
                                <!--<span style="float:right">-->
                                    <!--<i class="eye icon"></i>-->
                                    <!--<i class="photo icon"></i>-->
                                <!--</span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item" v-for="object in currentScene.meshes" v-if="!object.type.match(/viewport/)">-->
                        <!--<div class="content">-->
                            <!--<div class="header text noselect">-->
                                <!--<i class="icon"><img src="assets/img/primitives/mesh.png" class="light-icon"></i>-->
                                <!--<span class="ui header noselect" v-bind:class="{orange : selection !== {} && selection.name == object.name}"  @click="select(object)">{{object.name}}</span>-->
                                <!--<span style="float:right">-->
                                    <!--<i class="eye icon"></i>-->
                                    <!--<i class="photo icon"></i>-->
                                <!--</span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    created() {
//        console.log(this.objects)
    },
    computed: mapGetters({
        currentScene: 'getCurrentScene',
        objects: 'objects',
        cameras: 'cameras',
        lights: 'lights'
    }),
    methods:
    {
        select(entity) {
            this.$parent.selection.set(entity, this.currentScene);
        }
    }
}
</script>
