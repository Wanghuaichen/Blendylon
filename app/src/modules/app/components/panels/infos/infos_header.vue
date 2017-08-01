<template>
    <div class="full-height full-width">
        <div class="ui top pointing dropdown item" v-for="item in menu" style="float:left">
            {{item.name}} <i class="dropdown icon"></i>
            <div class="menu" v-if="item.children.length > 0" style="width:15rem;">
                <a class="item" v-for="child in item.children" v-if="!child.separator" @click.prevent="">
                    {{child.name}}
                    <span class="description" v-if="child.description">
                        {{child.description}}
                    </span>
                </a>
                <div class="ui inverted divider" v-else></div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
var version = require('json!../../../../../../../package.json').version;
export default{
    mounted() {
        this.version = version;
//        this.stats = this.$children[0].stats;
    },
    data(){
        return {
            stats: {},
            version: '',
            menu: [
                {
                    name: "File",
                    children: [
                        {name: "New", icon: "", description: "CTRL N"},
                        {name: "Open...", icon: "", description: "CTRL O"},
                        {
                            name: "Open recent...",
                            icon: ""
                        },
                        {separator: true},
                        {name: "Save", icon: ""},
                        {name: "Save as...", icon: ""},
                        {separator: true},
                        {name: "Preferences...", icon: ""},
                        {separator: true},
                        {
                            name: "Import",
                            icon: ""
                        },
                        {
                            name: "Export",
                            icon: ""
                        },
                        {separator: true},
                        {name: "Quit", icon: ""}
                    ]
                },
                {
                    name: "Game",
                    children: []
                },
                {
                    name: "Help",
                    children: []
                }
            ]
        }
    }
}
</script>
