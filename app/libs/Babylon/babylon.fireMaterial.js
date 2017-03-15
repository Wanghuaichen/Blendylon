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
    var maxSimultaneousLights = 4;
    var FireMaterialDefines = (function (_super) {
        __extends(FireMaterialDefines, _super);
        function FireMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.DIFFUSE = false;
            _this.CLIPPLANE = false;
            _this.ALPHATEST = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.UV1 = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this.BonesPerMesh = 0;
            _this.NUM_BONE_INFLUENCERS = 0;
            _this.INSTANCES = false;
            _this._keys = Object.keys(_this);
            return _this;
        }
        return FireMaterialDefines;
    }(BABYLON.MaterialDefines));
    var FireMaterial = (function (_super) {
        __extends(FireMaterial, _super);
        function FireMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            _this.diffuseColor = new BABYLON.Color3(1, 1, 1);
            _this.speed = 1.0;
            _this._scaledDiffuse = new BABYLON.Color3();
            _this._defines = new FireMaterialDefines();
            _this._cachedDefines = new FireMaterialDefines();
            _this._lastTime = 0;
            _this._cachedDefines.BonesPerMesh = -1;
            return _this;
        }
        FireMaterial.prototype.needAlphaBlending = function () {
            return (this.alpha < 1.0);
        };
        FireMaterial.prototype.needAlphaTesting = function () {
            return false;
        };
        FireMaterial.prototype.getAlphaTestTexture = function () {
            return null;
        };
        // Methods   
        FireMaterial.prototype._checkCache = function (scene, mesh, useInstances) {
            if (!mesh) {
                return true;
            }
            if (this._defines.INSTANCES !== useInstances) {
                return false;
            }
            if (mesh._materialDefines && mesh._materialDefines.isEqual(this._defines)) {
                return true;
            }
            return false;
        };
        FireMaterial.prototype.isReady = function (mesh, useInstances) {
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
            var needNormals = false;
            var needUVs = false;
            this._defines.reset();
            // Textures
            if (scene.texturesEnabled) {
                if (this.diffuseTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    if (!this.diffuseTexture.isReady()) {
                        return false;
                    }
                    else {
                        needUVs = true;
                        this._defines.DIFFUSE = true;
                    }
                }
            }
            // Effect
            if (scene.clipPlane) {
                this._defines.CLIPPLANE = true;
            }
            this._defines.ALPHATEST = true;
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
                if (needUVs) {
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind)) {
                        this._defines.UV1 = true;
                    }
                }
                if (mesh.useVertexColors && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.ColorKind)) {
                    this._defines.VERTEXCOLOR = true;
                    if (mesh.hasVertexAlpha) {
                        this._defines.VERTEXALPHA = true;
                    }
                }
                if (mesh.useBones && mesh.computeBonesUsingShaders) {
                    this._defines.NUM_BONE_INFLUENCERS = mesh.numBoneInfluencers;
                    this._defines.BonesPerMesh = (mesh.skeleton.bones.length + 1);
                }
                // Instances
                if (useInstances) {
                    this._defines.INSTANCES = true;
                }
            }
            // Get correct effect      
            if (!this._defines.isEqual(this._cachedDefines)) {
                this._defines.cloneTo(this._cachedDefines);
                scene.resetCachedMaterial();
                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                if (this._defines.FOG) {
                    fallbacks.addFallback(1, "FOG");
                }
                if (this._defines.NUM_BONE_INFLUENCERS > 0) {
                    fallbacks.addCPUSkinningFallback(0, mesh);
                }
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                if (this._defines.UV1) {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }
                if (this._defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }
                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, this._defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, this._defines);
                // Legacy browser patch
                var shaderName = "fire";
                var join = this._defines.toString();
                this._effect = scene.getEngine().createEffect(shaderName, attribs, ["world", "view", "viewProjection", "vEyePosition",
                    "vFogInfos", "vFogColor", "pointSize",
                    "vDiffuseInfos",
                    "mBones",
                    "vClipPlane", "diffuseMatrix",
                    // Fire
                    "time", "speed"
                ], ["diffuseSampler",
                    // Fire
                    "distortionSampler", "opacitySampler"
                ], join, fallbacks, this.onCompiled, this.onError);
            }
            if (!this._effect.isReady()) {
                return false;
            }
            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;
            if (mesh) {
                if (!mesh._materialDefines) {
                    mesh._materialDefines = new FireMaterialDefines();
                }
                this._defines.cloneTo(mesh._materialDefines);
            }
            return true;
        };
        FireMaterial.prototype.bindOnlyWorldMatrix = function (world) {
            this._effect.setMatrix("world", world);
        };
        FireMaterial.prototype.bind = function (world, mesh) {
            var scene = this.getScene();
            // Matrices        
            this.bindOnlyWorldMatrix(world);
            this._effect.setMatrix("viewProjection", scene.getTransformMatrix());
            // Bones
            BABYLON.MaterialHelper.BindBonesParameters(mesh, this._effect);
            if (scene.getCachedMaterial() !== this) {
                // Textures        
                if (this.diffuseTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    this._effect.setTexture("diffuseSampler", this.diffuseTexture);
                    this._effect.setFloat2("vDiffuseInfos", this.diffuseTexture.coordinatesIndex, this.diffuseTexture.level);
                    this._effect.setMatrix("diffuseMatrix", this.diffuseTexture.getTextureMatrix());
                    this._effect.setTexture("distortionSampler", this.distortionTexture);
                    this._effect.setTexture("opacitySampler", this.opacityTexture);
                }
                // Clip plane
                if (scene.clipPlane) {
                    var clipPlane = scene.clipPlane;
                    this._effect.setFloat4("vClipPlane", clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.d);
                }
                // Point size
                if (this.pointsCloud) {
                    this._effect.setFloat("pointSize", this.pointSize);
                }
                this._effect.setVector3("vEyePosition", scene._mirroredCameraPosition ? scene._mirroredCameraPosition : scene.activeCamera.position);
            }
            this._effect.setColor4("vDiffuseColor", this._scaledDiffuse, this.alpha * mesh.visibility);
            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._effect.setMatrix("view", scene.getViewMatrix());
            }
            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._effect);
            // Time
            this._lastTime += scene.getEngine().getDeltaTime();
            this._effect.setFloat("time", this._lastTime);
            // Speed
            this._effect.setFloat("speed", this.speed);
            _super.prototype.bind.call(this, world, mesh);
        };
        FireMaterial.prototype.getAnimatables = function () {
            var results = [];
            if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
                results.push(this.diffuseTexture);
            }
            if (this.distortionTexture && this.distortionTexture.animations && this.distortionTexture.animations.length > 0) {
                results.push(this.distortionTexture);
            }
            if (this.opacityTexture && this.opacityTexture.animations && this.opacityTexture.animations.length > 0) {
                results.push(this.opacityTexture);
            }
            return results;
        };
        FireMaterial.prototype.dispose = function (forceDisposeEffect) {
            if (this.diffuseTexture) {
                this.diffuseTexture.dispose();
            }
            if (this.distortionTexture) {
                this.distortionTexture.dispose();
            }
            _super.prototype.dispose.call(this, forceDisposeEffect);
        };
        FireMaterial.prototype.clone = function (name) {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(function () { return new FireMaterial(name, _this.getScene()); }, this);
        };
        FireMaterial.prototype.serialize = function () {
            var serializationObject = _super.prototype.serialize.call(this);
            serializationObject.customType = "BABYLON.FireMaterial";
            serializationObject.diffuseColor = this.diffuseColor.asArray();
            serializationObject.speed = this.speed;
            if (this.diffuseTexture) {
                serializationObject.diffuseTexture = this.diffuseTexture.serialize();
            }
            if (this.distortionTexture) {
                serializationObject.distortionTexture = this.distortionTexture.serialize();
            }
            if (this.opacityTexture) {
                serializationObject.opacityTexture = this.opacityTexture.serialize();
            }
            return serializationObject;
        };
        FireMaterial.Parse = function (source, scene, rootUrl) {
            var material = new FireMaterial(source.name, scene);
            material.diffuseColor = BABYLON.Color3.FromArray(source.diffuseColor);
            material.speed = source.speed;
            material.alpha = source.alpha;
            material.id = source.id;
            BABYLON.Tags.AddTagsTo(material, source.tags);
            material.backFaceCulling = source.backFaceCulling;
            material.wireframe = source.wireframe;
            if (source.diffuseTexture) {
                material.diffuseTexture = BABYLON.Texture.Parse(source.diffuseTexture, scene, rootUrl);
            }
            if (source.distortionTexture) {
                material.distortionTexture = BABYLON.Texture.Parse(source.distortionTexture, scene, rootUrl);
            }
            if (source.opacityTexture) {
                material.opacityTexture = BABYLON.Texture.Parse(source.opacityTexture, scene, rootUrl);
            }
            if (source.checkReadyOnlyOnce) {
                material.checkReadyOnlyOnce = source.checkReadyOnlyOnce;
            }
            return material;
        };
        return FireMaterial;
    }(BABYLON.Material));
    __decorate([
        BABYLON.serializeAsTexture()
    ], FireMaterial.prototype, "diffuseTexture", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], FireMaterial.prototype, "distortionTexture", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], FireMaterial.prototype, "opacityTexture", void 0);
    __decorate([
        BABYLON.serialize("diffuseColor")
    ], FireMaterial.prototype, "diffuseColor", void 0);
    __decorate([
        BABYLON.serialize()
    ], FireMaterial.prototype, "speed", void 0);
    BABYLON.FireMaterial = FireMaterial;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.fireMaterial.js.map
