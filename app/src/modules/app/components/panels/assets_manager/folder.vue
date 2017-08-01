<template>
    <div class="item">
        <i class="icon" :class="{
            file: model.type == 'file',
            folder: model.type == 'directory'
        }"></i>
        <div class="content">
            <div class="header">{{model.name}}</div>

            <div class="list" v-if="model.children && model.children.length > 0">
                <folder v-for="model in model.children"  :model="model"></folder>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
export default{
    name: 'folder',
    data(){
        return {}
    },
    props: {
        model: Object
    }
}
</script>
