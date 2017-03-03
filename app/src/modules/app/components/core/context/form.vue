<template>
    <transition-group name="slide-fade-right" mode="in-out" v-if="visible">
    <div id="context_form" class="ui inverted" :style="{left: position.x + 'px', top: position.y+'px'}" v-window-draggable key="context_form">
        <div class="window-header noselect">
            <img :src="icon" class="window-icon">
            <span>{{title | camelCaseToStr | capitalize}}</span>
            <i class="close pull-right icon window-close" @click="close"></i>
        </div>
        <div class="ui inverted divider" style="margin-bottom:0"></div>
        <div class="ui vertical inverted pointing menu" style="padding: 15px; background: rgb(31, 32, 33);margin:0">
            <div v-for="option in options">
                <div class="ui inverted mini fluid labeled input input-transform right" v-if="isType('string', option) && option.name != 'texture'" :key="option.name">
                    <div class="ui black label fixed noselect">
                        {{option.name | camelCaseToStr | capitalize}}
                    </div>
                    <input
                        type="text"
                        v-model="option.value"
                        :title="option.name">
                </div>

                <div class="ui inverted mini right fluid labeled input input-transform" v-if="isType('number', option)" :key="option.name">
                    <div class="ui black label fixed noselect">
                        {{option.name | camelCaseToStr | capitalize}}
                    </div>
                    <input
                        type="number"
                        min="0"
                        :step="option.value < 0 ? 0.1 : 1"
                        class="input-draggable"
                        v-model="option.value"
                        v-input-draggable>
                </div>
                <InputCheckbox
                    v-if="isType('boolean', option)"
                    :attr="option.value"
                    :name="option.name"
                    :label="option.name | camelCaseToStr | capitalize"
                    @submitted="setFormBooleanValue">
                </InputCheckbox>

                <div class="ui inverted mini fluid labeled input input-transform right" v-if="option.name == 'texture'" style="overflow: inherit">
                    <div class="ui black label fixed noselect">
                        Texture
                    </div>
                    <div class="ui inverted tiny floating dropdown fluid button">
                        <div class="text">Select</div>
                        <i class="dropdown icon"></i>
                        <div class="inverted black menu">
                            <a class="item" v-for="texture in textures" :value="texture.name" @click="option.value = texture.name">
                                {{basename(texture.name)}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui buttons fluid tiny">
            <button class="ui inverted button noradius" @click="close">
                Cancel
            </button>
            <button class="ui inverted blue button noradius" @click="submit" v-show="!loading">
                Create
            </button>
            <button class="ui inverted blue loading button noradius" v-show="loading">Loading</button>
        </div>
    </div>
        </transition-group>
</template>
<script>
import Vue from 'vue'
import path from 'path'
import Utility from '../../../../../utils/Utility'
import InputCheckbox from '../fields/checkbox.vue'
export default
{
    name: 'context_form',
    data() {
        return {
            loading: false
        }
    },
    props: {
        icon: String,
        title: String,
        visible:
        {
            type: Boolean,
            default: false
        },
        position:
        {
            type: Object,
            default: () => ({x: 0, y: 0})
        },
        options:
        {
            type: Array,
            default: () => []
        },
        textures:
        {
            type: Array,
            default: () => []
        }
    },
    components: {
        InputCheckbox
    },
    filters: {
        camelCaseToStr: str => Utility.camelCaseToStr(str),
        capitalize: str => Utility.capitalize(str)
    },
    created() {
        $(() => window.refreshSemanticUi())
    },
    methods:
    {
        setFormBooleanValue(payload) {
            this.options.forEach((option, index) => {
                if(option.name == payload.name) {
                    option.value = payload.value;
                    Vue.set(this.options, index, option);
                }
            })
        },
        basename(name) {
            return path.basename(name)
        },
        close() {
            this.$parent.contextForm.hide();
        },
        isType(type, option) {
            return typeof option.value == type;
        },
        submit() {
            this.loading = true;
            this.$nextTick(function() {
                this.$parent.contextForm.emit('submitted', this)
            })
        }
    }
}
</script>
