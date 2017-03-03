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
    var TerrainMaterialDefines = (function (_super) {
        __extends(TerrainMaterialDefines, _super);
        function TerrainMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.DIFFUSE = false;
            _this.BUMP = false;
            _this.CLIPPLANE = false;
            _this.ALPHATEST = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.SPECULARTERM = false;
            _this.NORMAL = false;
            _this.UV1 = false;
            _this.UV2 = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this.NUM_BONE_INFLUENCERS = 0;
            _this.BonesPerMesh = 0;
            _this.INSTANCES = false;
            _this.rebuild();
            return _this;
        }
        return TerrainMaterialDefines;
    }(BABYLON.MaterialDefines));
    var TerrainMaterial = (function (_super) {
        __extends(TerrainMaterial, _super);
        function TerrainMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            _this.diffuseColor = new BABYLON.Color3(1, 1, 1);
            _this.specularColor = new BABYLON.Color3(0, 0, 0);
            _this.specularPower = 64;
            _this.disableLighting = false;
            _this.maxSimultaneousLights = 4;
            _this._worldViewProjectionMatrix = BABYLON.Matrix.Zero();
            _this._defines = new TerrainMaterialDefines();
            _this._cachedDefines = new TerrainMaterialDefines();
            _this._cachedDefines.BonesPerMesh = -1;
            return _this;
        }
        TerrainMaterial.prototype.needAlphaBlending = function () {
            return (this.alpha < 1.0);
        };
        TerrainMaterial.prototype.needAlphaTesting = function () {
            return false;
        };
        TerrainMaterial.prototype.getAlphaTestTexture = function () {
            return null;
        };
        // Methods   
        TerrainMaterial.prototype._checkCache = function (scene, mesh, useInstances) {
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
        TerrainMaterial.prototype.isReady = function (mesh, useInstances) {
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
            // Effect
            if (scene.clipPlane) {
                this._defines.CLIPPLANE = true;
            }
            if (engine.getAlphaTesting()) {
                this._defines.ALPHATEST = true;
            }
            // Point size
            if (this.pointsCloud || scene.forcePointsCloud) {
                this._defines.POINTSIZE = true;
            }
            // Fog
            if (scene.fogEnabled && mesh && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE && this.fogEnabled) {
                this._defines.FOG = true;
            }
            // Lights
            if (scene.lightsEnabled && !this.disableLighting) {
                needNormals = BABYLON.MaterialHelper.PrepareDefinesForLights(scene, mesh, this._defines, this.maxSimultaneousLights);
            }
            // Textures
            if (scene.texturesEnabled) {
                if (this.mixTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    if (!this.mixTexture.isReady()) {
                        return false;
                    }
                    else {
                        needUVs = true;
                        this._defines.DIFFUSE = true;
                    }
                }
                if ((this.bumpTexture1 || this.bumpTexture2 || this.bumpTexture3) && BABYLON.StandardMaterial.BumpTextureEnabled) {
                    needUVs = true;
                    needNormals = true;
                    this._defines.BUMP = true;
                }
            }
            // Attribs
            if (mesh) {
                if (needNormals && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.NormalKind)) {
                    this._defines.NORMAL = true;
                }
                if (needUVs) {
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind)) {
                        this._defines.UV1 = true;
                    }
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UV2Kind)) {
                        this._defines.UV2 = true;
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
                BABYLON.MaterialHelper.HandleFallbacksForShadows(this._defines, fallbacks, this.maxSimultaneousLights);
                if (this._defines.NUM_BONE_INFLUENCERS > 0) {
                    fallbacks.addCPUSkinningFallback(0, mesh);
                }
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                if (this._defines.NORMAL) {
                    attribs.push(BABYLON.VertexBuffer.NormalKind);
                }
                if (this._defines.UV1) {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }
                if (this._defines.UV2) {
                    attribs.push(BABYLON.VertexBuffer.UV2Kind);
                }
                if (this._defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }
                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, this._defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, this._defines);
                // Legacy browser patch
                var shaderName = "terrain";
                var join = this._defines.toString();
                var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor",
                    "vFogInfos", "vFogColor", "pointSize",
                    "vTextureInfos",
                    "mBones",
                    "vClipPlane", "textureMatrix",
                    "diffuse1Infos", "diffuse2Infos", "diffuse3Infos"
                ];
                var samplers = ["textureSampler", "diffuse1Sampler", "diffuse2Sampler", "diffuse3Sampler",
                    "bump1Sampler", "bump2Sampler", "bump3Sampler"
                ];
                BABYLON.MaterialHelper.PrepareUniformsAndSamplersList(uniforms, samplers, this._defines, this.maxSimultaneousLights);
                this._effect = scene.getEngine().createEffect(shaderName, attribs, uniforms, samplers, join, fallbacks, this.onCompiled, this.onError, { maxSimultaneousLights: this.maxSimultaneousLights });
            }
            if (!this._effect.isReady()) {
                return false;
            }
            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;
            if (mesh) {
                if (!mesh._materialDefines) {
                    mesh._materialDefines = new TerrainMaterialDefines();
                }
                this._defines.cloneTo(mesh._materialDefines);
            }
            return true;
        };
        TerrainMaterial.prototype.bindOnlyWorldMatrix = function (world) {
            this._effect.setMatrix("world", world);
        };
        TerrainMaterial.prototype.bind = function (world, mesh) {
            var scene = this.getScene();
            // Matrices        
            this.bindOnlyWorldMatrix(world);
            this._effect.setMatrix("viewProjection", scene.getTransformMatrix());
            // Bones
            BABYLON.MaterialHelper.BindBonesParameters(mesh, this._effect);
            if (scene.getCachedMaterial() !== this) {
                // Textures        
                if (this.mixTexture) {
                    this._effect.setTexture("textureSampler", this.mixTexture);
                    this._effect.setFloat2("vTextureInfos", this.mixTexture.coordinatesIndex, this.mixTexture.level);
                    this._effect.setMatrix("textureMatrix", this.mixTexture.getTextureMatrix());
                    if (BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                        if (this.diffuseTexture1) {
                            this._effect.setTexture("diffuse1Sampler", this.diffuseTexture1);
                            this._effect.setFloat2("diffuse1Infos", this.diffuseTexture1.uScale, this.diffuseTexture1.vScale);
                        }
                        if (this.diffuseTexture2) {
                            this._effect.setTexture("diffuse2Sampler", this.diffuseTexture2);
                            this._effect.setFloat2("diffuse2Infos", this.diffuseTexture2.uScale, this.diffuseTexture2.vScale);
                        }
                        if (this.diffuseTexture3) {
                            this._effect.setTexture("diffuse3Sampler", this.diffuseTexture3);
                            this._effect.setFloat2("diffuse3Infos", this.diffuseTexture3.uScale, this.diffuseTexture3.vScale);
                        }
                    }
                    if (BABYLON.StandardMaterial.BumpTextureEnabled && scene.getEngine().getCaps().standardDerivatives) {
                        if (this.bumpTexture1) {
                            this._effect.setTexture("bump1Sampler", this.bumpTexture1);
                        }
                        if (this.bumpTexture2) {
                            this._effect.setTexture("bump2Sampler", this.bumpTexture2);
                        }
                        if (this.bumpTexture3) {
                            this._effect.setTexture("bump3Sampler", this.bumpTexture3);
                        }
                    }
                }
                // Clip plane
                BABYLON.MaterialHelper.BindClipPlane(this._effect, scene);
                // Point size
                if (this.pointsCloud) {
                    this._effect.setFloat("pointSize", this.pointSize);
                }
                this._effect.setVector3("vEyePosition", scene._mirroredCameraPosition ? scene._mirroredCameraPosition : scene.activeCamera.position);
            }
            this._effect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);
            if (this._defines.SPECULARTERM) {
                this._effect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
            }
            if (scene.lightsEnabled && !this.disableLighting) {
                BABYLON.MaterialHelper.BindLights(scene, mesh, this._effect, this._defines, this.maxSimultaneousLights);
            }
            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._effect.setMatrix("view", scene.getViewMatrix());
            }
            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._effect);
            _super.prototype.bind.call(this, world, mesh);
        };
        TerrainMaterial.prototype.getAnimatables = function () {
            var results = [];
            if (this.mixTexture && this.mixTexture.animations && this.mixTexture.animations.length > 0) {
                results.push(this.mixTexture);
            }
            return results;
        };
        TerrainMaterial.prototype.dispose = function (forceDisposeEffect) {
            if (this.mixTexture) {
                this.mixTexture.dispose();
            }
            _super.prototype.dispose.call(this, forceDisposeEffect);
        };
        TerrainMaterial.prototype.clone = function (name) {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(function () { return new TerrainMaterial(name, _this.getScene()); }, this);
        };
        TerrainMaterial.prototype.serialize = function () {
            var serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.TerrainMaterial";
            return serializationObject;
        };
        // Statics
        TerrainMaterial.Parse = function (source, scene, rootUrl) {
            return BABYLON.SerializationHelper.Parse(function () { return new TerrainMaterial(source.name, scene); }, source, scene, rootUrl);
        };
        return TerrainMaterial;
    }(BABYLON.Material));
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "mixTexture", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "diffuseTexture1", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "diffuseTexture2", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "diffuseTexture3", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "bumpTexture1", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "bumpTexture2", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], TerrainMaterial.prototype, "bumpTexture3", void 0);
    __decorate([
        BABYLON.serializeAsColor3()
    ], TerrainMaterial.prototype, "diffuseColor", void 0);
    __decorate([
        BABYLON.serializeAsColor3()
    ], TerrainMaterial.prototype, "specularColor", void 0);
    __decorate([
        BABYLON.serialize()
    ], TerrainMaterial.prototype, "specularPower", void 0);
    __decorate([
        BABYLON.serialize()
    ], TerrainMaterial.prototype, "disableLighting", void 0);
    __decorate([
        BABYLON.serialize()
    ], TerrainMaterial.prototype, "maxSimultaneousLights", void 0);
    BABYLON.TerrainMaterial = TerrainMaterial;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.terrainMaterial.js.map
