<template>
    <div style="position:relative;">
        <div class="ui inverted black tiny menu full-height" style="margin: 0">
            <slot name="icon">
                <div class="ui tiny pointing black dropdown button" style="margin: 5px;padding: 6px;height: 25px;">
                    <div style="width:30px;">
                        <img :src="'assets/img/panels/'+currentPanel.name+'.png'" style="max-width: 15px;"><i class="dropdown icon" style="margin:0"></i>
                    </div>
                    <div class="menu">
                        <div v-for="panel in panelsList" :class="{item: !panel.divider, 'ui inverted divider': panel.divider}" @click="setPanel(panel.name)">
                            <span v-if="!panel.divider">
                                <img :src="'assets/img/panels/'+panel.icon" style="margin-right: 7px;"> {{panel.label}}
                            </span>
                        </div>
                    </div>
                </div>
            </slot>
            <slot name="menu"></slot>
        </div>
    </div>
</template>
<script type="text/babel">
export default {
    props: {
        currentPanel: Object
    },
    methods: {
        setPanel(name) {
            this.$parent.setPanel(name)
        }
    },
    data() {
        return {
            panelsList: [
                {name: 'console', label: 'Console', icon: 'console.png'},
                {divider: true},
                {name: 'infos', label: 'Info', icon: 'infos.png'},
                {name: 'properties', label: 'Properties', icon: 'properties.png'},
                {name: 'outliner', label: 'Outliner', icon: 'outliner.png'},
                {divider: true},
                {name: 'images_editor', label: 'Images Editor', icon: 'images_editor.png'},
                {name: 'text_editor', label: 'Text Editor', icon: 'text_editor.png'},
                {name: 'assets_manager', label: 'Assets Manager', icon: 'assets_manager.png'},
                {divider: true},
                {name: 'timeline', label: 'Timeline', icon: 'timeline.png'},
                {name: 'viewport', label: '3D View', icon: 'viewport.png'}
            ]
        }
    },
}
</script>
