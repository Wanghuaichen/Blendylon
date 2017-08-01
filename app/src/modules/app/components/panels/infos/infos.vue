<template>

        <!--<small class="topbar_stats">-->
        <!--<span class="text-muted">v{{version}}</span>-->
        <!--<span class="text-muted">{{stats.vertices-2>1 ? 'Vertices' : 'Vertex'}}: {{stats.vertices - 2}}</span>-->
        <!--<span class="text-muted">Mesh{{stats.meshes>1 ? 'es' : ''}}: {{stats.meshes}}</span>-->
        <!--<span class="text-muted">Light{{stats.lights>1 ? 's' : ''}}: {{stats.lights}}</span>-->
        <!--</small>-->
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
