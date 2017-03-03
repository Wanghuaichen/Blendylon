<template>
    <div class="viewport_toolbar">
        <div class="ui inverted black tiny menu">
             <span data-tooltip="Toggle tools panel" data-inverted="" data-variation="mini" data-position="right center">
                <a class="ui item" style="width: 50px;" @click="toggleViewportTools()" :class="{active: showTools}">
                    <i class="configure icon"></i>
                </a>
             </span>
            <div class="ui inverted black bottom pointing dropdown item" v-if="camera">
                View <i class="dropdown icon"></i>
                <div class="menu" style="width:15rem;" v-if="typeof camera.setView != 'undefined'">
                    <a class="item" @click="viewSelected()">
                        View selected
                        <span class="description">NUMPAD .</span>
                    </a>
                    <div class="ui inverted divider"></div>
                    <a class="item" @click="camera.setView('left')">
                        Left
                        <span class="description">Numpad 4</span>
                    </a>
                    <a class="item" @click="camera.setView('right')">
                        Right
                        <span class="description">Numpad 3</span>
                    </a>
                    <a class="item" @click="camera.setView('back')">
                        Back
                        <span class="description">Ctrl Numpad 1</span>
                    </a>
                    <a class="item" @click="camera.setView('front')">
                        Front
                        <span class="description">Numpad 1</span>
                    </a>
                    <a class="item" @click="camera.setView('bottom')">
                        Bottom
                        <span class="description">Ctrl Numpad 7</span>
                    </a>
                    <a class="item" @click="camera.setView('top')">
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
                    <a class="item" @click="selection.clear()">
                        Deselect all
                    </a>
                </div>
            </div>
            <div class="ui bottom pointing dropdown item">
                Object <i class="dropdown icon"></i>
                <div class="menu">
                    <a class="item" :class="{disabled: selection == {}}" @click="selection.remove()">
                        Delete
                    </a>
                </div>
            </div>
            <div class="right menu">
                <span data-tooltip="Make viewport screenshot" data-inverted="" data-variation="mini">
                    <a class="ui item" @click="this.$parent.$parent.showModalScreenshot">
                        <i class="photo icon"></i>
                    </a>
                </span>
                <span data-tooltip="Toggle viewport options" data-inverted="" data-variation="mini">
                    <a class="ui item" @click="toggleViewportOptions()" :class="{active: showOptions}">
                        <i class="options icon"></i>
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
    props: {
        selection: Object
    },
    computed: mapGetters({
        showOptions: 'isViewportOptionsVisible',
        showTools: 'isViewportToolsVisible',
        camera: 'getCurrentCamera'
    }),
    methods: {
        ...mapActions({
            toggleViewportOptions: 'toggleViewportOptions',
            toggleViewportTools: 'toggleViewportTools'
        }),
        viewSelected()
        {
           if(this.selection.selected !== {}
           && typeof this.selection.selected.position !== 'undefined') {}
        //                this.camera.centerTo(this.selection.selected.position.clone())
        }
    }
}
</script>
