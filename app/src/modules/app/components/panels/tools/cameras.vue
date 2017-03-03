<template>
    <div>
        <div class="title active">
            <i class="dropdown icon"></i>
            Cameras
        </div>
        <div class="content active">
            <button class="ui mini fluid inverted labeled icon button" @click="create(item.name)" v-for="item in menu.children">
                <i class="icon"><img :src="'app/src/assets/img/cameras/'+item.name+'.png'" class="primitive-icon"></i>
                {{item.name | camelCaseToStr | capitalize}}
            </button>
        </div>
    </div>
</template>
<script>
    import CST from '../../../../../utils/CST';
    import Utility from '../../../../../utils/Utility';

    export default {
        name:'tools_cameras',
        data() {
            return {
                increments: {}
            }
        },
        props:
        {
            scene : Object,
            menu  : Object
        },
        created()
        {
            for(let light in CST.LIGHTS)
                this.increments[light] = 0;
        },
        filters: {
            camelCaseToStr: str => Utility.camelCaseToStr(str),
            capitalize: str => Utility.capitalize(str),
        },
        methods:
        {
            create(type)
            {
                let light;
                type = type.toLowerCase();
                this.$parent.contextForm.hide();
                let cursorPosition = this.$parent.selection.cursor.instance.position.clone();
                let lightName = this.getName(type + 'Light');


                this.$parent.selection.set(light);
            },
            getName(type)
            {
                let name = Utility.capitalize(type);
                let exists = this.$parent.scene.getLightByName(name);

                if(!exists)
                    return name;
                else
                {
                    this.increments[type]++;
                    return name + '.' + Utility.pad(this.increments[type], 3)
                }
            },
        }
    }
</script>
