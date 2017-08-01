<template>
    <div class="ui tabular icon buttons" style="margin-top: 5px;height:25px">
        <button class="ui button item" :data-tab="'properties_rendering_'+model.id">
            <i class="icon"><img src="assets/img/icons/rendering.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_scene_'+model.id">
            <i class="icon"><img src="assets/img/icons/scene.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_sky_'+model.id">
            <i class="icon"><img src="assets/img/icons/world.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_object_'+model.id">
            <i class="icon"><img src="assets/img/icons/object.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_light_'+model.id">
            <i class="icon"><img src="assets/img/lights/directional.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_camera_'+model.id">
            <i class="icon"><img src="assets/img/cameras/Free.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_materials_'+model.id">
            <i class="icon"><img src="assets/img/icons/material.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_textures_'+model.id">
            <i class="icon"><img src="assets/img/icons/texture.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_physics_'+model.id">
            <i class="icon"><img src="assets/img/icons/physics.png"></i>
        </button>
        <button class="ui button item" :data-tab="'properties_particles_'+model.id">
            <i class="icon"><img src="assets/img/icons/particles.png"></i>
        </button>
    </div>
</template>
<script type="text/babel">
export default {
    props: {
        model: Object
    },
    data(){
        return {}
    }
}
</script>
