<template>
    <div style="padding: 0">
        <div class="ui two wide column" id="properties_list" style="padding: 15px" >
            <div class="ui inverted accordion" v-if="object">

            </div>
        </div>
    </div>
</template>
<script>
export default
{
    props: {
        object : Object,
        actors : Object,
        scene  : Object
    }
}
</script>
