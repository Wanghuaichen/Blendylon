<template>
    <div class="ui inverted accordion">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Display
        </div>
        <div class="content active">
            <form class="ui inverted form">
                <div class="ui two column grid">
                    <div class="column">
                        <InputCheckbox label="Name" :attr="object.showName" @submitted="toggleName"></InputCheckbox>
                        <InputCheckbox label="Axis" :attr="object.showAxis" @submitted="toggleAxis"></InputCheckbox>
                    </div>
                    <div class="column">
                        <InputCheckbox label="Wire" v-if="object.material" :attr="object.material.wireframe" @submitted="toggleWireframe"></InputCheckbox>
                        <InputCheckbox label="Wire" v-else :disabled="true"></InputCheckbox>
                        <InputCheckbox label="Bounds" :attr="object.showBoundingBox" @submitted="toggleBoundingBox"></InputCheckbox>
                    </div>
                </div>
            </form>
            <br>
        </div>
    </div>
</template>
<script>
import InputCheckbox from '../../../../core/fields/checkbox.vue'
export default {
    props: {
        object : Object,
        scene  : Object
    },
    components: {
        InputCheckbox
    },
    methods: {
        toggleName(payload)
        {
            this.object.showName = payload.value == true;
            this.scene.debugLayer.shouldDisplayLabel = node =>
                node.name === this.object.name && this.object.showName === true;
        },
        toggleAxis(payload)
        {
            this.object.showAxis = payload.value == true;
            this.scene.debugLayer.shouldDisplayAxis = (node) =>
                node.name === this.object.name && this.object.showAxis === true;
        },
        toggleWireframe(payload)
        {
            if(this.object.material)
                this.object.material.wireframe = payload.value == true;
        },
        toggleBoundingBox(payload)
        {
            this.object.showBoundingBox = payload.value == true;
        }
    },
}
</script>
