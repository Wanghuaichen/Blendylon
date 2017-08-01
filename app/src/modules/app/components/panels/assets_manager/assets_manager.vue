<template>
    <div class="full-height full-width" :id="'assets_manager_'+model.id">
        <div
            class="ui list inverted black scrollable-y"
            :id="'assets_manager_tree_'+model.id"
            style="width: 10%;float: left;height: calc(100% - 1px);padding: 15px;">
            <folder :model="tree"></folder>
        </div>
        <div
                class="noselect ui-drag-handler-vertical"
                style="left:10%;height: calc(100% - 1px)"
                v-ui-drag-handler="[
                    'vertical',
                    'assets_manager_content_'+model.id,
                    'assets_manager_tree_'+model.id,
                    'assets_manager_'+model.id
                ]">
        </div>
        <div
            class="folder-content"
            style="width: 90%;float: left;height: 100%;padding:15px"
            :id=" 'assets_manager_content_'+model.id">
        </div>
    </div>
</template>
<script>
import dirTree from 'directory-tree'
import Folder from './folder.vue'

export default
{
    name: 'assets_manager',
    props: {
        model: Object
    },
    mounted() {
        this.tree = dirTree('C:\\Users\\Mel\\Documents\\BlendylonProjects\\test');
        console.log(this.tree)
    },

    data()
    {
        return {
            tree: {}
        }
    },
    components: {
        Folder
    }
}
</script>
