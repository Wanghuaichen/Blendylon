<template>
    <div>
        <div class="title active">
            <i class="dropdown icon"></i>
            Lamps
        </div>
        <div class="content active">
            <button class="ui mini fluid inverted labeled icon button" @click="create(item.name)" v-for="item in menu.children">
                <i class="icon"><img :src="'assets/img/primitives/'+item.name+'.png'" class="primitive-icon"></i>
                {{item.name | camelCaseToStr | capitalize}}
            </button>
        </div>
    </div>
</template>
<script>
import CST from '../../../../../core/utils/CST';
import Utility from '../../../../../core/utils/Utility';
import Light from '../viewport/modules/light'
import {mapGetters, mapActions} from 'vuex'

export default {
    name:'tools_lights',
    props: {
        menu: Object
    },
    filters: {
        camelCaseToStr: str => Utility.camelCaseToStr(str),
        capitalize: str => Utility.capitalize(str)
    },
    computed: mapGetters({
        scene: 'getCurrentScene',
        camera: 'getCurrentCamera',
        cursor: 'getCurrentCursor',
        cursorPosition: 'getCurrentCursorPosition',
        lastLight: 'getLastLightCreated'
    }),
    methods:
    {
        ...mapActions({
            addLight: 'addLight',
            addShadowGenerator: 'addShadowGenerator'
        }),
        create(type)
        {
            this.$parent.contextForm.hide();

            this.addLight({
                type: type.toLowerCase(),
                scene: this.scene,
                position: this.cursorPosition.clone()
            });

            let action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,
                (clicked) => this.$parent.selection.set(clicked.source.light, this.scene));

            this.lastLight.widget.actionManager = new BABYLON.ActionManager(this.scene);
            this.lastLight.widget.actionManager.registerAction(action);

            this.addShadowGenerator({
                lightId: this.lastLight.id
            })

            this.$parent.selection.set(this.lastLight, this.scene);


//            light.type = CST.OBJECTS.LIGHT;
//            light.model = type;
//
//            if(type == 'directional')
//                light.direction = new BABYLON.Vector3(0, 0, 0);
//
//            if(type != 'hemispheric')
//            {
//                light.widget = new Light(this.scene, this.camera, light);
//                light.widget.instance.position = light.position;
//
//                let generator = new BABYLON.ShadowGenerator(2048, light);
//                generator.usePoissonSampling = true;
//                generator.bias = 0.000001;
//
//                this.updateObjectsShadows(generator);
//            }
//

        }
    }
}
</script>
