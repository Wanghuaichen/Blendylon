<template>
    <div class="ui inverted accordion">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i>
            Relations
        </div>
        <div class="content active">
            <div class="ui inverted mini fluid labeled input input-transform right">
                <div class="ui black label fixed noselect">
                    Parent
                </div>
                <div class="ui tiny floating dropdown inverted fluid button">
                    <div class="text">Select</div>
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item"
                           v-for="camera in actors.cameras"
                           value="camera.name"
                           v-if="!camera.type.match(/viewport/) && camera.name !== object.name">
                                {{camera.name}}
                        </a>
                        <a class="item"
                           v-for="obj in actors.objects"
                           value="obj.name"
                           v-if="!obj.type.match(/viewport/) && obj.name !== object.name">
                                {{obj.name}}
                        </a>
                        <a class="item"
                           v-for="light in actors.lights"
                           value="light.name"
                           v-if="!light.type.match(/viewport/) && light.name !== object.name">
                                {{light.name}}
                        </a>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        object: Object,
        actors: Object
    },
    updated() {
        window.refreshSemanticUi();
    }
}
</script>
