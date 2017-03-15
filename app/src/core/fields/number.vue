<template>
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
</template>
<script type="text/babel">
import shortid from 'shortid'
export default
{
    data() {
        return {
            id: shortid.generate(),
            value: this.attr
        }
    },
    watch: {
        attr(value) {
            this.id = shortid.generate()
            this.value = this.attr
        }
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        attr: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getPayload() {
            return {
                value   : this.$refs.checkbox.checked,
                name     : this.name,
                inline   : this.inline,
                disabled : this.disabled
            }
        },
        handleLabelClick() {
            if(!this.disabled) {
                this.$refs.checkbox.checked = this.$refs.checkbox.checked == false;
                this.$emit('submitted', this.getPayload());
            }
        },
        submit(event) {
            this.$emit('submitted', this.getPayload());
        }
    }
}
</script>
