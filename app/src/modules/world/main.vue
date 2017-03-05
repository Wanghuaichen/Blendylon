<template>
    <div class="ui top attached tab active world-tab full-height" data-tab="world">

        <context-menu
            :icon="contextMenu.icon"
            :title="contextMenu.title"
            :visible="contextMenu.visible"
            :position="contextMenu.position"
            :options="contextMenu.options">
        </context-menu>
        <context-form
            :icon="contextForm.icon"
            :title="contextForm.title"
            :visible="contextForm.visible"
            :position="contextForm.position"
            :options="contextForm.options"
            :textures="textures">
        </context-form>

        <div class="ui-container">
            <div id="ui-left-panel">
                <div class="full-width full-height">
                    <div id="ui-viewport">
                        <transition name="slide-fade-right">
                            <div id="tools_list" v-show="showViewportTools">
                                <div class="ui inverted accordion">
                                    <tools-primitives
                                        :textures="textures"
                                        ref="tools_primitives"
                                        :menu="menu_primitives">
                                    </tools-primitives>
                                    <tools-lights
                                        :scene="scene"
                                        ref="tools_lights"
                                        :menu="menu_lights">
                                    </tools-lights>
                                    <tools-cameras
                                        :scene="scene"
                                        ref="tools_cameras"
                                        :menu="menu_cameras">
                                    </tools-cameras>
                                    <tools-others
                                        ref="tools_others">
                                    </tools-others>
                                </div>
                            </div>
                        </transition>
                        <viewport
                            ref="viewport"
                            :engine="engine"
                            :fps="fps"
                            :camera="camera"
                            :scene="scene">
                        </viewport>
                    </div>
                    <div
                        class="drag-handler-left-panel noselect"
                        v-ui-drag-handler.horizontal="{'ui-viewport': 'ui-tools'}">
                    </div>
                    <div id="ui-tools">
                        <entities-list></entities-list>
                    </div>
                </div>
            </div>
            <div
                class="drag-handler-container noselect"
                v-ui-drag-handler.vertical="{'ui-left-panel': 'ui-right-panel'}">
            </div>
            <div id="ui-right-panel">
                <div class="full-width" style="height: calc(100% - 39px);">
                    <div id="ui-outliner">
                       <outliner
                           :actors="actors"
                           :selection="selection.selected">
                       </outliner>
                    </div>
                    <div
                        class="drag-handler-right-panel noselect"
                        v-ui-drag-handler.horizontal="{'ui-outliner': 'ui-properties'}">
                    </div>
                    <div id="ui-properties" class="full-height">
                        <div class="row">
                            <div class="ui tabular pointing secondary inverted menu" id="options_menu">
                                <div class="horizontally fitted item active" data-tab="tab-name">
                                    <i class="icon"><img src="assets/img/icons/rendering.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name2">
                                    <i class="icon"><img src="assets/img/icons/scene.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name3">
                                    <i class="icon"><img src="assets/img/icons/world.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name4">
                                    <i class="icon"><img src="assets/img/icons/object.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name9">
                                    <i class="icon"><img src="assets/img/lights/directional.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name5">
                                    <i class="icon"><img src="assets/img/icons/material.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name8">
                                    <i class="icon"><img src="assets/img/icons/texture.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name6">
                                    <i class="icon"><img src="assets/img/icons/physics.png"></i>
                                </div>
                                <div class="horizontally fitted item" data-tab="tab-name7">
                                    <i class="icon"><img src="assets/img/icons/particles.png"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="height: calc(100% - 74px)">
                            <div class="ui transition fade in tab active" data-tab="tab-name">
                                <rendering-properties></rendering-properties>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name2">
                                <scene></scene>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name3">
                                <sky-properties></sky-properties>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name4">
                                <object-properties :object="selection.selected" :scene="scene" :actors="actors"></object-properties>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name9">
                                <light-properties
                                      :object="selection.selected"
                                      :scene="scene"
                                      :actors="actors">
                                </light-properties>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name5">
                                <materials :scene="scene" :textures="textures" :object="selection.selected"></materials>
                            </div>
                            <div class="ui transition fade in tab full-height" data-tab="tab-name8">
                                <textures :scene="scene" :textures="textures"></textures>
                            </div>
                            <div class="ui tab" data-tab="tab-name6">Object Physics</div>
                            <div class="ui tab" data-tab="tab-name7">Object Particles</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
