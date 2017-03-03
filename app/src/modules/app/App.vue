<template>
    <div class="full-height">
        <div class="ui pointing menu inverted" id="main_menu">
            <div class="active blue item" data-tab="world"><i class="world icon"></i>World</div>
            <div class="blue item" data-tab="entities"><i class="tree icon"></i>Entities</div>
            <div class="blue item" data-tab="items"><i class="icon"><img :src="'./app/src/assets/img/sword.png'" style="width:14px;"></i>Items</div>
            <div class="blue item" data-tab="quests"><i class="help icon"></i>Quests</div>
            <div class="blue item" data-tab="sounds"><i class="music icon"></i>Sounds</div>
            <div class="blue item" data-tab="players"><i class="users icon"></i>Players</div>
            <div class="blue item">
                <small class="topbar_stats">
                    <span class="text-muted">v{{version}}</span>
                    <span class="text-muted">{{stats.vertices-2>1 ? 'Vertices' : 'Vertex'}}: {{stats.vertices - 2}}</span>
                    <span class="text-muted">Mesh{{stats.meshes>1 ? 'es' : ''}}: {{stats.meshes}}</span>
                    <span class="text-muted">Light{{stats.lights>1 ? 's' : ''}}: {{stats.lights}}</span>
                </small>
            </div>
        </div>
        <world></world>
        <entities></entities>
        <items></items>
        <quests></quests>
        <sounds></sounds>
        <players></players>
    </div>
</template>

<script>
import world    from '../world/main.vue';
import entities from '../entities/main.vue';
import items    from '../items/main.vue';
import quests   from '../quests/main.vue';
import sounds   from '../sounds/main.vue';
import players  from '../players/main.vue';

var version = require('json!../../../../package.json').version;

export default
{
    data() {
        return {
            stats: {},
            version: String
        }
    },
    mounted() {
        this.version = version;
        this.stats = this.$children[0].stats;
    },
    components:
    {
        'world'    : world,
        'entities' : entities,
        'items'    : items,
        'quests'   : quests,
        'sounds'   : sounds,
        'players'  : players
    }
}
</script>
