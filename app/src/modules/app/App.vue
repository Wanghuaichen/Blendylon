<template>
    <div class="full-height" >
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
            <panel
                v-for="model in currentLayout.panels"
                :model="model">
            </panel>
        </div>
    </div>
</template>
<script>
import CST from '../../core/utils/CST.js';
import {mapGetters, mapActions} from 'vuex'

import Panel from './components/Panel.vue'

import ContextMenu from '../../core/context/menu.vue';
import ContextForm from '../../core/context/form.vue';
import Context from '../../core/context/context';
import Selection from './components/panels/viewport/modules/selection/selection';

export default
{
    data() {
        return {
            actors: {},
            textures: [],
            contextForm: {},
            contextMenu: {},
            screenshot: {
                width: 0,
                height: 0
            }
        }
    },
    created() {
        this.addLayout({
            name: 'default',
            panels: [
                {
                    id     : 0,
                    parent : 1,
                    type   : 'horizontal',
                    name   : 'infos',
                    header : 'bottom',
                    style  : {
                        panel : {
                            height : '100%',
                            width  : '100%'
                        },
                        container : {
                            height: '3.5%',
                            width  : '100%',
                        }
                    },
                    children : [
                    ]
                },
                {
                    id     : 1,
                    parent : 0,
                    type   : 'horizontal',
                    name   : 'container',
                    header : 'bottom',
                    style  : {
                        panel : {
                            height : '100%',
                            width  : '100%'
                        },
                        container : {
                            height : '96.5%',
                            width  : '100%',
                        }
                    },
                    children : [
                        {
                            id     : 2,
                            parent : 3,
                            type   : 'vertical',
                            name   : 'container',
                            header : 'bottom',
                            style  : {
                                panel : {
                                    height : '100%',
                                    width  : '100%'
                                },
                                container : {
                                    height: '100%',
                                    width  : '80%',
                                    float: 'left'
                                }
                            },
                            children : [
                                {
                                    id     : 4,
                                    parent : 5,
                                    type   : 'horizontal',
                                    name   : 'viewport',
                                    header : 'bottom',
                                    style  : {
                                        panel : {
                                            height : '100%',
                                            width  : '100%'
                                        },
                                        container : {
                                            height: '76.4%',
                                            width  : '100%'
                                        }
                                    },
                                    children : [

                                    ]
                                },
                                {
                                    id     : 5,
                                    parent : 4,
                                    type   : 'horizontal',
                                    name   : 'timeline',
                                    header : 'bottom',
                                    style  : {
                                        panel : {
                                            height : '100%',
                                            width  : '100%'
                                        },
                                        container : {
                                            height: '23.5%',
                                            width  : '100%'
                                        }
                                    },
                                    children : [

                                    ]
                                },
                            ]
                        },
                        {
                            id     : 3,
                            parent : 2,
                            type   : 'vertical',
                            name   : 'container',
                            header : 'bottom',
                            style  : {
                                panel : {
                                    height : '100%',
                                    width  : '100%'
                                },
                                container : {
                                    height: '100%',
                                    width  : '20%',
                                    float: 'left'
                                }
                            },
                            children : [
                                {
                                    id     : 6,
                                    parent : 7,
                                    type   : 'horizontal',
                                    name   : 'outliner',
                                    header : 'top',
                                    style  : {
                                        panel : {
                                            height : '100%',
                                            width  : '100%'
                                        },
                                        container : {
                                            height: '24.4%',
                                            width  : '100%'
                                        }
                                    },
                                    children : [

                                    ]
                                },
                                {
                                    id     : 7,
                                    parent : 6,
                                    type   : 'horizontal',
                                    name   : 'properties',
                                    header : 'top',
                                    style  : {
                                        panel : {
                                            height : '100%',
                                            width  : '100%'
                                        },
                                        container : {
                                            height: '75.5%',
                                            width  : '100%'
                                        }
                                    },
                                    children : [

                                    ]
                                },
                            ]
                        },
                    ]
                }
            ]
        });

        this.$nextTick(() => {
            let canvas = window.document.getElementById('viewport');

            this.initCore({
                init        : true,
                canvas      : canvas,
                antialiased : true
            });


            this.createInputs({
                engine : this.engine,
                init   : true
            })

            this.addScene({
                engine : this.engine,
                canvas : canvas,
                init   : true
            });

            this.inputs.mouse.on('toggleTracked', tracked => {
                let target = tracked.target.id.toUpperCase();
                let event = tracked.event.toUpperCase();

                if(typeof CST.STATES[target] != 'undefined') {
                    if(typeof CST.STATES[target][event] != 'undefined')
                        this.setCurrentState({state: CST.STATES[target][event]})
                    else
                        this.setCurrentState({state: CST.STATES.EDITOR.ALWAYS})
                }
            });

            this.scene = this.currentScene;
            let scene = this.currentScene;

            this.actors.objects = scene.meshes;
            this.actors.lights  = scene.lights;
            this.actors.cameras = scene.cameras;

//            this.widgets = new Widgets(this.scene);

            this.selection = new Selection(this.currentScene, this.camera)



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
                    this.currentScene.render();
                }
            });
        });
    },
    computed: {
        ...mapGetters({
            layouts: 'getLayouts',
            currentLayout: 'getCurrentLayout',

            canvas         : 'getCanvas',
            engine         : 'getEngine',
            currentState   : 'getCurrentState',

            layouts        : 'getLayouts',
            currentLayout  : 'getCurrentLayout',

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
        })
    },
    methods: {
        ...mapActions({
            addLayout: 'addLayout',
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
        closeContexts() {
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
        listenShortcuts() {
            this.shortcuts.forEach(shortcut => {
                let cb = this[shortcut.callback];
                console.log(shortcut.callback)
                if(typeof cb == 'function')
                    Mousetrap.bind(shortcut.keys, cb)
            })
        },
        handleViewportClick() {
            this.currentScene.onPointerDown = (evt, pickResult) =>
            {
                //TODO: create mutation/action
                //this.camera.setCurrentView('user');

                if(evt.which == 1 && this.inputs.keyboard.ctrl === true)
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
                        if(object)
                        {
                            if(!object.type.match(/viewport/))
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
            }
        },
    },
    components:
    {
        panel : Panel,
        'context-menu': ContextMenu,
        'context-form': ContextForm
    }
}
</script>