let _ = require('lodash');

import CST from '../../core/utils/CST.js';
import Utility from '../../core/utils/Utility';

//TODO: clean/build this entities system
import EntitiesList from '../entities/list.vue'

import Selection from '../app/components/panels/viewport/modules/selection/selection';
import Widgets from '../app/components/panels/viewport/modules/widgets/widgets'
import Timeline from '../app/components/panels/timeline/timeline'
import Context from '../../core/context/context';

import ContextMenu from '../../core/context/menu.vue';
import ContextForm from '../../core/context/form.vue';
import Viewport from '../app/components/panels/viewport/viewport.vue';
import Outliner from '../app/components/panels/outliner/outliner.vue';
import RenderingProperties from '../app/components/panels/properties/rendering/rendering.vue';
import ObjectProperties from '../app/components/panels/properties/object/properties.vue';
import LightProperties from '../app/components/panels/properties/light/properties.vue';
import SkyProperties from '../app/components/panels/properties/sky/properties.vue';
import Textures from '../app/components/panels/properties/textures/textures.vue';
import Materials from '../app/components/panels/properties/materials/materials.vue';
import Scene from '../app/components/panels/properties/scene/scene.vue';

import ToolsPrimitives from '../app/components/panels/tools/primitives.vue'
import ToolsCameras from '../app/components/panels/tools/cameras.vue'
import ToolsLights from '../app/components/panels/tools/lights.vue'
import ToolsOthers from '../app/components/panels/tools/others.vue'

import {mapGetters, mapActions} from 'vuex'

