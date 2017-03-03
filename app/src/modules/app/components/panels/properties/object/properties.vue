<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div class="ui two wide column full-height" v-if="object && object.name && object.type == 'mesh'" style="padding: 15px;">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Properties
                </div>
                <div class="content active">
                    <InputText :attr="object.name" label="Name" @submitted="setObjectName"></InputText>
                    <InputCheckbox
                        :attr="object.receiveShadows"
                        label="Receive shadows"
                        @submitted="toggleReceiveShadows"
                        v-if="typeof object.receiveShadows != 'undefined'">
                    </InputCheckbox>
                    <InputCheckbox
                        :attr="object.applyFog"
                        label=" Fog affected"
                        @submitted="toggleApplyFog"
                        v-if="typeof object.applyFog != 'undefined'">
                    </InputCheckbox>
                <br>
                </div>
            </div>
            <transform :object="object"></transform>
            <relations :object="object" :actors="actors"></relations>
            <display :object="object" :scene="scene"></display>
        </div>
        <div class="ui two wide column full-height text-center message-default" v-else>
            <i class="info circle grey icon"></i><br>
            Select an object to display his properties
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import InputText from '../../../core/fields/text.vue'
import InputCheckbox from '../../../core/fields/checkbox.vue'

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
        },
        toggleApplyFog(payload) {
            this.object.applyFog = payload.value == true
        },
        toggleReceiveShadows(payload) {
            let self = this;

            if(payload.value == true)
            {
                this.scene.lights.forEach(function(light) {
                    if(typeof light._shadowGenerator != 'undefined') {
                        let index = light._shadowGenerator.getShadowMap().renderList.findIndex(function(object) {
                            return object.name == self.object.name
                        });

                        if(index >= 0 && typeof light._shadowGenerator != 'undefined')
                            light._shadowGenerator.getShadowMap().renderList.splice(index, 1);
                    }
                });
            }
            else {
                this.scene.lights.forEach(function(light) {
                    if(typeof light._shadowGenerator != 'undefined') {
                        let index = light._shadowGenerator.getShadowMap().renderList.findIndex(function(object) {
                            return object.name == self.object.name
                        });

                        if(index == -1 && typeof light._shadowGenerator != 'undefined')
                            light._shadowGenerator.getShadowMap().renderList.push(self.object);
                    }
                });
            }

            this.object.receiveShadows = payload.value;
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
