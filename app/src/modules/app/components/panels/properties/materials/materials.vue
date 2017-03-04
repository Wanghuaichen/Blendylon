<template>
    <div style="padding: 0px" class="full-height" id="properties_list">
        <div class="ui two wide column full-height" v-if="object && object.material" id="materials_panel">
            <div style="padding: 15px">
                <div class="ui inverted mini fluid labeled input input-transform right" style="overflow: inherit;margin-bottom: 15px;">
                    <div class="ui black label fixed noselect" style="width: 50%">
                        Type
                    </div>
                    <div class="ui tiny floating dropdown inverted fluid button">
                        <div class="text">{{getCurrentMaterialName(object.materialType)}}</div>
                        <div class="text" v-if="object.materialType == 'none'">Select</div>
                        <i class="dropdown icon"></i>
                        <div class="inverted black menu">
                            <a
                                class="item"
                                v-for="material in materials"
                                @click="setMaterialType(material.type)"
                                :class="{selected: material.type == object.materialType}">
                                {{material.name}}
                            </a>
                        </div>
                    </div>
                </div>
                <standard-material  v-if="current == 'standard-material'"       :scene="scene" :object="object" :textures="textures"></standard-material>
                <fur-material       v-else-if="current == 'fur-material'"       :scene="scene" :object="object" :textures="textures"></fur-material>
                <fire-material      v-else-if="current == 'fire-material'"      :scene="scene" :object="object" :textures="textures"></fire-material>
                <grid-material      v-else-if="current == 'grid-material'"      :scene="scene" :object="object" :textures="textures"></grid-material>
                <gradient-material  v-else-if="current == 'gradient-material'"  :scene="scene" :object="object" :textures="textures"></gradient-material>
                <lava-material      v-else-if="current == 'lava-material'"      :scene="scene" :object="object" :textures="textures"></lava-material>
                <terrain-material   v-else-if="current == 'terrain-material'"   :scene="scene" :object="object" :textures="textures"></terrain-material>
                <normal-material    v-else-if="current == 'normal-material'"    :scene="scene" :object="object" :textures="textures"></normal-material>
                <simple-material    v-else-if="current == 'simple-material'"    :scene="scene" :object="object" :textures="textures"></simple-material>
                <triPlanar-material v-else-if="current == 'triPlanar-material'" :scene="scene" :object="object" :textures="textures"></triPlanar-material>
                <water-material     v-else-if="current == 'water-material'"     :scene="scene" :object="object" :textures="textures"></water-material>
            </div>
        </div>
        <div class="ui two wide column text-center message-default" v-else>
            <i class="info circle grey icon"></i><br>
            Select an object to display his material
        </div>
    </div>
</template>
<script type="text/babel">
import Utility           from '../../../../../../core/utils/Utility'
import StandardMaterial  from './types/standard.vue'
import FurMaterial       from './types/fur.vue'
import FireMaterial      from './types/fire.vue'
import GradientMaterial  from './types/gradient.vue'
import GridMaterial      from './types/grid.vue'
import LavaMaterial      from './types/lava.vue'
import TerrainMaterial   from './types/terrain.vue'
import NormalMaterial    from './types/normal.vue'
import SimpleMaterial    from './types/simple.vue'
import TriPlanarMaterial from './types/triPlanar.vue'
import WaterMaterial     from './types/water.vue'

export default
{
    data()
    {
        return {
            increments: {},
            materials: [
                {type: 'standard-material',  name: 'Standard'},
                {type: 'fire-material',      name: 'Fire'},
                {type: 'fur-material',       name: 'Fur'},
                {type: 'gradient-material',  name: 'Gradient'},
                {type: 'grid-material',      name: 'Grid'},
                {type: 'lava-material',      name: 'Lava'},
                {type: 'normal-material',    name: 'Normal'},
                {type: 'simple-material',    name: 'Simple'},
                {type: 'terrain-material',   name: 'Terrain'},
                {type: 'triPlanar-material', name: 'Tri Planar'},
                {type: 'water-material',     name: 'Water'}
            ],
            current: 'standard-material'
        }
    },
    props:
    {
        object   : {type: Object, default: () => {}},
        scene    : {type: Object, default: () => {}},
        textures : {type: Array, default: ()  => []}
    },
    created() {
        this.materials.forEach(mat => this.increments[mat.type] = 0);
    },
    updated() {
        window.refreshSemanticUi();
    },
    methods: {
        getName(type)
        {
            let name = Utility.capitalize(type);
            let exists = this.$parent.scene.getMeshByName(name);

            if(!exists)
                return name;
            else
            {
                this.increments[type]++;
                return name + '.' + Utility.pad(this.increments[type], 3)
            }
        },
        getCurrentMaterialName(type)
        {
            let item = this.materials.find(mat => mat.type == type);
            return item ? item.name : 'Select';
        },
        setMaterialType(type)
        {
            let materialType = Utility.capitalize(type.split('-')[0]) + 'Material'

        if(typeof BABYLON[materialType] == 'function')
{
    this.current = this.object.materialType = type;

    if(typeof this.object.material.dispose == 'function')
        this.object.material.dispose();

    this.object.material = new BABYLON[materialType](
            [type, this.getName(this.object.name)].join('_'),
            this.scene
    );

    if(type == 'water-material') {
        this.object.material.addToRenderList(this.scene.getMeshByName('skybox'))
    }
}
else {
    alert('Material library not loaded.')
}
}
    },
    components:
    {
        StandardMaterial,
        FurMaterial,
        FireMaterial,
        GradientMaterial,
        GridMaterial,
        LavaMaterial,
        NormalMaterial,
        SimpleMaterial,
        TerrainMaterial,
        TriPlanarMaterial,
        WaterMaterial
    }
}
</script>
