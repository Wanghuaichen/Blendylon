<template>
    <div id="tools_list" v-show="showViewportTools">
        <div class="ui inverted accordion">
            <tools-primitives
                    ref="tools_primitives"
                    :menu="menu_primitives">
            </tools-primitives>
            <tools-lights
                    ref="tools_lights"
                    :menu="menu_lights">
            </tools-lights>
            <tools-cameras
                    ref="tools_cameras"
                    :menu="menu_cameras">
            </tools-cameras>
            <tools-others
                    ref="tools_others">
            </tools-others>
        </div>
    </div>
</template>
<script type="text/babel">
import {mapGetters, mapActions} from 'vuex'
import CST from '../../../../../core/utils/CST.js';
import ToolsPrimitives from './primitives.vue'
import ToolsCameras from './cameras.vue'
import ToolsLights from './lights.vue'
import ToolsOthers from './others.vue'

export default
{
    created() {
        this.menu_primitives = CST.TOOLS.MENUS.filter(m => m.name == 'Primitives')[0];
        this.menu_cameras = CST.TOOLS.MENUS.filter(m => m.name == 'Cameras')[0];
        this.menu_lights = CST.TOOLS.MENUS.filter(m => m.name == 'Lights')[0];
    },
    data() {
        return {
            menu_primitives: {},
            menu_lights: {},
            menu_cameras: {},
        }
    },
    computed: mapGetters({
        showViewportTools: 'isViewportToolsVisible'
    }),
    components: {
        'tools-primitives' : ToolsPrimitives,
        'tools-lights'     : ToolsLights,
        'tools-cameras'    : ToolsCameras,
        'tools-others'     : ToolsOthers
    }
}
</script>
