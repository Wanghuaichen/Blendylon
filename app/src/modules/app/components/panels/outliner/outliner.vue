<template>
    <div class="row full-height">
        <div class="ui tiny menu inverted" id="outliner_search" style="border-bottom: 1px solid rgba(255,255,255,0.1);border-top: 1px solid rgba(255,255,255,0.1);margin-top: 0;margin-bottom: -1px;">
            <div class="item" style="border:none">
                <i class="list icon"></i>
                Outliner
            </div>
            <div class="right menu">
                <div class="ui right aligned category inverted search item">
                    <div class="ui transparent inverted icon input">
                        <input class="prompt" type="text" placeholder="Filter scene...">
                        <i class="search link icon"></i>
                    </div>
                    <div class="results"></div>
                </div>
            </div>
        </div>

        <!--<div class="treemenu"  id="outliner_list">-->
        <!--<div class="ui fluid styled accordion">-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 1-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--<div class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel euismod purus. Donec nec tempor lorem, et consequat tellus. Sed id consequat nibh. Praesent a posuere mi. Ut gravida feugiat diam, non accumsan risus facilisis et. Donec ullamcorper-->
        <!--facilisis magna a accumsan. Duis varius purus in dapibus interdum. Aenean a felis sit amet lectus interdum venenatis in imperdiet sapien. Sed at leo maximus, blandit orci ac, viverra orci.</div>-->
        <!--<div class="accordion">-->
        <!--<div class="active title">-->
        <!--<i class="dropdown icon"></i> Level 1A-->
        <!--</div>-->
        <!--<div class="active content">-->
        <!--<div class="subtitle">Level 1A Subtitles</div>-->
        <!--<div class="accordion">-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 1A-A-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 1A-A Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 1A-B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 1A-B Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 1B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 1B Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 1C-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 1C Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 2-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--<div class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel euismod purus. Donec nec tempor lorem, et consequat tellus. Sed id consequat nibh. Praesent a posuere mi. Ut gravida feugiat diam, non accumsan risus facilisis et. Donec ullamcorper-->
        <!--facilisis magna a accumsan. Duis varius purus in dapibus interdum. Aenean a felis sit amet lectus interdum venenatis in imperdiet sapien. Sed at leo maximus, blandit orci ac, viverra orci.</div>-->
        <!--<div class="accordion">-->
        <!--<div class="active title">-->
        <!--<i class="dropdown icon"></i> Level 2A-->
        <!--</div>-->
        <!--<div class="active content">-->
        <!--<div class="subtitle">Level 2A Subtitles</div>-->
        <!--<div class="accordion">-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 2A-A-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 2A-A Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 2A-B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 2A-B Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 2B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 2B Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 2C-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 2C Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 3-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--<div class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel euismod purus. Donec nec tempor lorem, et consequat tellus. Sed id consequat nibh. Praesent a posuere mi. Ut gravida feugiat diam, non accumsan risus facilisis et. Donec ullamcorper-->
        <!--facilisis magna a accumsan. Duis varius purus in dapibus interdum. Aenean a felis sit amet lectus interdum venenatis in imperdiet sapien. Sed at leo maximus, blandit orci ac, viverra orci.</div>-->
        <!--<div class="accordion">-->
        <!--<div class="active title">-->
        <!--<i class="dropdown icon"></i> Level 3A-->
        <!--</div>-->
        <!--<div class="active content">-->
        <!--<div class="subtitle">Level 3A Subtitles</div>-->
        <!--<div class="accordion">-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 3A-A-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 3A-A Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 3A-B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 3A-B Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 3B-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 3B Contents-->
        <!--</div>-->
        <!--<div class="title">-->
        <!--<i class="dropdown icon"></i> Level 3C-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--Level 3C Contents-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="ui inverted accordion" id="outliner_list" style="padding-bottom: 15px;height:calc(100% - 35px);border-bottom: 1px solid rgba(255,255,255,0.1);" v-if="currentScene">
            <div class="title active noselect">
                <i class="dropdown icon"></i> {{currentScene.name}}
            </div>
            <div class="content active">
                <div class="ui list inverted" style="margin-left:23px;">
                    <div class="item" v-for="camera in actors.cameras" v-if="!camera.type.match(/viewport/)">
                        <div class="content">
                            <div class="header noselect">
                                <i class="icon"><img src="assets/img/primitives/camera.png" class="light-icon"></i>
                                <span class="ui header noselect" v-bind:class="{orange : selection.name == camera.name}" @click="select(camera)">{{camera.name}}</span>
                                <span style="float:right">
                                        <i class="eye icon"></i>
                                        <i class="photo icon"></i>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-for="light in currentScene.lights" v-if="!light.type.match(/viewport/)">
                        <div class="content">
                            <div class="header noselect">
                                <i class="icon"><img src="assets/img/primitives/light.png" class="light-icon"></i>
                                <span class="ui header noselect" v-bind:class="{orange : selection !== {} && selection.name == light.name}" @click="select(light)">{{light.name}}</span>
                                <span style="float:right">
                                    <i class="eye icon"></i>
                                    <i class="photo icon"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-for="object in currentScene.meshes" v-if="!object.type.match(/viewport/)">
                        <div class="content">
                            <div class="header text noselect">
                                <i class="icon"><img src="assets/img/primitives/mesh.png" class="light-icon"></i>
                                <span class="ui header noselect" v-bind:class="{orange : selection !== {} && selection.name == object.name}"  @click="select(object)">{{object.name}}</span>
                                <span style="float:right">
                                    <i class="eye icon"></i>
                                    <i class="photo icon"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props:
    {
        actors: Object,
        selection: Object
    },
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
