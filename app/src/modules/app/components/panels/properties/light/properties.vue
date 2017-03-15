<template>
    <div style="padding: 0" class="scrollable-y full-height">
        <div class="ui two wide column full-height" v-if="object && object.name && object.type == 'light'" style="padding: 15px;">
            <div class="ui inverted accordion">
                <div class="title active accordion-header noselect">
                    <i class="dropdown icon"></i> Properties
                </div>
                <div class="content active">
                    <form class="ui inverted form">
                        <InputText :attr="object.name" label="Name" @submitted="setLightName"></InputText>
                        <InputCheckbox
                            :attr="object._isEnabled.value"
                            label="Enabled"
                            @submitted="toggleObject"
                            v-if="typeof object._isEnabled != 'undefined'">
                        </InputCheckbox>
                        <div class="ui inverted mini right fluid labeled input input-transform" v-if="typeof object.angle != 'undefined'">
                            <div class="ui black label fixed noselect" style="width: 50%">
                                Angle
                            </div>
                            <input
                                type="number"
                                name="light_angle"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="object.angle"
                                @inputDrag.prevent="setObjectAngle"
                                @keyup.enter.prevent="setObjectAngle"
                                title="Set light angle">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform" v-if="typeof object.range != 'undefined'">
                            <div class="ui black label fixed noselect" style="width: 50%">
                                Range
                            </div>
                            <input
                                type="number"
                                name="light_range"
                                class="input-draggable"
                                min="0"
                                step="1"
                                v-input-draggable
                                :value="object.range"
                                @inputDrag.prevent="setObjectRange"
                                @keyup.enter.prevent="setObjectRange"
                                title="Set light range">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform" v-if="typeof object.intensity != 'undefined'">
                            <div class="ui black label fixed noselect" style="width: 50%">
                                Intensity
                            </div>
                            <input
                                type="number"
                                name="light_intensity"
                                class="input-draggable"
                                min="0"
                                step="0.01"
                                v-input-draggable
                                :value="object.intensity"
                                @inputDrag.prevent="setObjectIntensity"
                                @keyup.enter.prevent="setObjectIntensity"
                                title="Set light intensity">
                        </div>
                        <div class="ui inverted mini right fluid labeled input input-transform" v-if="typeof object.exponent != 'undefined'">
                            <div class="ui black label fixed noselect" style="width: 50%">
                                Exponent
                            </div>
                            <input
                                type="number"
                                name="light_exponent"
                                class="input-draggable"
                                min="0"
                                step="1"
                                v-input-draggable
                                :value="object.exponent"
                                @inputDrag.prevent="setObjectExponent"
                                @keyup.enter.prevent="setObjectExponent"
                                title="Set light exponent">
                        </div>
                        <br>
                    </form>
                </div>
            </div>
            <shadows   :object="object"></shadows>
            <colors    :object="object"></colors>
            <transform :object="object"></transform>
            <relations :object="object" :actors="actors"></relations>
            <display   :object="object" :scene="scene"></display>
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
import Colors    from './properties/colors.vue';
import Shadows   from './properties/shadows.vue';

export default
{
    props: {
        object : Object,
        actors : Object
    },
    computed: mapGetters({
        scene: 'getCurrentScene'
    }),
    methods: {
        ...mapActions({
            toggleLight: 'toggleLight',
            setLightAngle: 'setLightAngle',
            setLightRange: 'setLightRange',
            setLightIntensity: 'setLightIntensity',
            setLightExponent: 'setLightExponent'
        }),
        toggleObject(payload) {
            this.toggleLight({
                lightId: this.object.id,
                value: payload.value
            })
        },
        setObjectAngle() {
            this.setLightAngle({
                lightId: this.object.id,
                angle: Math.abs(parseFloat($('input[name="light_angle"]').val()))
            })
        },
        setObjectRange() {
            this.setLightRange({
                lightId: this.object.id,
                range: Math.abs(parseFloat($('input[name="light_range"]').val()))
            })
        },
        setObjectIntensity() {
            this.setLightIntensity({
                lightId: this.object.id,
                intensity: Math.abs(parseFloat($('input[name="light_intensity"]').val()))
            })
        },
        setObjectExponent() {
            this.setLightExponent({
                lightId: this.object.id,
                exponent: Math.abs(parseFloat($('input[name="light_exponent"]').val()))
            })
        },
        setLightName(name) {
            this.object.name = name
        }
    },
    components: {
        'InputText'     : InputText,
        'InputCheckbox' : InputCheckbox,
        'transform'     : Transform,
        'relations'     : Relations,
        'display'       : Display,
        'colors'        : Colors,
        'shadows'       : Shadows
    }
}
</script>
