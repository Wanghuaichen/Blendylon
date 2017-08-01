<template>
    <div class="viewport_toolbar">
        <div class="ui inverted black tiny menu">
            <div class="ui inverted black bottom pointing dropdown item" v-if="camera">
                View <i class="dropdown icon"></i>
                <div class="menu" style="width:15rem;">
                    <a class="item" @click="viewSelected()">
                        View selected
                        <span class="description">NUMPAD .</span>
                    </a>
                    <div class="ui inverted divider"></div>
                    <a class="item" @click="setView('left')">
                        Left
                        <span class="description">Numpad 4</span>
                    </a>
                    <a class="item" @click="setView('right')">
                        Right
                        <span class="description">Numpad 3</span>
                    </a>
                    <a class="item" @click="setView('back')">
                        Back
                        <span class="description">Ctrl Numpad 1</span>
                    </a>
                    <a class="item" @click="setView('front')">
                        Front
                        <span class="description">Numpad 1</span>
                    </a>
                    <a class="item" @click="setView('bottom')">
                        Bottom
                        <span class="description">Ctrl Numpad 7</span>
                    </a>
                    <a class="item" @click="setView('top')">
                        Top
                        <span class="description">Numpad 7</span>
                    </a>
                    <a class="item" @click="">
                        Camera
                        <span class="description">Numpad 0</span>
                    </a>
                </div>
            </div>
            <div class="ui bottom pointing dropdown item">
                Select <i class="dropdown icon"></i>
                <div class="menu">
                    <!--<a class="item" @click="selection.clear()">-->
                        <!--Deselect all-->
                    <!--</a>-->
                </div>
            </div>
            <div class="ui bottom pointing dropdown item">
                Object <i class="dropdown icon"></i>
                <div class="menu">
                    <!--<a class="item" :class="{disabled: selection == {}}" @click="selection.remove()">-->
                        <!--Delete-->
                    <!--</a>-->
                </div>
            </div>
            <div class="right menu">
                <span data-tooltip="Make viewport screenshot" data-inverted="" data-variation="mini">
                    <a class="ui item">
                        <i class="photo icon"></i>
                    </a>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default
    {
        computed : mapGetters({
            camera       : 'getCurrentCamera',
            currentScene : 'getCurrentScene'
        }),
        methods  : {
            ...mapActions({
                setViewportCameraView : 'setViewportCameraView'
            }),
            setView(view) {
                this.setViewportCameraView({
                    view    : view,
                    sceneId : this.currentScene.id,
                    scene   : this.currentScene
                })
            },
            viewSelected()
            {
//                if(this.selection.selected !== {}
//                        && typeof this.selection.selected.position !== 'undefined') {
//                }
//                //                this.camera.centerTo(this.selection.selected.position.clone())
            }
        }
    }
</script>
