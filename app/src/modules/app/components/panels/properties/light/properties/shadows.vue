<template>
    <div class="ui inverted accordion" v-if="object">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Shadows
        </div>
        <div class="content active">
        </div>
    </div>
</template>
<script type="text/babel">
export default{
    data() {
        return {}
    },
    props: {
        object: Object
    }
}
</script>
