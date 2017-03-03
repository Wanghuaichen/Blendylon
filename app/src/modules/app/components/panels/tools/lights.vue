<template>
    <div>
        <div class="title active">
            <i class="dropdown icon"></i>
            Lamps
        </div>
        <div class="content active">
            <button class="ui mini fluid inverted labeled icon button" @click="create(item.name)" v-for="item in menu.children">
                <i class="icon"><img :src="'app/src/assets/img/primitives/'+item.name+'.png'" class="primitive-icon"></i>
                {{item.name | camelCaseToStr | capitalize}}
            </button>
        </div>
    </div>
</template>
<script>
import CST from '../../../../../utils/CST';
import Utility from '../../../../../utils/Utility';
import Light from '../viewport/modules/light'
import {mapGetters, mapActions} from 'vuex'

export default {
    name:'tools_lights',
    data() {
        return {
            increments: {}
        }
    },
    props:
    {
        menu  : Object
    },
    created()
    {
        for(let light in CST.LIGHTS)
            this.increments[light] = 0;
    },
    filters: {
        camelCaseToStr: str => Utility.camelCaseToStr(str),
        capitalize: str => Utility.capitalize(str)
    },
    computed: mapGetters({
        scene: 'getCurrentScene',
        camera: 'getCurrentCamera',
        cursor: 'getCurrentCursor',
        cursorPosition: 'getCurrentCursorPosition'
    }),
    methods:
    {
        create(type)
        {
            let light;
            type = type.toLowerCase();
            this.$parent.contextForm.hide();
            let cursorPosition = this.cursorPosition.clone();
            let lightName = this.getName(type + 'Light');

            switch(type)
            {
                case 'point':
                    light = new BABYLON.PointLight(
                        lightName,
                        cursorPosition,
                        this.scene
                    );
                break;
                case 'directional':
                    light = new BABYLON.DirectionalLight(
                        lightName,
                        cursorPosition,
                        this.scene
                    );
                break;
                case 'spot':
                    light = new BABYLON.SpotLight(
                        lightName,
                        cursorPosition,
                        new BABYLON.Vector3(0, -1, 0),
                        0,
                        1,
                        this.scene
                    );
                break;
                case 'hemispheric':
                    light = new BABYLON.HemisphericLight(
                        lightName,
                        cursorPosition,
                        this.scene
                    )
                break;
            }

            light.type = CST.OBJECTS.LIGHT;
            light.model = type;

            if(type == 'directional')
                light.direction = new BABYLON.Vector3(0, 0, 0);

            if(type != 'hemispheric')
            {
                light.widget = new Light(this.scene, this.camera, light);
                light.widget.instance.position = light.position;

                let generator = new BABYLON.ShadowGenerator(2048, light);
                generator.usePoissonSampling = true;
                generator.bias = 0.000001;

                this.updateObjectsShadows(generator);
            }

            this.$parent.selection.set(light, this.scene);
        },
        updateObjectsShadows(generator)
        {
            this.scene.meshes.forEach((mesh) =>
            {
                if(mesh.receiveShadows === true)
                {
                    let renderList = generator.getShadowMap().renderList;
                    let index = renderList.findIndex(object => {
                        return object.name == mesh.name;
                    });

                    if(index == -1 && mesh.receiveShadows == true)
                        renderList.push(mesh)
                }
            });
        },
        getName(type)
        {
            let name = Utility.capitalize(type);
            let exists = this.scene.getLightByName(name);

            if(!exists)
                return name;
            else
            {
                this.increments[type]++;
                return name + '.' + Utility.pad(this.increments[type], 3)
            }
        },
    }
}
</script>
