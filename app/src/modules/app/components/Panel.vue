<template>
    <div class="panel-container" :style="model.style.container" :id="'panel_container_' + model.id">
        <div class="ui-panel" v-if="model.children.length == 0">
            <div class="ui-panel-content">
                <div class="ui-panel-header" :class="{
                    'ui-panel-header-top': model.header == 'top',
                    'ui-panel-header-bottom': model.header == 'bottom'
                }">
                    <panel-header :currentPanel="model">
                        <div slot="menu">
                            <component :is="model.name+'_header'" :model="model"></component>
                        </div>
                    </panel-header>

                </div>
                <div class="ui-panel-body" :class="{
                    'ui-panel-body-top': model.header == 'bottom',
                    'ui-panel-body-bottom': model.header == 'top'
                }">
                    <keep-alive include="viewport">
                        <component :is="model.name" :model="model"></component>
                    </keep-alive>
                </div>
            </div>
            <div class="resize-strip-top-right"></div>
            <div class="resize-strip-bottom-left"></div>
        </div>
        <div
            class="noselect"
            :class="{
                'ui-drag-handler-vertical'   : model.type == 'vertical',
                'ui-drag-handler-horizontal' : model.type == 'horizontal'
            }"
            v-ui-drag-handler="getDragHandlerOption(model)">
        </div>
        <panel
            v-if="model.children"
            v-for="model in model.children"
            :model="model">
        </panel>
    </div>
</template>

<script type="text/babel">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
import PanelHeader from './Panel_header.vue'

import Console       from './panels/console/console.vue'
import AssetsManager from './panels/assets_manager/assets_manager.vue'
import Outliner      from './panels/outliner/outliner.vue'
import Properties    from './panels/properties/properties.vue'
import Timeline      from './panels/timeline/timeline.vue'
import Viewport      from './panels/viewport/viewport.vue'
import Infos         from './panels/infos/infos.vue'
import TextEditor    from './panels/text_editor/text_editor.vue'
import ImagesEditor  from './panels/images_editor/images_editor.vue'

import ConsoleHeader       from './panels/console/console_header.vue'
import AssetsManagerHeader from './panels/assets_manager/assets_manager_header.vue'
import OutlinerHeader      from './panels/outliner/outliner_header.vue'
import PropertiesHeader    from './panels/properties/properties_header.vue'
import TimeLineHeader      from './panels/timeline/timeline_header.vue'
import ViewportHeader      from './panels/viewport/viewport_header.vue'
import InfosHeader         from './panels/infos/infos_header.vue'
import TextEditorHeader    from './panels/text_editor/text_editor_header.vue'
import ImagesEditorHeader  from './panels/images_editor/images_editor_header.vue'

export default
{
    name: 'Panel',
    props: {
        model: Object
    },
    computed: {
        ...mapGetters({
            engine         : 'getEngine',
            currentScene   : 'getCurrentScene',
            currentLayout: 'getCurrentLayout'
        })
    },
    methods: {
        setPanel(name) {
            if(typeof name !== 'undefined') {
                Vue.set(this.model, 'name', name);
                window.refreshSemanticUi()
            }
        },
        getDragHandlerOption(panel) {
            let a = 'panel_container_' + panel.id;
            let b = 'panel_container_' + panel.parent;

            if(panel.type == 'vertical')
                return [panel.type, a, b]
            else
                return [panel.type, b, a]
        }
    },
    components: {
        PanelHeader : PanelHeader,

        console        : Console,
        assets_manager : AssetsManager,
        outliner       : Outliner,
        properties     : Properties,
        timeline       : Timeline,
        viewport       : Viewport,
        infos          : Infos,
        images_editor  : ImagesEditor,
        text_editor    : TextEditor,

        console_header        : ConsoleHeader,
        assets_manager_header : AssetsManagerHeader,
        outliner_header       : OutlinerHeader,
        properties_header     : PropertiesHeader,
        timeline_header       : TimeLineHeader,
        viewport_header       : ViewportHeader,
        infos_header          : InfosHeader,
        images_editor_header  : ImagesEditorHeader,
        text_editor_header    : TextEditorHeader
    }
}
</script>
