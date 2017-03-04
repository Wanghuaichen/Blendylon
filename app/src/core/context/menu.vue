<template>
    <transition name="slide-fade-right" mode="in-out" v-if="visible">
        <div id="context_menu" :style="{left: position.x + 'px', top: position.y+'px'}" key="context_menu">
            <div class="ui vertical inverted pointing menu tiny" style="width: 16rem">
                <div class="ui inverted segment  transparent fluid icon search input" style="margin:0">
                    <i class="search icon" style="margin-right: 10px"></i>
                    <input type="text" autofocus placeholder="Search..." id="search-menu" ref="searchField" @keyup="handleBlur">
                </div>
                <div class="ui inverted divider" style="margin:0"></div>
                <span v-for="option in options">
                    <div class="ui left inverted black pointing dropdown link item" v-if="option.children.length > 0" >
                        <i class="dropdown icon"></i>
                        <span class="menu-icon"><img :src="getIconCategory(option.icons_dir)"></span>
                        {{option.name | camelCaseToStr | capitalize}}
                        <div class="ui menu" style="background:#1B1C1D!important">
                            <a class="ui item inverted black" v-for="child in option.children" @click.stop.prevent="trigger(option.name, child)">
                                <span class="menu-icon"><img :src="findIconPath(option.icons_dir, child.name)"></span>
                                {{child.name | camelCaseToStr | capitalize}}
                            </a>
                        </div>
                    </div>
                    <a class="item" v-else>
                        {{option.name | camelCaseToStr | capitalize}}
                    </a>
                </span>
            </div>
        </div>
    </transition>
</template>
<script>
import Utility from '../../../../../utils/Utility'

export default
{
    name: 'context_menu',
    props: {
        title: String,
        icon: String,
        visible: {
            type: Boolean,
            default: false
        },
        position: {
            type: Object,
            default: () => {return {x: 0, y: 0}}
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    filters:
    {
        camelCaseToStr : str  => Utility.camelCaseToStr(str),
        capitalize     : str  => Utility.capitalize(str)
    },
    watch: {
        visible(value) {
            if(value === true)
                $(($) => {$('#search-menu').focus();})
        }
    },
    methods: {
        handleBlur(e) {
            if(e.keyCode == 27) {
                this.$parent.closeContexts()
            }
        },
        findIconPath: (dir, icon) => './app/src/assets/img/'+dir+'/'+icon+'.png',
        getIconCategory: (category) => './app/src/assets/img/menus/'+category+'.png',
        trigger(category, option)
        {
            let
            categoryName = 'tools_' + category.toLowerCase(),
            optionName   = option.name.replace(/\s+/g, '');

            this.$parent.$refs[categoryName].create(optionName);
            this.$parent.contextMenu.hide();
        }

    },
    updated: _ => $(_=> window.refreshSemanticUi())
}
</script>
