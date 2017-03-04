<template>
    <div>
        <div class="title active">
            <i class="dropdown icon"></i>
            Primitives
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
import CST from '../../../../../core/utils/CST';
import Utility from '../../../../../core/utils/Utility';
import {mapGetters, mapActions} from 'vuex'

export default
{
    data() {
        return {
            increments: {}
        }
    },
    props:
    {
        menu  : Object,
        textures:  {
            type: Array,
            default: () => []
        }
    },
    created()
    {
        for(let shape in CST.PRIMITIVES)
            this.increments[shape] = 0;
    },
    filters: {
        camelCaseToStr: str => Utility.camelCaseToStr(str),
        capitalize: str => Utility.capitalize(str)
    },
    computed: mapGetters({
        currentScene: 'getCurrentScene',
        cursor: 'getCurrentCursor'
    }),
    methods:
    {
        createFromHeightmap()
        {
            this.$parent.contextForm.setIcon('app/src/assets/img/primitives/heightmap.png');
            this.$parent.contextForm.setTitle('Create ground from heightmap');
            this.$parent.contextForm.setOptions(CST.PRIMITIVES.heightmap);
            this.$parent.contextForm.switch(true);

            this.$parent.contextForm.on('submitted',  data =>
            {
                let options = {};
                this.$parent.contextForm.hide();
                this.$parent.selection.clear(this.currentScene);
          ;
                data.forEach(option => options[option.name] = option.value);
                let heightmap = this.textures.find(t => t.name == options.texture);
                let name = this.getName(options.name);
                let ground = BABYLON.Mesh.CreateGroundFromHeightMap(
                    name,
                    heightmap.data.url,
                    options.width,
                    options.height,
                    options.subdivisions,
                    options.minHeight,
                    options.maxHeight,
                    this.currentScene,
                    options.updatable
                );
                ground.type = CST.OBJECTS.MESH;
                ground.position = this.cursor.position.clone();

                ground.material = new BABYLON.StandardMaterial(
                    'material' + this.getName('heightmap'),
                    this.currentScene
                );
                ground.materialType = 'standard-material';
                this.$parent.selection.set(ground, this.currentScene);
            });
        },
        getName(type)
        {
            let name = Utility.capitalize(type);
            let exists = this.currentScene.getMeshByName(name);

            if(!exists)
                return name;
            else
            {
                this.increments[type]++;
                return name + '.' + Utility.pad(this.increments[type], 3)
            }
        },

        create(type)
        {
            if(type == 'heightmap')
                this.createFromHeightmap();
            else
            {
                this.$parent.contextForm.setIcon('app/src/assets/img/primitives/'+type+'.png');
                this.$parent.contextForm.setTitle('Create ' + type);
                this.$parent.contextForm.setOptions(CST.PRIMITIVES[type]);
                this.$parent.contextForm.switch(true);

                this.$parent.contextForm.on('submitted', parent =>
                {
                    parent.loading = false;
                    this.$parent.contextForm.hide();
                    this.$parent.selection.clear(this.currentScene);
                    let data = parent.options;
                    let options = {};

                    data.forEach(option => options[option.name] = option.value)

                    let basicMaterial = new BABYLON.StandardMaterial(
                        'material' + this.getName(type),
                        this.currentScene
                    );

                    let object = BABYLON.MeshBuilder['Create' + Utility.capitalize(type)](
                        this.getName(type),
                        options,
                        this.currentScene
                    );

                    object.type             = CST.OBJECTS.MESH;
                    object.materialType     = 'standard-material';
                    object.renderingGroupId = 0;
                    object.layerMask        = 1;
                    object.material         = basicMaterial;
                    object.position         = this.cursor.position.clone();

                    this.$parent.selection.set(object, this.currentScene);
                });
            }
        }
    }
}
</script>
