
export default
{
    PI      : Math.PI,
    TWOPI   : 2 * Math.PI,
    HALFPI  : .5 * Math.PI,
    OBJECTS :
    {
        MESH            : 'mesh',
        LIGHT           : 'light',
        CAMERA          : 'camera',
        VIEWPORT_MESH   : 'viewport_mesh',
        VIEWPORT_LIGHT  : 'viewport_light',
        VIEWPORT_CAMERA : 'viewport_camera',
        VIEWPORT_WIDGET : 'viewport_widget'
    },
    STATES: {
        EDITOR: {
            ALWAYS: 'EDITOR_STATE_ALWAYS'
        },
        VIEWPORT: {
            HOVER: 'VIEWPORT_STATE_HOVER'
        }
    },
    POLYHEDRON:
    {
        TETRAHEDRON                    : 0,
        OCTAHEDRON                     : 1,
        DODECAHEDRON                   : 2,
        ICOSAHEDRON                    : 3,
        RHOMBICUBOCTAHEDRON            : 4,
        TRIANGULAR_PRISM               : 5,
        PENTAGONAL_PRISM               : 6,
        HEXAGONAL_PRISM                : 7,
        SQUARE_PYRAMID                 : 8,
        PENTAGONAL_PYRAMID             : 9,
        TRIANGULAR_DIPYRAMID           : 10,
        PENTAGONAL_DIPYRAMID           : 11,
        ELONGATED_SQUARE_DIPYRAMID     : 12,
        ELONGATED_PENTAGONAL_DIPYRAMID : 13,
        ELONGATED_PENTAGONAL_CUPOLA    : 14
    },
    CAMERAS: {
        Free: {

        },
        ArcRotate: {

        },
        Touch: {

        },
        Gamepad: {

        },
        DeviceOrientation: {

        },
        Follow: {

        },
        VirtualJoysticks: {

        },
        AnaglyphArcRotate: {

        },
        AnaglyphFree: {

        },
        VRDeviceOrientationFree: {

        },
        WebVRFree: {

        }
    },
    LIGHTS:
    {
        POINT       : 'point',
        DIRECTIONAL : 'directional',
        HEMISPHERIC : 'hemispheric',
        SPOT        : 'spot'
    },
    PRIMITIVES:
    {
        plane: {
            size: 1.0,
            width: 1,
            height: 1,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        ground: {
            width: 1,
            height: 1,
            updatable: true,
            subdivisions: 1
        },
        TiledGround: {
            xmin: -1,
            zmin: -1,
            zmax: 1,
            xmax: 1,
            subdivisions: {w: 6, h: 6},
            precision: {w: 2, h: 2},
            updatable: true
        },
        box: {
            size: 1,
            height: 1,
            width: 1,
            depth: 1,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        disc: {
            radius: 0.5,
            tessellation: 64,
            arc: 1,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        sphere: {
            segments: 32,
            diameter: 1,
            diameterX: 1,
            diameterY: 1,
            diameterZ: 1,
            arc: 1,
            slice: 1,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        cylinder: {
            height: 2,
            diameterTop: 1,
            diameterBottom: 1,
            diameter: 1,
            tessellation: 24,
            subdivisions: 1,
            arc: 1,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        torus: {
            diameter: 1,
            thickness: 0.5,
            tessellation: 16,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        TorusKnot: {
            radius: 2,
            tube: 0.5,
            radialSegments: 32,
            tubularSegments: 32,
            p: 2,
            q: 2,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        polyhedron: {
            type: 1,
            size: 1,
            sizeX: 1,
            sizeY: 1,
            sizeZ: 1,
            custom: null,
            flat: true,
            updatable: true,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        },
        heightmap: {
            name: 'Ground',
            texture: '',
            width: 10,
            height: 10,
            minHeight: 0,
            maxHeight: 1,
            subdivisions: 100,
            updatable: true,
            checkCollisions: true,
            receiveShadows: true
        }
    },
    CONTEXT_MENU: 'menu',
    CONTEXT_FORM: 'form',
    TOOLS:
    {
        MENUS:
        [
            {
                name: 'Primitives',
                icons_dir: 'primitives',
                children:
                [
                    {name: 'plane'},
                    {name: 'ground'},
                    {name: 'TiledGround'},
                    {name: 'box'},
                    {name: 'disc'},
                    {name: 'sphere'},
                    {name: 'cylinder'},
                    {name: 'torus'},
                    {name: 'TorusKnot'},
                    {name: 'polyhedron'},
                    {name: 'heightmap'}
                ]
            },
            {
                name: 'Lights',
                icons_dir: 'lights',
                children:
                [
                    {name: 'point'},
                    {name: 'directional'},
                    {name: 'spot'},
                    {name: 'hemispheric'}
                ]
            },
            {
                name: 'Cameras',
                icons_dir: 'cameras',
                children:
                [
                    {name: 'Free'},
                    {name: 'ArcRotate'},
                    {name: 'Touch'},
                    {name: 'Gamepad'},
                    {name: 'DeviceOrientation'},
                    {name: 'Follow'},
                    {name: 'VirtualJoysticks'},
                    {name: 'AnaglyphFree'},
                    {name: 'AnaglyphArcRotate'},
                    {name: 'VRDeviceOrientationFree'},
                    {name: 'WebVRFree'}
                ]
            },
            {
                name: 'Others',
                icons_dir: 'others',
                children:
                [
                    {name: 'text'},
                ]
            },
        ]
    }
}
