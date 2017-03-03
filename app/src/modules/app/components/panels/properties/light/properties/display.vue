<template>
    <div class="ui inverted accordion">
        <div class="title active accordion-header noselect">
            <i class="dropdown icon"></i> Display
        </div>
        <div class="content active">
            <form class="ui inverted form">
                <div class="ui two column grid">

                </div>
            </form>
            <br>
        </div>
    </div>
</template>
<script>
import InputCheckbox from '../../../../core/fields/checkbox.vue'
export default {
    props: {
        object : Object,
        scene  : Object
    },
    components: {
        InputCheckbox
    },
    methods: {

    }
}
</script>
