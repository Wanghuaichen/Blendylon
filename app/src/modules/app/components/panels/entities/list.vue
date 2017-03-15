<template>
    <div id="entities_list" style="width:calc(100% - 50px);position: relative;padding: 0;">
        <div class="ui tiny menu inverted" style="border-bottom: 1px solid rgba(255,255,255,0.1);border-top: 1px solid rgba(255,255,255,0.1);margin-top: 2px;margin-bottom:0;border-right: 1px solid rgba(255, 255, 255, 0.0980392);height: 39px">
            <div class="active green item">
                <i class="download icon"></i>
                Import
            </div>
            <div class="right menu">
                <div class="item">

                </div>
            </div>
        </div>
        <transition-group name="list-complete">
            <a href="#" class="card" v-for="entity in entities" v-bind:key="entity.id" data-inverted="" :data-tooltip="entity.id" data-position="bottom center" style="float:left;margin: 10px; width:80px; text-align:center">
                <div class="image" > <img :src="'http://placehold.it/80x80/cccccc/000000?text='+entity.id"></div>
            </a>
        </transition-group>
        <transition name="list-complete">
            <div class="card text-center" v-show="this.entities.length == 0">No entity found&hellip;</div>
        </transition>
    </div>
</template>
<style>

</style>
<script>
var db = require('json!../../../../../../../../../Game/Config/entities.json');
export default{
    data(){
        return {
            entities: db.entities,
            searchQuery: '',
            searchInput: '',
            loading: false
        }
    },
    methods:
    {
        searchEntity()
        {
            this.loading = true;
            this.entities = db.entities.filter(entity =>
                    entity.id.match(new RegExp(this.searchQuery, 'gi'))
            );
            this.loading = false;
        },
        clearSearch()
        {
            this.searchQuery = '';
            this.$refs.searchInput.focus();
            this.entities = db.entities;
        }
    }
}
</script>
