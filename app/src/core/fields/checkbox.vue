<template>
    <div class="ui inverted mini fluid labeled input input-transform right">
        <div
                class="ui black label fixed noselect pointer"
                style="width:50%"
                @click.stop="handleLabelClick"
                v-if="!inline">
            {{label}}
        </div>
        <input
                type="checkbox"
                :id="id"
                :name="name"
                ref="checkbox"
                class="custom_checkbox"
                :disabled="disabled"
                v-model="value"
                :title="label"
                @click.stop="submit">
        <label :for="id" class="noselect" :class="{'checkbox-label-inline' : inline}"></label>
    </div>
</template>
<script>
    import shortid from 'shortid'
    export default
    {
        data() {
            return {
                id    : shortid.generate(),
                value : this.attr
            }
        },
        watch   : {
            attr(value) {
                this.id    = shortid.generate()
                this.value = this.attr
            }
        },
        props   : {
            name     : {
                type    : String,
                default : ''
            },
            disabled : {
                type    : Boolean,
                default : false
            },
            inline   : {
                type    : Boolean,
                default : false
            },
            label    : {
                type    : String,
                default : ''
            },
            attr     : {
                type    : Boolean,
                default : false
            }
        },
        methods : {
            getPayload() {
                return {
                    value    : this.$refs.checkbox.checked,
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
