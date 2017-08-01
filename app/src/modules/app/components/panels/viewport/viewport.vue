<template>
    <div class="full-width full-height">
        <div
                ref="viewport_area"
                class="drop-area noselect full-height"
                id="viewport_container"
                @dragover.prevent="over($event, 'viewport_area')"
                @drop.prevent="drop($event, 'viewport_area')"
                @dragleave.prevent="leave($event, 'viewport_area')"
        >
            <display></display>
            <options ref="viewport_options"></options>
            <canvas id="viewport" class="noselect"></canvas>
        </div>
        <tools></tools>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import path    from 'path'
import Display from './display.vue'
import Options from './options.vue'
import Utility from '../../../../../core/utils/Utility'
import CST     from '../../../../../core/utils/CST'

import Tools from '../../panels/tools/tools.vue'

export default
{
    props: {
        model: Object
    },
    name       : 'viewport',
    data() {
        return {
            increments : {}
        }
    },
    created()
    {
        window.ondragover = window.ondrop = function(e) {
            e.preventDefault();
            return false;
        };
    },
    computed   : mapGetters({
        currentScene : 'getCurrentScene',
        cursor       : 'getCurrentCursor'
    }),
    methods    : {
        getName(type)
        {
            let name   = Utility.capitalize(type);
            let exists = this.scene.getMeshByName(name);

            if(!exists)
                return name;
            else {
                this.increments[type]++;
                return name + '.' + Utility.pad(this.increments[type], 3)
            }
        },
        drop(e, ref)
        {
            e.preventDefault();

            for(var i = 0; i < e.dataTransfer.files.length; ++i) {
                let file = e.dataTransfer.files[i];

                BABYLON.SceneLoader.ImportMesh(
                        '',
                        path.dirname(file.path) + '/',
                        path.basename(file.path),
                        this.currentScene,
                        (meshes, particles, skeletons) => {
                            if(meshes.length > 0) {
                                meshes.forEach(mesh => {
                                    if(typeof this.increments[mesh.name] == 'undefined')
                                        this.increments[mesh.name] = 0;

                                    mesh.type     = CST.OBJECTS.MESH;
                                    mesh.name     = this.getName(mesh.name);
                                    mesh.material = new BABYLON.StandardMaterial('standardMaterial_' + mesh.name, this.currentScene);
                                    mesh.position = this.cursor.position.clone();
                                })
                            }

                            if(skeletons.length > 0)
                                this.currentScene.beginAnimation(skeletons[0], 0, 250, true, 1);
                        });
            }
        },
        over(e, ref) {
            e.preventDefault();
        },
        leave(e, ref) {
            e.preventDefault();
        },
    },
    components : {
        'tools'   : Tools,
        'display' : Display,
        'options' : Options
    }
}
</script>
