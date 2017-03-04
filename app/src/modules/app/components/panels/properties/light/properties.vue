<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div class="ui two wide column full-height" v-if="object && object.name && object.type == 'light'" style="padding: 15px;">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Properties
                </div>
                <div class="content active">
                    <InputText :attr="object.name" label="Name" @submitted="setObjectName"></InputText>
                    <br>
                </div>
            </div>
            <transform :object="object"></transform>
            <relations :object="object" :actors="actors"></relations>
            <display :object="object" :scene="scene"></display>
        </div>
        <div class="ui two wide column full-height text-center message-default" v-else>
            <i class="info circle grey icon"></i><br>
            Select a light to display his properties
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import InputText from '../../../../../../core/fields/text.vue'
    import InputCheckbox from '../../../../../../core/fields/checkbox.vue'

    import Transform from './properties/transform.vue';
    import Relations from './properties/relations.vue';
    import Display   from './properties/display.vue';

    export default
    {
        props: {
            object : Object,
            actors : Object
        },
        updated() {
            window.refreshSemanticUi();
        },
        computed: mapGetters({
            scene: 'getCurrentScene'
        }),
        methods: {
            setObjectName(name) {
                this.object.name = name
            }
        },
        components: {
            'InputText' : InputText,
            'InputCheckbox' : InputCheckbox,
            'transform' : Transform,
            'relations' : Relations,
            'display'   : Display
        }
    }
</script>