export default
{
    name: 'world',
    data()
    {
        return {
            scene: {},
            textures: [],
            fps: 0,

            actors: {
                objects: [],
                lights: [],
                cameras: [],
            },

            transform_widgets: null,

            selection: {},
            mousePosition: {},

            menu_primitives: {},
            menu_lights: {},
            menu_cameras: {},

            contextForm: {},
            contextMenu: {},

            screenshot: {
                width: 0,
                height: 0
            },

            stats: {
                vertices  : 0,
                meshes    : 0,
                lights    : 0,
                cameras   : 0,
                materials : 0,
                textures  : 0
            }
        }
    },
    mounted()
    {
        $(_=>
        {
            let canvas = document.getElementById('viewport');

            this.initCore({
                init: true,
                canvas: canvas,
                antialiased: true
            });

            this.createInputs({
                engine: this.engine,
                init: true
            })

            this.addScene({
                engine: this.engine,
                canvas: canvas,
                init: true
            });

            this.inputs.mouse.on('toggleTracked', tracked => {
                let target = tracked.target.id.toUpperCase();
                let event = tracked.event.toUpperCase();

                if(typeof CST.STATES[target] != 'undefined')
                    if(typeof CST.STATES[target][event] != 'undefined')
                        this.setCurrentState({state: CST.STATES[target][event]})
                else
                    this.setCurrentState({state: CST.STATES.EDITOR.ALWAYS})
            });

            this.scene = this.currentScene;
            let scene = this.currentScene;

            this.actors.objects = scene.meshes;
            this.actors.lights  = scene.lights;
            this.actors.cameras = scene.cameras;

//            this.widgets = new Widgets(this.scene);

            this.selection = new Selection(this.currentScene, this.camera);

            this.timeline = window.timeline = new Timeline();

            this.menu_primitives = CST.TOOLS.MENUS.filter(m => m.name == 'Primitives')[0];
            this.menu_cameras = CST.TOOLS.MENUS.filter(m => m.name == 'Cameras')[0];
            this.menu_lights = CST.TOOLS.MENUS.filter(m => m.name == 'Lights')[0];

            this.contextMenu = new Context(CST.CONTEXT_MENU);
            this.contextForm = new Context(CST.CONTEXT_FORM);

            this.contextMenu.options = CST.TOOLS.MENUS;

            window.addEventListener('resize', _ => {
                this.screenshot.width = this.canvas.width;
                this.screenshot.height = this.canvas.height;
            });

            this.canvas.addEventListener('mousewheel', _ => this.resizeCursor({
                sceneId: this.currentSceneId,
                radius: this.camera.radius
            }));

            this.listenShortcuts();
            this.handleViewportClick();

            window.addEventListener('mousedown', this.hideContextMenu);

            this.scene.debugLayer.show(false);
            this.scene.debugLayer.axisRatio = 0.05;

            this.scene.debugLayer.shouldDisplayLabel = node => {
                if(this.selection)
                    return node.name == this.selection.selected.name && this.selection.showName == true
            }

            this.scene.debugLayer.shouldDisplayAxis = node => {
                if(this.selection)
                    return node.name == this.selection.selected.name && this.selection.showAxis == true
            }

            this.screenshot.width = this.canvas.width;
            this.screenshot.height = this.canvas.height;

            this.engine.runRenderLoop(_ => {
                if(this.currentScene && this.engine) {
                    //Todo: optimize this, too much calls, fix for avoid bug when resize panels handlers.
                    this.engine.resize();

                    this.currentScene.renderLoop();
                }
            });

            $('body').on('contextmenu', '#viewport', function(e){ return false; });
        })
    },
    computed: mapGetters(
    {
        canvas         : 'getCanvas',
        engine         : 'getEngine',
        currentState   : 'getCurrentState',

        currentScene   : 'getCurrentScene',
        currentSceneId : 'getCurrentSceneId',
        scenes         : 'getScenes',
        camera         : 'getCurrentCamera',
        cursor         : 'getCurrentCursor',
        cursorPosition : 'getCurrentCursorPosition',

        inputs         : 'getInputs',
        shortcuts      : 'getShortcuts',

        getSelection   : 'getSelection',
        firstSelected  : 'firstSelected',

        showViewportTools: 'isViewportToolsVisible'
    }),
    methods:
    {
        ...mapActions(
        {
            initCore              : 'initCore',
            setCurrentState       : 'setCurrentState',
            createInputs          : 'createInputs',
            addScene              : 'addScene',

            toggleCameraMode      : 'toggleCameraMode',
            setViewportCameraRadius: 'setViewportCameraRadius',
            setViewportCameraTarget: 'setViewportCameraTarget',

            createCursor          : 'createCursor',
            resizeCursor          : 'resizeCursor',
            resetCursorPosition   : 'resetCursorPosition',
            setCursorPosition     : 'setCursorPosition',

            setSelection          : 'setSelection',
            addToSelection        : 'addToSelection',
            deleteSelection       : 'deleteSelection',
            clearSelection        : 'clearSelection',
            removeFromSelection   : 'removeFromSelection',

            toggleViewportOptions : 'toggleViewportOptions',
            toggleViewportTools   : 'toggleViewportTools',
        }),
        listenShortcuts() {
            this.shortcuts.forEach(shortcut => {
                let cb = this[shortcut.callback];
                if(typeof cb == 'function')
                    Mousetrap.bind(shortcut.keys, cb)
            })
        },
        setCameraMode() {
            this.toggleCameraMode({sceneId: this.currentSceneId});
        },
        removeSelection() {
            this.selection.remove();
        },
        clearSelection() {
            this.selection.clear(this.currentScene);
        },
        closeContexts() {
            console.log('ok')
            this.contextMenu.hide();
            this.contextForm.hide();
        },
        hideContextMenu(e) {
            if(e.target.tagName !== 'INPUT' && [...e.target.classList].indexOf('item') == -1)
                this.contextMenu.hide();
        },
        showContextMenu() {
            this.contextMenu.setPosition(this.inputs.mouse.position, true);
            this.contextMenu.switch();
        },
        handleViewportClick() {
            this.currentScene.onPointerDown = (evt, pickResult) =>
            {
                //TODO: create mutation/action
                //this.camera.setCurrentView('user');

                if(this.inputs.keyboard.ctrl === true)
                {
                    this.setCursorPosition({
                        sceneId: this.currentSceneId,
                        position: pickResult.pickedPoint,
                        radius: this.camera.radius
                    });
                }

                if(evt.which == 3)
                {
                    if(pickResult.hit && typeof pickResult.pickedMesh.name !== 'undefined')
                    {
                        var object = this.currentScene.getMeshByName(pickResult.pickedMesh.name);

                        if(object && !object.type.match(/viewport/))
                        {
                            if(this.inputs.keyboard.shift === true)
                                this.selection.add(object, this.currentScene);
                            else
                                this.selection.set(object, this.currentScene);

                            if(typeof this.$refs.viewport.$refs.viewport_display != 'undefined')
                                this.$refs.viewport.$refs.viewport_display.resize();
                        }
                    }
                }
            }
        },
        resetCurrentCursor() {
            this.setCursorPosition({
                sceneId: this.currentSceneId,
                position: BABYLON.Vector3.Zero(),
                radius: this.camera.radius
            });
            this.setViewportCameraTarget({
                sceneId: this.currentSceneId,
                position: this.cursorPosition.clone()
            });
            this.setViewportCameraRadius({
                sceneId: this.currentSceneId,
                radius: this.camera.defaultRadius
            })
        },
        centerViewOnSelection() {
            if(typeof this.selection.selected.position !== 'undefined')
            {
                let target;
                if(typeof this.selection.selected._boundingInfo != 'undefined')
                {
                    let center = this.selection.selected._boundingInfo.boundingBox.center;
                    target = new BABYLON.Vector3(center.x, center.y, center.z);

                    this.setViewportCameraRadius({
                        sceneId: this.currentSceneId,
                        radius: this.selection.selected.scaling.lengthSquared() * 2
                    })
                }
                else
                    target = this.cursorPosition.clone();

                this.setViewportCameraTarget({
                    sceneId: this.currentSceneId,
                    position: target
                })
            }
            else
            {
                this.setViewportCameraTarget({
                    sceneId: this.currentSceneId,
                    position: this.cursorPosition.clone()
                })

                this.setViewportCameraRadius({
                    sceneId: this.currentSceneId,
                    radius: this.camera.defaultRadius
                })
            }

            this.resizeCursor({
                sceneId: this.currentSceneId,
                radius: this.camera.radius
            });
        },
        showModalScreenshot() {
            window.$('.ui.basic.modal').modal('show');
        },
        makeScreenshot()
        {
            BABYLON.Tools.CreateScreenshot(this.engine, this.camera, {
                width: this.screenshot.width,
                height: this.screenshot.height
            });
        }
    },
    components: {
        'scene'             : Scene,
        'viewport'          : Viewport,
        'outliner'          : Outliner,
        'textures'          : Textures,
        'materials'         : Materials,
        'entities-list'     : EntitiesList,
        'rendering-properties': RenderingProperties,
        'object-properties' : ObjectProperties,
        'light-properties'  : LightProperties,
        'sky-properties'    : SkyProperties,
        'tools-primitives'  : ToolsPrimitives,
        'tools-lights'      : ToolsLights,
        'tools-cameras'     : ToolsCameras,
        'tools-others'      : ToolsOthers,
        'context-menu'      : ContextMenu,
        'context-form'      : ContextForm
    }
}
</script>
