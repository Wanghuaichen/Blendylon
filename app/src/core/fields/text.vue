<template>
    <div class="ui inverted mini fluid labeled input input-transform right">
        <div class="ui black label fixed noselect" style="width:50%">
            {{label}}
        </div>
        <input
            @keyup.prevent="submit($event)"
            @blur="submit"
            type="text"
            ref="input"
            v-model="value"
            :title="label">
    </div>
</template>
<script>
export default
{
    data() {
        return {
            value : this.attr,
            old   : this.attr
        }
    },
    watch   : {
        attr(value) {
            this.value = this.old = value;
        }
    },
    props   : {
        label : String,
        attr  : String
    },
    methods : {
        submit(event)
        {
            if(event.keyCode == 13) {
                this.$emit('submitted', this.value);
                this.$refs.input.blur();
            }
            else if(event.keyCode == 27) {
                this.value = this.old;
                this.$refs.input.blur();
            }
        }
    }
}
</script>
