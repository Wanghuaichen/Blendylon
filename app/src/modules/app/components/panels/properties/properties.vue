<template>
    <div id="ui-properties" class="full-height">
        <div class="row full-height">
            <div class="ui transition fade in tab active properties-tab" :data-tab="'properties_rendering_'+model.id">
                <rendering-properties></rendering-properties>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_scene_'+model.id">
                <scene></scene>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_sky_'+model.id">
                <sky-properties></sky-properties>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_object_'+model.id">
                <object-properties></object-properties>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_light_'+model.id">
                <light-properties></light-properties>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_camera_'+model.id">
                <camera-properties></camera-properties>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_materials_'+model.id">
                <materials></materials>
            </div>
            <div class="ui transition fade in tab full-height properties-tab" :data-tab="'properties_textures_'+model.id">
                <textures></textures>
            </div>
            <div class="ui tab" data-tab="tab-name6">Object Physics</div>
            <div class="ui tab" data-tab="tab-name7">Object Particles</div>
        </div>
    </div>
</template>
<script type="text/babel">
import RenderingProperties from './rendering/rendering.vue';
import ObjectProperties from './object/properties.vue';
import LightProperties from './light/properties.vue';
import SkyProperties from './sky/properties.vue';
import CameraProperties from './camera/properties.vue';
import Textures from './textures/textures.vue';
import Materials from './materials/materials.vue';
import Scene from './scene/scene.vue';

export default{
    props: {
        model: Object
    },
    components: {
        'rendering-properties': RenderingProperties,
        'scene'               : Scene,
        'sky-properties'      : SkyProperties,
        'object-properties'   : ObjectProperties,
        'light-properties'    : LightProperties,
        'camera-properties'   : CameraProperties,
        'materials'           : Materials,
        'textures'            : Textures
    }
}
</script>
