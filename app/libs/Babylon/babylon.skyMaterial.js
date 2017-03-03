/// <reference path="../../../dist/preview release/babylon.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BABYLON;
(function (BABYLON) {
    var SkyMaterialDefines = (function (_super) {
        __extends(SkyMaterialDefines, _super);
        function SkyMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.CLIPPLANE = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this._keys = Object.keys(_this);
            return _this;
        }
        return SkyMaterialDefines;
    }(BABYLON.MaterialDefines));
    var SkyMaterial = (function (_super) {
        __extends(SkyMaterial, _super);
        function SkyMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            // Public members
            _this.luminance = 1.0;
            _this.turbidity = 10.0;
            _this.rayleigh = 2.0;
            _this.mieCoefficient = 0.005;
            _this.mieDirectionalG = 0.8;
            _this.distance = 500;
            _this.inclination = 0.49;
            _this.azimuth = 0.25;
            _this.sunPosition = new BABYLON.Vector3(0, 100, 0);
            _this.useSunPosition = false;
            // Private members
            _this._cameraPosition = BABYLON.Vector3.Zero();
            _this._defines = new SkyMaterialDefines();
            _this._cachedDefines = new SkyMaterialDefines();
            return _this;
        }
        SkyMaterial.prototype.needAlphaBlending = function () {
            return (this.alpha < 1.0);
        };
        SkyMaterial.prototype.needAlphaTesting = function () {
            return false;
        };
        SkyMaterial.prototype.getAlphaTestTexture = function () {
            return null;
        };
        // Methods   
        SkyMaterial.prototype._checkCache = function (scene, mesh, useInstances) {
            if (!mesh) {
                return true;
            }
            if (mesh._materialDefines && mesh._materialDefines.isEqual(this._defines)) {
                return true;
            }
            return false;
        };
        SkyMaterial.prototype.isReady = function (mesh, useInstances) {
            if (this.checkReadyOnlyOnce) {
                if (this._wasPreviouslyReady) {
                    return true;
                }
            }
            var scene = this.getScene();
            if (!this.checkReadyOnEveryCall) {
                if (this._renderId === scene.getRenderId()) {
                    if (this._checkCache(scene, mesh, useInstances)) {
                        return true;
                    }
                }
            }
            var engine = scene.getEngine();
            this._defines.reset();
            // Effect
            if (scene.clipPlane) {
                this._defines.CLIPPLANE = true;
            }
            // Point size
            if (this.pointsCloud || scene.forcePointsCloud) {
                this._defines.POINTSIZE = true;
            }
            // Fog
            if (scene.fogEnabled && mesh && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE && this.fogEnabled) {
                this._defines.FOG = true;
            }
            // Attribs
            if (mesh) {
                if (mesh.useVertexColors && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.ColorKind)) {
                    this._defines.VERTEXCOLOR = true;
                    if (mesh.hasVertexAlpha) {
                        this._defines.VERTEXALPHA = true;
                    }
                }
            }
            // Get correct effect      
            if (!this._defines.isEqual(this._cachedDefines) || !this._effect) {
                this._defines.cloneTo(this._cachedDefines);
                scene.resetCachedMaterial();
                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                if (this._defines.FOG) {
                    fallbacks.addFallback(1, "FOG");
                }
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                if (this._defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }
                // Legacy browser patch
                var shaderName = "sky";
                var join = this._defines.toString();
                this._effect = scene.getEngine().createEffect(shaderName, attribs, ["world", "viewProjection", "view",
                    "vFogInfos", "vFogColor", "pointSize", "vClipPlane",
                    "luminance", "turbidity", "rayleigh", "mieCoefficient", "mieDirectionalG", "sunPosition",
                    "cameraPosition"
                ], [], join, fallbacks, this.onCompiled, this.onError);
            }
            if (!this._effect.isReady()) {
                return false;
            }
            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;
            if (mesh) {
                if (!mesh._materialDefines) {
                    mesh._materialDefines = new SkyMaterialDefines();
                }
                this._defines.cloneTo(mesh._materialDefines);
            }
            return true;
        };
        SkyMaterial.prototype.bindOnlyWorldMatrix = function (world) {
            this._effect.setMatrix("world", world);
        };
        SkyMaterial.prototype.bind = function (world, mesh) {
            var scene = this.getScene();
            // Matrices        
            this.bindOnlyWorldMatrix(world);
            this._effect.setMatrix("viewProjection", scene.getTransformMatrix());
            if (scene.getCachedMaterial() !== this) {
                // Clip plane
                if (scene.clipPlane) {
                    var clipPlane = scene.clipPlane;
                    this._effect.setFloat4("vClipPlane", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
                }
                // Point size
                if (this.pointsCloud) {
                    this._effect.setFloat("pointSize", this.pointSize);
                }
            }
            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._effect.setMatrix("view", scene.getViewMatrix());
            }
            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._effect);
            // Sky
            var camera = scene.activeCamera;
            if (camera) {
                var cameraWorldMatrix = camera.getWorldMatrix();
                this._cameraPosition.x = cameraWorldMatrix.m[12];
                this._cameraPosition.y = cameraWorldMatrix.m[13];
                this._cameraPosition.z = cameraWorldMatrix.m[14];
                this._effect.setVector3("cameraPosition", this._cameraPosition);
            }
            if (this.luminance > 0) {
                this._effect.setFloat("luminance", this.luminance);
            }
            this._effect.setFloat("turbidity", this.turbidity);
            this._effect.setFloat("rayleigh", this.rayleigh);
            this._effect.setFloat("mieCoefficient", this.mieCoefficient);
            this._effect.setFloat("mieDirectionalG", this.mieDirectionalG);
            if (!this.useSunPosition) {
                var theta = Math.PI * (this.inclination - 0.5);
                var phi = 2 * Math.PI * (this.azimuth - 0.5);
                this.sunPosition.x = this.distance * Math.cos(phi);
                this.sunPosition.y = this.distance * Math.sin(phi) * Math.sin(theta);
                this.sunPosition.z = this.distance * Math.sin(phi) * Math.cos(theta);
            }
            this._effect.setVector3("sunPosition", this.sunPosition);
            _super.prototype.bind.call(this, world, mesh);
        };
        SkyMaterial.prototype.getAnimatables = function () {
            return [];
        };
        SkyMaterial.prototype.dispose = function (forceDisposeEffect) {
            _super.prototype.dispose.call(this, forceDisposeEffect);
        };
        SkyMaterial.prototype.clone = function (name) {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(function () { return new SkyMaterial(name, _this.getScene()); }, this);
        };
        SkyMaterial.prototype.serialize = function () {
            var serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.SkyMaterial";
            return serializationObject;
        };
        // Statics
        SkyMaterial.Parse = function (source, scene, rootUrl) {
            return BABYLON.SerializationHelper.Parse(function () { return new SkyMaterial(source.name, scene); }, source, scene, rootUrl);
        };
        return SkyMaterial;
    }(BABYLON.Material));
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "luminance", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "turbidity", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "rayleigh", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "mieCoefficient", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "mieDirectionalG", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "distance", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "inclination", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "azimuth", void 0);
    __decorate([
        BABYLON.serializeAsVector3()
    ], SkyMaterial.prototype, "sunPosition", void 0);
    __decorate([
        BABYLON.serialize()
    ], SkyMaterial.prototype, "useSunPosition", void 0);
    BABYLON.SkyMaterial = SkyMaterial;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.skyMaterial.js.map
